import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { canPublishPost } from "@/app/dashboard/pricingUtils"

export async function POST(request: Request) {
  try {
    const session = await currentLoggedInUserInfo()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, mediaUrls = [], postType = 'immediate', scheduledFor = null, postId = null, fromCron = false } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    if (content.length > 280) {
      return NextResponse.json({ 
        error: "Twitter posts are limited to 280 characters" 
      }, { status: 400 })
    }

    if (!fromCron) {
      const canPost = await canPublishPost(session.id)
      if (!canPost) {
        return NextResponse.json({ error: "Monthly post quota reached" }, { status: 403 })
      }
    }

    let twitterProvider;

    if (fromCron && postId) {
      // Cron execution: get provider from the existing post
      const existingPost = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          socialProvider: true
        }
      });

      if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      twitterProvider = existingPost.socialProvider;
    } else {
      // Frontend execution: get provider from session
      const user = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      twitterProvider = await prisma.socialProvider.findFirst({
        where: {
          userId: user.id,
          provider: 'twitter',
          isConnected: true,
        },
      });
    }

    if (!twitterProvider?.access_token) {
      return NextResponse.json({ error: "Twitter not connected" }, { status: 400 })
    }

    const isScheduled = postType === 'scheduled'
    
    if (isScheduled && scheduledFor) {
      const post = await prisma.post.create({
        data: {
          socialProviderId: twitterProvider.id,
          content,
          mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
          status: 'SCHEDULED',
          scheduledFor: new Date(scheduledFor),
          postedAt: null
        }
      })

      return NextResponse.json({
        success: true,
        postId: post.id,
        scheduled: true,
        scheduledFor: scheduledFor,
        message: `Post scheduled for Twitter successfully!`
      })
    }

    const now = Math.floor(Date.now() / 1000)
    const isTokenExpired = twitterProvider.expires_at && twitterProvider.expires_at < now

    if (isTokenExpired) {
      if (!twitterProvider.refresh_token) {
        await prisma.socialProvider.update({
          where: { id: twitterProvider.id },
          data: { 
            isConnected: false,
            disconnectedAt: new Date()
          }
        })
        
        return NextResponse.json({ 
          error: "Twitter token expired. Please reconnect." 
        }, { status: 400 })
      }

      const refreshResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
          ).toString('base64')}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: twitterProvider.refresh_token,
          client_id: process.env.X_CLIENT_ID!,
        }),
      })

      if (!refreshResponse.ok) {
        await prisma.socialProvider.update({
          where: { id: twitterProvider.id },
          data: { 
            isConnected: false,
            disconnectedAt: new Date()
          }
        })
        
        return NextResponse.json({ 
          error: "Twitter token expired. Please reconnect." 
        }, { status: 400 })
      }

      const refreshData = await refreshResponse.json()
      
      await prisma.socialProvider.update({
        where: { id: twitterProvider.id },
        data: {
          access_token: refreshData.access_token,
          refresh_token: refreshData.refresh_token,
          expires_at: Math.floor(Date.now() / 1000) + refreshData.expires_in,
        }
      })
    }

    const updatedProvider = await prisma.socialProvider.findUnique({
      where: { id: twitterProvider.id },
    })

    if (!updatedProvider?.access_token || !updatedProvider.isConnected) {
      return NextResponse.json({ error: "Twitter not connected" }, { status: 400 })
    }

    const tweetPayload = {
      text: content.trim()
    }

    const tweetResponse = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${updatedProvider.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetPayload),
    })

    const tweetText = await tweetResponse.text()
    let tweetResult
    try {
      tweetResult = JSON.parse(tweetText)
    } catch {
      throw new Error(`Invalid JSON response from Twitter API: ${tweetText}`)
    }

    if (!tweetResponse.ok) {
      console.error('Twitter API error:', tweetText)
      
      await prisma.post.create({
        data: {
          socialProviderId: updatedProvider.id,
          content,
          mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
          status: 'FAILED',
          errorMessage: `Twitter API error: ${tweetText}`,
        }
      })

      throw new Error(`Twitter posting failed: ${tweetText}`)
    }

    const tweetId = tweetResult.data.id

    const post = await prisma.post.create({
      data: {
        socialProviderId: updatedProvider.id,
        content,
        status: isScheduled ? 'SCHEDULED' : 'POSTED',
        scheduledFor: isScheduled && scheduledFor ? new Date(scheduledFor) : null,
        postedAt: isScheduled ? null : new Date(),
        mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
      }
    })

    await prisma.socialProvider.update({
      where: { id: updatedProvider.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json({ 
      success: true, 
      postId: post.id,
      tweetId,
      message: `Posted to Twitter successfully!` 
    })
    
  } catch (error: any) {
    console.error('Twitter posting error:', error)
    return NextResponse.json({ 
      error: error.message || "Failed to post to Twitter" 
    }, { status: 500 })
  }
}
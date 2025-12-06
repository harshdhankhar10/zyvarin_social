import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

async function uploadImageToTwitter(imageUrl: string, accessToken: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()
    const imageBytes = new Uint8Array(imageBuffer)

    const initResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        command: 'INIT',
        total_bytes: imageBytes.length.toString(),
        media_type: 'image/jpeg'
      })
    })

    if (!initResponse.ok) {
      const error = await initResponse.text()
      throw new Error(`Twitter media init failed: ${error}`)
    }

    const initData = await initResponse.json()
    const mediaId = initData.media_id_string

    const appendResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        command: 'APPEND',
        media_id: mediaId,
        segment_index: '0',
        media_data: Buffer.from(imageBytes).toString('base64')
      })
    })

    if (!appendResponse.ok) {
      const error = await appendResponse.text()
      throw new Error(`Twitter media append failed: ${error}`)
    }

    const finalizeResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        command: 'FINALIZE',
        media_id: mediaId
      })
    })

    if (!finalizeResponse.ok) {
      const error = await finalizeResponse.text()
      throw new Error(`Twitter media finalize failed: ${error}`)
    }

    return mediaId
  } catch (error) {
    console.error('Error uploading image to Twitter:', error)
    return null
  }
}

export async function POST(request: Request) {
  try {
    const session = await currentLoggedInUserInfo()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, mediaUrls = [] } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    if (content.length > 280) {
      return NextResponse.json({ 
        error: "Twitter posts are limited to 280 characters" 
      }, { status: 400 })
    }

    if (mediaUrls.length > 4) {
      return NextResponse.json({ 
        error: "Twitter supports maximum 4 images per tweet" 
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const twitterProvider = await prisma.socialProvider.findFirst({
      where: {
        userId: user.id,
        provider: 'twitter',
        isConnected: true,
      },
    })

    if (!twitterProvider?.access_token) {
      return NextResponse.json({ error: "Twitter not connected" }, { status: 400 })
    }

    const now = Math.floor(Date.now() / 1000)
    const isTokenExpired = twitterProvider.expires_at && twitterProvider.expires_at < now

    if (isTokenExpired && twitterProvider.refresh_token) {
      try {
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

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json()
          
          await prisma.socialProvider.update({
            where: { id: twitterProvider.id },
            data: {
              access_token: refreshData.access_token,
              refresh_token: refreshData.refresh_token,
              expires_at: Math.floor(Date.now() / 1000) + refreshData.expires_in,
            }
          })
        } else {
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
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        
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
    }

    const updatedProvider = await prisma.socialProvider.findFirst({
      where: { 
        id: twitterProvider.id,
        isConnected: true 
      },
    })

    if (!updatedProvider?.access_token) {
      return NextResponse.json({ error: "Twitter not connected" }, { status: 400 })
    }

    let mediaIds: string[] = []
    
    if (mediaUrls.length > 0) {
      for (const mediaUrl of mediaUrls) {
        try {
          const mediaId = await uploadImageToTwitter(mediaUrl, updatedProvider.access_token)
          if (mediaId) {
            mediaIds.push(mediaId)
          }
        } catch (error) {
          console.error(`Failed to upload media ${mediaUrl}:`, error)
        }
      }
    }

    const tweetPayload: any = {
      text: content.trim()
    }

    if (mediaIds.length > 0) {
      tweetPayload.media = {
        media_ids: mediaIds
      }
    }

    const tweetResponse = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${updatedProvider.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetPayload),
    })

    if (!tweetResponse.ok) {
      const errorText = await tweetResponse.text()
      console.error('Twitter API error:', errorText)
      
      await prisma.post.create({
        data: {
          socialProviderId: updatedProvider.id,
          content,
          status: 'FAILED',
          errorMessage: `Twitter API error: ${tweetResponse.statusText}`,
          mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
        }
      })

      throw new Error(`Twitter posting failed: ${tweetResponse.statusText}`)
    }

    const tweetResult = await tweetResponse.json()
    const tweetId = tweetResult.data.id

    const post = await prisma.post.create({
      data: {
        socialProviderId: updatedProvider.id,
        content,
        postedAt: new Date(),
        status: 'POSTED',
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
      mediaCount: mediaIds.length,
      message: `Posted to Twitter successfully! ${mediaIds.length > 0 ? `With ${mediaIds.length} image(s)` : ''}` 
    })
    
  } catch (error: any) {
    console.error('Twitter posting error:', error)
    return NextResponse.json({ 
      error: error.message || "Failed to post to Twitter" 
    }, { status: 500 })
  }
}
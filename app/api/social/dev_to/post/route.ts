import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await currentLoggedInUserInfo()
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, mediaUrls = [], published = true, tags = [], postType = 'immediate', scheduledFor = null } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const title = content.split('\n')[0].substring(0, 100) || "Untitled Article"

    if (content.length > 65535) {
      return NextResponse.json({ 
        error: "Dev.to articles are limited to 65535 characters" 
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

    const devtoProvider = await prisma.socialProvider.findFirst({
      where: {
        userId: user.id,
        provider: 'devto',
        isConnected: true,
      },
    })

    if (!devtoProvider?.access_token) {
      return NextResponse.json({ error: "Dev.to not connected" }, { status: 400 })
    }

    const isScheduled = postType === 'scheduled'
    
    if (isScheduled && scheduledFor) {
      const post = await prisma.post.create({
        data: {
          socialProviderId: devtoProvider.id,
          content,
          mediaUrls,
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
        message: `Post scheduled for Dev.to successfully!`
      })
    }

    const now = Math.floor(Date.now() / 1000)
    if (devtoProvider.expires_at && devtoProvider.expires_at < now) {
      await prisma.socialProvider.update({
        where: { id: devtoProvider.id },
        data: {
          isConnected: false,
          disconnectedAt: new Date()
        }
      })

      return NextResponse.json({
        error: "Dev.to token expired. Please reconnect."
      }, { status: 400 })
    }

    let processedContent = content
    
    // Handle images by embedding them in the markdown
    if (mediaUrls.length > 0) {
      let imageMarkdown = "\n\n"
      
      for (const mediaUrl of mediaUrls) {
        // Add each image as markdown image syntax
        imageMarkdown += `![Image](${mediaUrl})\n\n`
      }
      
      processedContent = content + imageMarkdown
    }

    // Prepare dev.to article payload
    const articlePayload = {
      article: {
        title: title,
        body_markdown: processedContent,
        published: published,
        tags: Array.isArray(tags) ? tags : [tags],
        series: null, // Optional: add if you want to post to a series
        canonical_url: "",
        description: title.substring(0, 150), // Use title as description
        main_image: mediaUrls.length > 0 ? mediaUrls[0] : null, // Use first image as main image
        organization_id: null // Optional: if posting to an organization
      }
    }

    const devtoResponse = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'api-key': devtoProvider.access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articlePayload),
    })

    if (!devtoResponse.ok) {
      const errorText = await devtoResponse.text()
      console.error('Dev.to API error:', errorText)

      await prisma.post.create({
        data: {
          socialProviderId: devtoProvider.id,
          content,
          mediaUrls,
          
          status: 'FAILED',
          errorMessage: `Dev.to API error: ${devtoResponse.statusText}`,
        }
      })

      throw new Error(`Dev.to posting failed: ${devtoResponse.statusText}`)
    }

    const devtoResult = await devtoResponse.json()
    const devtoArticleId = devtoResult.id
    const articleUrl = devtoResult.url

    const post = await prisma.post.create({
      data: {
        socialProviderId: devtoProvider.id,
        content,
        mediaUrls,
        status: isScheduled ? 'SCHEDULED' : 'POSTED',
        scheduledFor: isScheduled && scheduledFor ? new Date(scheduledFor) : null,
        postedAt: isScheduled ? null : new Date()
      }
    })

    await prisma.socialProvider.update({
      where: { id: devtoProvider.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json({
      success: true,
      postId: post.id,
      devtoArticleId: devtoArticleId,
      articleUrl: articleUrl,
      mediaCount: mediaUrls.length,
      message: `Posted to Dev.to successfully! ${mediaUrls.length > 0 ? `With ${mediaUrls.length} image(s)` : ''}`,
      details: {
        title: title,
        published: published,
        tags: tags
      }
    })

  } catch (error: any) {
    console.error('Dev.to posting error:', error)
    return NextResponse.json({
      error: error.message || "Failed to post to Dev.to"
    }, { status: 500 })
  }
}
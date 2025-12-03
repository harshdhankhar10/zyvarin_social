// app/api/social/linkedin/post/route.ts
import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await currentLoggedInUserInfo()
    if(!session) {
        return null
    }
    
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, mediaUrls = [] } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const linkedinProvider = await prisma.socialProvider.findFirst({
      where: {
        userId: user.id,
        provider: 'linkedin',
        isConnected: true,
      },
    })

    if (!linkedinProvider?.access_token) {
      return NextResponse.json({ error: "LinkedIn not connected" }, { status: 400 })
    }

    const now = Math.floor(Date.now() / 1000)
    if (linkedinProvider.expires_at && linkedinProvider.expires_at < now) {
      await prisma.socialProvider.update({
        where: { id: linkedinProvider.id },
        data: { 
          isConnected: false,
          disconnectedAt: new Date()
        }
      })
      
      return NextResponse.json({ 
        error: "LinkedIn token expired. Please reconnect." 
      }, { status: 400 })
    }

    const linkedinPostId = `urn:li:person:${linkedinProvider.providerUserId}`

    let postPayload: any = {
      author: linkedinPostId,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    }

    if (mediaUrls.length > 0) {
      postPayload.specificContent["com.linkedin.ugc.ShareContent"].shareMediaCategory = "ARTICLE"
      postPayload.specificContent["com.linkedin.ugc.ShareContent"].media = mediaUrls.map((url: string) => ({
        status: "READY",
        description: { text: "" },
        media: url,
        title: { text: "" }
      }))
    }

    const linkedinResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${linkedinProvider.access_token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postPayload),
    })

    if (!linkedinResponse.ok) {
      const errorText = await linkedinResponse.text()
      console.error('LinkedIn API error:', errorText)
      
      await prisma.post.create({
        data: {
          socialProviderId: linkedinProvider.id,
          content,
          mediaUrls,
          status: 'FAILED',
          errorMessage: `LinkedIn API error: ${linkedinResponse.statusText}`,
        }
      })

      throw new Error(`LinkedIn posting failed: ${linkedinResponse.statusText}`)
    }

    const linkedinResult = await linkedinResponse.json()
    const linkedinPostIdResult = linkedinResult.id

    const post = await prisma.post.create({
      data: {
        socialProviderId: linkedinProvider.id,
        content,
        mediaUrls,
        postedAt: new Date(),
        status: 'POSTED',
      }
    })

    await prisma.socialProvider.update({
      where: { id: linkedinProvider.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json({ 
      success: true, 
      postId: post.id,
      linkedinPostId: linkedinPostIdResult,
      message: "Posted to LinkedIn successfully!" 
    })
    
  } catch (error: any) {
    console.error('LinkedIn posting error:', error)
    return NextResponse.json({ 
      error: error.message || "Failed to post to LinkedIn" 
    }, { status: 500 })
  }
}
import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

function extractTags(tags: string[], content: string): string[] {
  let allTags: string[] = []
  
  if (tags && Array.isArray(tags) && tags.length > 0) {
    allTags = [...tags]
  }
  
  const hashtags = content.match(/#[\w\u0590-\u05ff]+/g) || []
  const hashtagNames = hashtags.map(tag => tag.substring(1).toLowerCase())
  
  allTags = [...new Set([...allTags, ...hashtagNames])]
    .map(tag => tag.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(tag => tag.length > 0 && tag.length <= 24)
    .slice(0, 4)
  
  return allTags
}

function generateDescription(content: string): string {
  const firstParagraph = content.split('\n\n')[0] || content.split('\n')[0] || ''
  const cleanText = firstParagraph
    .replace(/[#*`_]/g, '')
    .replace(/\s+/g, ' ')
    .substring(0, 150)
    .trim()
  
  return cleanText + (cleanText.length === 150 ? '...' : '')
}

export async function POST(request: Request) {
  try {
    const session = await currentLoggedInUserInfo()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, tags = [], series = null, mediaUrls,canonical_url = null, published = true } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    let title = content.split('\n')[0]?.replace(/^#+\s*/, '') || 'Untitled Article'
    if (title.length > 100) {
      title = title.substring(0, 100)
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id }
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

    const extractedTags = extractTags(tags, content)
    
    if (extractedTags.length === 0) {
      extractedTags.push('programming', 'webdev')
    }

    const articleData = {
      article: {
        title: title.trim(),
        body_markdown: content.trim(),
        published: published,
        description: generateDescription(content),
        tags: extractedTags,
        series: series || undefined,
        canonical_url: canonical_url || undefined,
        cover_image: mediaUrls && mediaUrls.length > 0 ? mediaUrls[0] : undefined,
      }
    }

    const devtoResponse = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'api-key': devtoProvider.access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    })

    if (!devtoResponse.ok) {
      const errorText = await devtoResponse.text()
      console.error('Dev.to API error:', errorText)
      
      let errorMessage = `Dev.to API error: ${devtoResponse.status}`
      try {
        const errorData = JSON.parse(errorText)
        if (errorData.error) errorMessage = errorData.error
        if (errorData.errors) errorMessage = JSON.stringify(errorData.errors)
      } catch {}
      
      await prisma.post.create({
        data: {
          socialProviderId: devtoProvider.id,
          content: content.substring(0, 1000),
          status: 'FAILED',
          errorMessage: errorMessage,
          postedAt: new Date(),
        }
      })

      return NextResponse.json({ error: errorMessage }, { status: devtoResponse.status })
    }

    const devtoResult = await devtoResponse.json()
    
    const devtoArticleUrl = devtoResult.url || `https://dev.to/${devtoResult.user?.username}/${devtoResult.slug}`

    const post = await prisma.post.create({
      data: {
        socialProviderId: devtoProvider.id,
        content: content.substring(0, 1000),
        postedAt: new Date(),
        status: 'POSTED',
      }
    })

    await prisma.socialProvider.update({
      where: { id: devtoProvider.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json({
      message: "Posted to Dev.to successfully",
      data: {
        url: devtoArticleUrl,
        id: devtoResult.id,
        title: devtoResult.title,
      },
      success: true,
    }, { status: 200 })
    
  } catch (error: any) {
    console.error('Dev.to posting error:', error)
    return NextResponse.json({ error: error.message || "Failed to post to Dev.to" }, { status: 500 })
  }
}
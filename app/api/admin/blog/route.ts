import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const admin = await currentLoggedInUserInfo()

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        author: true,
        published: true,
        featured: true,
        viewCount: true,
        upvotes: true,
        downvotes: true,
        createdAt: true,
        publishedAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return Response.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export const POST = async (req: Request) => {
  try {
    const admin = await currentLoggedInUserInfo()

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { title, slug, excerpt, content, featuredImage, author, category, tags, published, featured, readTime, seoTitle, seoDescription, seoKeywords } = await req.json()

    if (!title || !slug || !excerpt || !content) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        featuredImage: featuredImage || null,
        author,
        category,
        tags: tags || [],
        published: published || false,
        featured: featured || false,
        readTime: readTime || 5,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || [],
        publishedAt: published ? new Date() : null
      }
    })

    return Response.json(blog, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Blog with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

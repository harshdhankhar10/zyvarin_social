import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const resolvedParams = await params
    const admin = await currentLoggedInUserInfo()

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { title, slug, excerpt, content, featuredImage, author, category, tags, published, featured, readTime, seoTitle, seoDescription, seoKeywords } = await req.json()

    const existingBlog = await prisma.blog.findUnique({
      where: { id: resolvedParams.id },
      select: { publishedAt: true }
    })

    if (!existingBlog) {
      return Response.json({ error: 'Blog not found' }, { status: 404 })
    }

    const blog = await prisma.blog.update({
      where: { id: resolvedParams.id },
      data: {
        title: title ?? undefined,
        slug: slug ?? undefined,
        excerpt: excerpt ?? undefined,
        content: content ?? undefined,
        featuredImage: featuredImage ?? undefined,
        author: author ?? undefined,
        category: category ?? undefined,
        tags: tags ?? undefined,
        published: published ?? undefined,
        featured: featured ?? undefined,
        readTime: readTime ?? undefined,
        seoTitle: seoTitle ?? undefined,
        seoDescription: seoDescription ?? undefined,
        seoKeywords: seoKeywords ?? undefined,
        publishedAt: published && !existingBlog.publishedAt ? new Date() : undefined
      }
    })

    return Response.json(blog)
  } catch (error: any) {
    console.error('Error updating blog:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Blog with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const resolvedParams = await params
    const admin = await currentLoggedInUserInfo()

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const blog = await prisma.blog.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}

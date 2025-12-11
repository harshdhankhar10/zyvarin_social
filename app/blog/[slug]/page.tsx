import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import BlogPostClient from '@/components/Blog/BlogPostClient'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug }
  })

  if (!blog || !blog.published) return { title: 'Blog Post - Zyvarin Social' }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt
  }
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true }
  })

  return blogs.map((blog) => ({
    slug: blog.slug
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params

  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug }
  })

  if (!blog || !blog.published) {
    notFound()
  }

  await prisma.blog.update({
    where: { id: blog.id },
    data: { viewCount: { increment: 1 } }
  })

  const { currentLoggedInUserInfo } = await import('@/utils/currentLogegdInUserInfo')
  const user = await currentLoggedInUserInfo()
  const currentUser = user ? {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    avatarUrl: user.avatarUrl
  } : null

  return <BlogPostClient blog={blog} currentUser={currentUser} />
}

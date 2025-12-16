import Navbar from '@/components/Global/Navbar'
import Footer from '@/components/Global/Footer'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import BlogPostClient from '@/components/Blog/BlogPostClient'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'

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

  const relatedBlogs = await prisma.blog.findMany({
    where: {
      published: true,
      slug: { not: resolvedParams.slug },
      OR: [
        { category: blog.category },
        ...(blog.tags.length > 0
          ? [
              {
                tags: { hasSome: blog.tags }
              }
            ]
          : [])
      ]
    },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: 5
  })

  const user = await currentLoggedInUserInfo()
  const currentUser = user
    ? {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatarUrl: user.avatarUrl
      }
    : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        <BlogPostClient blog={blog} currentUser={currentUser} relatedBlogs={relatedBlogs || []} />
      </main>
      <Footer />
    </div>
  )
}

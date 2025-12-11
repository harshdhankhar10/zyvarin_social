import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import BlogManagementClient from '@/components/Admin/BlogManagementClient'

export default async function AdminBlogPage() {
  const admin = await currentLoggedInUserInfo()

  if (!admin || admin.role !== 'ADMIN') {
    notFound()
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

  return <BlogManagementClient blogs={blogs} />
}

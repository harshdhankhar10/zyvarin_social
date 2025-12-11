import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import BlogEditorClient from '@/components/Admin/BlogEditorClient'

export default async function BlogEditorPage({ params }: { params: Promise<{ id?: string }> }) {
  const admin = await currentLoggedInUserInfo()

  if (!admin || admin.role !== 'ADMIN') {
    notFound()
  }

  const resolvedParams = await params
  let blog = null

  if (resolvedParams?.id) {
    blog = await prisma.blog.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!blog) {
      notFound()
    }
  }

  return <BlogEditorClient blog={blog} />
}

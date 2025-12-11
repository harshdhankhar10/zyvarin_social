import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { notFound } from 'next/navigation'
import BlogEditorClient from '@/components/Admin/BlogEditorClient'

export const metadata = {
  title: 'Create New Blog - Admin'
}

export default async function CreateBlogPage() {
  const admin = await currentLoggedInUserInfo()

  if (!admin || admin.role !== 'ADMIN') {
    notFound()
  }

  return <BlogEditorClient blog={null} />
}

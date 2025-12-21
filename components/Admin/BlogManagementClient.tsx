'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Edit, Plus } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  published: boolean
  featured: boolean
  viewCount: number
  upvotes: number
  downvotes: number
  createdAt: Date
  publishedAt?: Date | null
}

interface BlogManagementClientProps {
  blogs: Blog[]
}

const BlogManagementClient = ({ blogs }: BlogManagementClientProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        showMessage('Blog deleted successfully', 'success')
        setTimeout(() => router.refresh(), 1000)
      } else {
        const data = await res.json()
        showMessage(data.error || 'Failed to delete blog', 'error')
      }
    } catch (error) {
      showMessage('Error deleting blog', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">{blogs.length} total blogs</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </Link>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Views</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Engagement</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Created</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No blogs found. Create your first blog!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{blog.title}</p>
                      <p className="text-xs text-gray-500">{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{blog.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      {blog.featured && <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">Featured</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{blog.viewCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    👍 {blog.upvotes} 👎 {blog.downvotes}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(new Date(blog.createdAt))}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/blog/${blog.id}`}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id, blog.title)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogManagementClient

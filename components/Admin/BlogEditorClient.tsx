'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Upload } from 'lucide-react'
import TipTapEditor from '@/components/Blog/TipTapEditor'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string | null
  author: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
  readTime: number
  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords: string[]
}

interface BlogEditorClientProps {
  blog: Blog | null
}

const BlogEditorClient = ({ blog }: BlogEditorClientProps) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    featuredImage: blog?.featuredImage || '',
    author: blog?.author || 'Zyvarin Team',
    category: blog?.category || 'General',
    tags: blog?.tags?.join(', ') || '',
    published: blog?.published || false,
    featured: blog?.featured || false,
    readTime: blog?.readTime || 5,
    seoTitle: blog?.seoTitle || '',
    seoDescription: blog?.seoDescription || '',
    seoKeywords: blog?.seoKeywords?.join(', ') || ''
  })

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    const formDataObj = new FormData()
    // API expects field name "image"
    formDataObj.append('image', file)

    try {
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: formDataObj
      })

      const data = await res.json()
      if (res.ok) {
        setFormData((prev) => ({
          ...prev,
          featuredImage: data.imageUrl
        }))
        showMessage('Image uploaded successfully', 'success')
      } else {
        showMessage(data.error || 'Failed to upload image', 'error')
      }
    } catch (error) {
      showMessage('Error uploading image', 'error')
    } finally {
      setImageUploading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      showMessage('Please fill in all required fields', 'error')
      return
    }

    setLoading(true)
    try {
      const method = blog ? 'PATCH' : 'POST'
      const url = blog ? `/api/admin/blog/${blog.id}` : '/api/admin/blog'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          featuredImage: formData.featuredImage,
          author: formData.author,
          category: formData.category,
          tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
          published: formData.published,
          featured: formData.featured,
          readTime: parseInt(formData.readTime.toString()),
          seoTitle: formData.seoTitle,
          seoDescription: formData.seoDescription,
          seoKeywords: formData.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
        })
      })

      const data = await res.json()
      if (res.ok) {
        showMessage(`Blog ${blog ? 'updated' : 'created'} successfully`, 'success')
        setTimeout(() => router.push('/admin/blog'), 1500)
      } else {
        showMessage(data.error || `Failed to ${blog ? 'update' : 'create'} blog`, 'error')
      }
    } catch (error) {
      showMessage('Error saving blog', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <Link href="/admin/blog" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft className="w-4 h-4" />
        Back to Blogs
      </Link>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          {['editor', 'preview', 'seo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'editor' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <div className="flex items-center gap-4">
                  {formData.featuredImage && (
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {imageUploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Blog title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="blog-slug"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Short summary of the blog"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <TipTapEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                  placeholder="Blog content with rich formatting"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>General</option>
                    <option>Tutorial</option>
                    <option>News</option>
                    <option>Product</option>
                    <option>Tips</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Read Time (min)</label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Publish</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="prose prose-sm max-w-none">
              {formData.featuredImage && (
                <img src={formData.featuredImage} alt={formData.title} className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              <h1 className="text-3xl font-bold text-gray-900">{formData.title || 'Untitled'}</h1>
              <div className="text-gray-600 text-sm flex gap-4 my-4">
                <span>{formData.author}</span>
                <span>{formData.category}</span>
                <span>{formData.readTime} min read</span>
              </div>
              <p className="text-gray-700 text-lg">{formData.excerpt}</p>
              <div className="bg-gray-50 p-4 rounded-lg my-6">
                <p className="text-gray-600 whitespace-pre-wrap">{formData.content || 'No content yet'}</p>
              </div>
              {formData.tags && (
                <div className="flex gap-2 flex-wrap">
                  {formData.tags.split(',').map((tag) => (
                    <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  placeholder="Meta title (60 chars)"
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/60</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  placeholder="Meta description (160 chars)"
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Keywords (comma separated)</label>
                <input
                  type="text"
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleInputChange}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : blog ? 'Update' : 'Create'} Blog
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogEditorClient

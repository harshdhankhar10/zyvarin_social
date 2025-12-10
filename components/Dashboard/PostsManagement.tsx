'use client'

import React, { useState, useEffect } from 'react'
import { Edit2, Trash2, Calendar, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/formatDate'

interface Post {
  id: string
  content: string
  status: 'POSTED' | 'SCHEDULED' | 'FAILED'
  postedAt?: Date
  scheduledFor?: Date
  socialProvider: {
    provider: string
  }
  errorMessage?: string
}

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set())
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [newScheduledTime, setNewScheduledTime] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/social/posts')
      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPost = (postId: string) => {
    const newSelected = new Set(selectedPosts)
    if (newSelected.has(postId)) {
      newSelected.delete(postId)
    } else {
      newSelected.add(postId)
    }
    setSelectedPosts(newSelected)
  }

  const handleEditPost = async (postId: string) => {
    if (!editContent.trim()) {
      alert('Content cannot be empty')
      return
    }

    try {
      setActionLoading(true)
      const res = await fetch('/api/social/post/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: editContent })
      })

      if (res.ok) {
        alert('Post updated successfully')
        setEditingPostId(null)
        setEditContent('')
        fetchPosts()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to update post')
      }
    } catch (error) {
      alert('Error updating post')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeletePosts = async () => {
    if (selectedPosts.size === 0) {
      alert('Select posts to delete')
      return
    }

    if (!confirm(`Delete ${selectedPosts.size} post(s)?`)) return

    try {
      setActionLoading(true)
      const res = await fetch('/api/social/post/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postIds: Array.from(selectedPosts) })
      })

      if (res.ok) {
        alert('Posts deleted successfully')
        setSelectedPosts(new Set())
        fetchPosts()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete posts')
      }
    } catch (error) {
      alert('Error deleting posts')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReschedulePosts = async () => {
    if (selectedPosts.size === 0) {
      alert('Select posts to reschedule')
      return
    }

    if (!newScheduledTime) {
      alert('Select a new time')
      return
    }

    try {
      setActionLoading(true)
      const res = await fetch('/api/social/post/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          postIds: Array.from(selectedPosts),
          scheduledFor: newScheduledTime
        })
      })

      if (res.ok) {
        alert('Posts rescheduled successfully')
        setSelectedPosts(new Set())
        setNewScheduledTime('')
        fetchPosts()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to reschedule posts')
      }
    } catch (error) {
      alert('Error rescheduling posts')
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'POSTED': return 'bg-green-100 text-green-800'
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'POSTED': return <CheckCircle className="w-4 h-4" />
      case 'SCHEDULED': return <Calendar className="w-4 h-4" />
      case 'FAILED': return <AlertCircle className="w-4 h-4" />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Posts</h1>
        <p className="text-gray-600">Edit, reschedule, or delete your posts</p>
      </div>

      {selectedPosts.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center">
          <span className="text-sm font-medium text-blue-900">{selectedPosts.size} post(s) selected</span>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={newScheduledTime}
              onChange={(e) => setNewScheduledTime(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="New time"
            />
            <Button
              onClick={handleReschedulePosts}
              disabled={actionLoading || !newScheduledTime}
              variant="outline"
              size="sm"
            >
              {actionLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Reschedule'}
            </Button>
            <Button
              onClick={handleDeletePosts}
              disabled={actionLoading}
              variant="destructive"
              size="sm"
            >
              {actionLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Delete'}
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  checked={selectedPosts.has(post.id)}
                  onChange={() => handleSelectPost(post.id)}
                  className="mt-1"
                  disabled={post.status === 'POSTED'}
                />

                <div className="flex-1">
                  {editingPostId === post.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditPost(post.id)}
                          disabled={actionLoading}
                          size="sm"
                        >
                          {actionLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Save'}
                        </Button>
                        <Button
                          onClick={() => setEditingPostId(null)}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(post.status)}`}>
                            {getStatusIcon(post.status)}
                            {post.status}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">{post.socialProvider.provider}</span>
                        </div>
                        {post.status !== 'POSTED' && (
                          <button
                            onClick={() => {
                              setEditingPostId(post.id)
                              setEditContent(post.content)
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{post.content}</p>

                      <div className="text-xs text-gray-500">
                        {post.status === 'SCHEDULED' && post.scheduledFor && (
                          <span>Scheduled for {formatDate(new Date(post.scheduledFor))}</span>
                        )}
                        {post.status === 'POSTED' && post.postedAt && (
                          <span>Posted on {formatDate(new Date(post.postedAt))}</span>
                        )}
                        {post.status === 'FAILED' && post.errorMessage && (
                          <span>Error: {post.errorMessage}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ThumbsUp, ThumbsDown, Send, Trash2 } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'

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
  readTime: number
  viewCount: number
  upvotes: number
  downvotes: number
  seoDescription?: string | null
  createdAt: Date
  publishedAt: Date | null
}

interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    fullName: string
    email: string
    avatarUrl: string | null
  }
}

interface CurrentUser {
  id: string
  fullName: string
  email: string
  avatarUrl: string | null
}

export default function BlogPostClient({ blog, currentUser }: { blog: Blog; currentUser: CurrentUser | null }) {
  const [userUpvoted, setUserUpvoted] = useState(false)
  const [userDownvoted, setUserDownvoted] = useState(false)
  const [upvotes, setUpvotes] = useState(blog.upvotes)
  const [downvotes, setDownvotes] = useState(blog.downvotes)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentContent, setCommentContent] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isLoadingVotes, setIsLoadingVotes] = useState(true)

  // Fetch vote status from server
  useEffect(() => {
    const fetchVoteStatus = async () => {
      try {
        const res = await fetch(`/api/blog/${blog.id}/vote-status`)
        if (res.ok) {
          const data = await res.json()
          setUserUpvoted(data.hasUpvoted)
          setUserDownvoted(data.hasDownvoted)
        }
      } catch (error) {
        console.error('Error fetching vote status:', error)
      } finally {
        setIsLoadingVotes(false)
      }
    }
    fetchVoteStatus()
  }, [blog.id])

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/blog/${blog.id}/comments`)
        if (res.ok) {
          const data = await res.json()
          setComments(data.comments)
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [blog.id])

  const handleUpvote = async () => {
    if (!currentUser) {
      alert('Please sign in to vote')
      window.location.href = '/signin'
      return
    }
    
    try {
      const res = await fetch(`/api/blog/${blog.id}/upvote`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setUpvotes(data.upvotes)
        setDownvotes(data.downvotes)
        setUserUpvoted(!userUpvoted)
        if (userDownvoted) {
          setUserDownvoted(false)
        }
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to vote')
      }
    } catch (error) {
      console.error('Error upvoting:', error)
    }
  }

  const handleDownvote = async () => {
    if (!currentUser) {
      alert('Please sign in to vote')
      window.location.href = '/signin'
      return
    }
    
    try {
      const res = await fetch(`/api/blog/${blog.id}/downvote`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setUpvotes(data.upvotes)
        setDownvotes(data.downvotes)
        setUserDownvoted(!userDownvoted)
        if (userUpvoted) {
          setUserUpvoted(false)
        }
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to vote')
      }
    } catch (error) {
      console.error('Error downvoting:', error)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim() || !currentUser) return

    setIsSubmittingComment(true)
    try {
      const res = await fetch(`/api/blog/${blog.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent })
      })

      if (res.ok) {
        const data = await res.json()
        setComments([data.comment, ...comments])
        setCommentContent('')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to post comment')
      }
    } catch (error) {
      console.error('Error posting comment:', error)
      alert('Failed to post comment')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      const res = await fetch(`/api/blog/${blog.id}/comments?commentId=${commentId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setComments(comments.filter(c => c.id !== commentId))
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete comment')
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Failed to delete comment')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{blog.category}</span>
            <span className="text-gray-500 text-sm">{blog.readTime} min read</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-6">
            <span>By {blog.author}</span>
            <span>{formatDate(new Date(blog.publishedAt || blog.createdAt))}</span>
            <span>{blog.viewCount} views</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blog.content }} />

        {blog.tags.length > 0 && (
          <div className="mb-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-y border-gray-200 py-8">
          <div className="flex items-center gap-6">
            <button
              onClick={handleUpvote}
              disabled={isLoadingVotes}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                userUpvoted
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{upvotes}</span>
            </button>
            <button
              onClick={handleDownvote}
              disabled={isLoadingVotes}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                userDownvoted
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ThumbsDown className="w-5 h-5" />
              <span>{downvotes}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          {currentUser ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName || 'User'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {currentUser.fullName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    disabled={isSubmittingComment}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!commentContent.trim() || isSubmittingComment}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <p className="text-gray-600">
                Please{' '}
                <Link href="/signin" className="text-blue-600 hover:underline">
                  sign in
                </Link>{' '}
                to comment
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    {comment.user.avatarUrl ? (
                      <img
                        src={comment.user.avatarUrl}
                        alt={comment.user.fullName || 'User'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                        {comment.user.fullName?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-gray-900">
                            {comment.user.fullName || 'Anonymous'}
                          </span>
                          <span className="text-gray-500 text-sm ml-2">
                            {formatDate(new Date(comment.createdAt))}
                          </span>
                        </div>
                        {currentUser?.email === comment.user.email && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete comment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

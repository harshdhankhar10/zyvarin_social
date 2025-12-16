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

interface RelatedBlog {
  id: string
  title: string
  slug: string
  featuredImage?: string | null
  category: string
  readTime: number
  publishedAt: Date | null
  createdAt: Date
}

export default function BlogPostClient({
  blog,
  currentUser,
  relatedBlogs
}: {
  blog: Blog
  currentUser: CurrentUser | null
  relatedBlogs: RelatedBlog[]
}) {
  const [userUpvoted, setUserUpvoted] = useState(false)
  const [userDownvoted, setUserDownvoted] = useState(false)
  const [upvotes, setUpvotes] = useState(blog.upvotes)
  const [downvotes, setDownvotes] = useState(blog.downvotes)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentContent, setCommentContent] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isLoadingVotes, setIsLoadingVotes] = useState(true)

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
      setUserUpvoted(true) 
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
      setUserDownvoted(true)
      
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
        setComments(comments.filter((c) => c.id !== commentId))
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <div className="bg-white/90 backdrop-blur rounded-3xl border border-slate-100 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.35)] overflow-hidden">
          {blog.featuredImage && (
            <div className="h-80 w-full overflow-hidden">
              <img src={blog.featuredImage} alt={blog.title} className="h-full w-full object-cover" />
            </div>
          )}

          <div className="p-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <Link
                href={`/blog/categories/${encodeURIComponent(blog?.category || 'general')}`}
                className="px-3 py-1 rounded-full bg-slate-900 text-white"
              >
                {blog?.category || 'General'}
              </Link>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {blog?.readTime || 0} min read
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {formatDate(new Date(blog?.publishedAt || blog?.createdAt))}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">{blog?.viewCount || 0} views</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-slate-900 leading-tight">{blog?.title || 'Untitled'}</h1>
              <p className="text-slate-600">By {blog?.author || 'Zyvarin Team'}</p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-900" dangerouslySetInnerHTML={{ __html: blog?.content || '' }} />

            {blog?.tags && blog.tags.length > 0 && (
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-700"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3 text-slate-700">
            <span className="text-sm">Was this helpful?</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpvote}
              disabled={isLoadingVotes}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                userUpvoted
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{upvotes}</span>
            </button>
            <button
              onClick={handleDownvote}
              disabled={isLoadingVotes}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                userDownvoted
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{downvotes}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Comments ({comments.length})</h2>
          </div>

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
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-semibold">
                      {currentUser.fullName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Share your thoughts"
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                    rows={3}
                    disabled={isSubmittingComment}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={!commentContent.trim() || isSubmittingComment}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmittingComment ? 'Posting...' : 'Post comment'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center text-slate-700">
              <p>
                Please <Link href="/signin" className="text-slate-900 font-semibold hover:underline">sign in</Link> to join the conversation.
              </p>
            </div>
          )}

          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-slate-500 text-center py-6">No comments yet. Be the first to comment.</p>
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
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-semibold">
                        {comment.user.fullName?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{comment.user.fullName || 'Anonymous'}</span>
                          <span className="text-xs text-slate-500">{formatDate(new Date(comment.createdAt))}</span>
                        </div>
                        {currentUser?.email === comment.user.email && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete comment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <aside className="lg:col-span-4 space-y-6 pt-14">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">About this post</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Category</span>
              <Link
                href={`/blog/categories/${encodeURIComponent(blog?.category || 'general')}`}
                className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs"
              >
                {blog?.category || 'General'}
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span>Published</span>
              <span className="font-medium text-slate-900">{formatDate(new Date(blog?.publishedAt || blog?.createdAt))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Read time</span>
              <span className="font-medium text-slate-900">{blog?.readTime || 0} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Views</span>
              <span className="font-medium text-slate-900">{blog?.viewCount || 0}</span>
            </div>
          </div>
          {blog?.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Related posts</h3>
            <Link href="/blog" className="text-xs text-slate-500 hover:text-slate-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {relatedBlogs.length === 0 ? (
              <p className="text-slate-500 text-sm">No related posts yet.</p>
            ) : (
              relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="flex gap-3 items-center rounded-2xl border border-slate-100 p-3"
                >
                  <div className="h-16 w-20 rounded-xl overflow-hidden bg-slate-900 text-white flex items-center justify-center text-lg font-semibold">
                    {related?.featuredImage ? (
                      <img src={related.featuredImage} alt={related?.title || ''} className="h-full w-full object-cover" />
                    ) : (
                      <span>{related?.title?.slice(0, 1) || '?'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{related?.title || 'Untitled'}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{related?.readTime || 0} min</span>
                      <span>•</span>
                      <span>{formatDate(new Date(related?.publishedAt || related?.createdAt))}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

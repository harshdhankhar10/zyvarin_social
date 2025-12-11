import prisma from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'

export const metadata = {
  title: 'Blog - Zyvarin Social'
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where : {
        published: true
    }
  }
  )



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-xl text-gray-600">Insights and updates from Zyvarin Social</p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No published blog posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {blog.featuredImage && (
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{formatDate(new Date(blog.publishedAt || blog.createdAt))}</span>
                      <span>{blog.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👍 {blog.upvotes}</span>
                      <span>👎 {blog.downvotes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import Navbar from '@/components/Global/Navbar'
import Footer from '@/components/Global/Footer'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'

type SearchParams = {
  q?: string
}

const buildCardGradient = (index: number) => {
  const palettes = [
    'from-blue-50 via-white to-slate-50',
    'from-amber-50 via-white to-orange-50',
    'from-emerald-50 via-white to-teal-50',
    'from-fuchsia-50 via-white to-pink-50'
  ]
  return palettes[index % palettes.length]
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const category = decodeURIComponent(resolvedParams.category)
  return {
    title: `${category} Articles - Zyvarin Social`,
    description: `Read ${category} insights and stories from Zyvarin Social.`
  }
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ category: string }>
  searchParams?: SearchParams
}) {
  const resolvedParams = await params
  const category = decodeURIComponent(resolvedParams.category)
  const q = searchParams?.q?.trim() || undefined

  const [filteredBlogs, taxonomySource] = await Promise.all([
    prisma.blog.findMany({
      where: {
        published: true,
        category,
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { excerpt: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }]
    }),
    prisma.blog.findMany({
      where: { published: true },
      select: { category: true, tags: true },
      orderBy: { publishedAt: 'desc' }
    })
  ])

  const categories = Array.from(new Set(taxonomySource.map((item) => item.category))).sort((a, b) =>
    a.localeCompare(b)
  )
  const tags = Array.from(new Set(taxonomySource.flatMap((item) => item.tags))).sort((a, b) =>
    a.localeCompare(b)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Category</p>
            <h1 className="text-4xl font-semibold text-slate-900 mt-2">{category}</h1>
            <p className="text-slate-600 mt-2">Articles curated for this topic.</p>
          </div>
          <div className="hidden md:block px-4 py-2 rounded-full bg-white shadow-sm text-slate-600 text-sm">
            {filteredBlogs.length} articles
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {filteredBlogs.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-800">No articles in this category yet.</p>
                <p className="text-slate-500 mt-2">Check back soon or explore another category.</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link
                    href="/blog"
                    className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    Browse all
                  </Link>
                </div>
              </div>
            ) : (
              filteredBlogs.map((blog, idx) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className={`group block overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br ${buildCardGradient(
                    idx
                  )} shadow-[0_20px_60px_-32px_rgba(15,23,42,0.45)]`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-6">
                    <div className="md:col-span-3 p-8 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-white">{blog.category}</span>
                        <span className="px-3 py-1 rounded-full bg-white/70 text-slate-700 border border-slate-100">
                          {formatDate(new Date(blog.publishedAt || blog.createdAt))}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/70 text-slate-700 border border-slate-100">
                          {blog.readTime} min read
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-semibold text-slate-900 leading-tight">
                            {blog.title}
                          </h2>
                          <p className="text-slate-600 mt-3 line-clamp-3 text-sm md:text-base">{blog.excerpt}</p>
                        </div>
                      </div>
                      {blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 rounded-full bg-white/70 border border-slate-100 text-slate-700"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2 relative h-full">
                      {blog.featuredImage ? (
                        <div className="h-full w-full">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="h-full w-full object-cover md:rounded-l-none rounded-b-3xl md:rounded-r-3xl"
                          />
                        </div>
                      ) : (
                        <div className="h-full w-full bg-slate-900 text-white flex items-center justify-center md:rounded-l-none rounded-b-3xl md:rounded-r-3xl">
                          <span className="text-xl font-semibold">{blog.title.slice(0, 1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Search</h3>
                <span className="text-xs text-slate-500">Find any idea</span>
              </div>
              <form className="relative" action={`/blog/categories/${encodeURIComponent(category)}`} method="GET">
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search in category"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 pr-28 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-10 px-4 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
                <Link href="/blog" className="text-xs text-slate-500 hover:text-slate-700">
                  All
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => {
                  const active = category === cat
                  return (
                    <Link
                      key={cat}
                      href={`/blog/categories/${encodeURIComponent(cat)}`}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                        active ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat}</span>
                      {active && <span className="text-xs">Selected</span>}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Tags</h3>
                <Link href="/blog" className="text-xs text-slate-500 hover:text-slate-700">
                  All
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-2 rounded-full border bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  )
}

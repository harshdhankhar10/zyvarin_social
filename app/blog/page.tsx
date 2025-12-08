'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ArrowRight, Search, Calendar, User, Tag } from 'lucide-react';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'How to Build Your Personal Brand on LinkedIn in 30 Days',
    excerpt: 'A step-by-step guide to growing your LinkedIn presence from zero to 10K followers. Includes content templates and posting schedule.',
    category: 'LinkedIn',
    author: 'Harsh',
    date: 'Dec 7, 2024',
    readTime: '8 min read',
    featured: true,
    image: '📌'
  },
  {
    id: 2,
    title: 'The 80/20 Rule for Social Media Content',
    excerpt: 'Stop creating content that nobody engages with. Learn the 80/20 framework that top creators use to get consistent engagement.',
    category: 'Strategy',
    author: 'Harsh',
    date: 'Dec 5, 2024',
    readTime: '6 min read',
    featured: true,
    image: '📊'
  },
  {
    id: 3,
    title: 'Twitter Growth Hacks: From 0 to 10K Followers',
    excerpt: 'The exact tactics used by top creators to grow on Twitter. Includes thread templates and engagement strategies that work in 2024.',
    category: 'Twitter',
    author: 'Harsh',
    date: 'Dec 3, 2024',
    readTime: '10 min read',
    featured: true,
    image: '🚀'
  },
  {
    id: 4,
    title: 'How I Automated My Social Media and Saved 20 Hours/Month',
    excerpt: 'The exact workflow I use to schedule content in batches and how it transformed my creator journey. Plus, tools and templates included.',
    category: 'Productivity',
    author: 'Harsh',
    date: 'Nov 28, 2024',
    readTime: '7 min read',
    featured: false,
    image: '⚙️'
  },
  {
    id: 5,
    title: 'AI-Powered Captions: How to Use AI to Write Better Posts',
    excerpt: 'The art and science of using AI for caption writing. Prompts, techniques, and examples that actually increase engagement.',
    category: 'AI',
    author: 'Harsh',
    date: 'Nov 25, 2024',
    readTime: '9 min read',
    featured: false,
    image: '🤖'
  },
  {
    id: 6,
    title: 'Cross-Platform Strategy: Posting Once, Growing Everywhere',
    excerpt: 'How to adapt content for different platforms without spending hours on repurposing. The one content → many platforms system.',
    category: 'Strategy',
    author: 'Harsh',
    date: 'Nov 20, 2024',
    readTime: '8 min read',
    featured: false,
    image: '🌐'
  }
];

const categories = [
  'All',
  'Strategy',
  'LinkedIn',
  'Twitter',
  'Dev.to',
  'AI',
  'Productivity',
  'Growth'
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <div className="w-full bg-white">
      <Navbar />

      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Creator's Blog
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Strategies, tips, and insights for growing your audience and building your personal brand on social media.
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-bold text-slate-600 uppercase mb-6">Featured Article</h2>
            <Link href={`/blog/${featuredPost.id}`}>
                <div className="grid md:grid-cols-2 gap-8 bg-blue-50 border border-blue-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center">
                    <div className="text-8xl">{featuredPost.image}</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="inline-block w-max bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {featuredPost.category}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-700 mb-6 text-lg">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-sm font-bold text-slate-600 uppercase mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center text-6xl group-hover:from-slate-200 group-hover:to-slate-300 transition-colors">
                        {post.image}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block w-max bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold mb-3">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="border-t border-slate-200 pt-4">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">By {post.author}</span>
                            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-blue-600 hover:underline font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get Weekly Tips</h2>
          <p className="text-lg text-slate-600 mb-8">
            Subscribe to our newsletter and get the latest creator strategies, tips, and Zyvarin updates delivered to your inbox.
          </p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              className="flex-1"
            />
            <Button>
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Level Up?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Implement these strategies in Zyvarin and watch your social media growth explode.
          </p>
          <Link href="/signup">
            <Button size="lg" className="group w-full sm:w-auto">
              Start Creating Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

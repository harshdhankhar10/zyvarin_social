'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ArrowRight, Search, Book, Zap, HelpCircle, MessageSquare, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const helpCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'New to Zyvarin? Start here to set up your account and schedule your first post.',
    articles: [
      { title: 'Create Your Account', href: '#' },
      { title: 'Connect Social Accounts', href: '#' },
      { title: 'Schedule Your First Post', href: '#' },
      { title: 'Set Up Your Team', href: '#' }
    ]
  },
  {
    icon: Zap,
    title: 'Features Guide',
    description: 'Learn how to use every feature in Zyvarin to maximize your productivity.',
    articles: [
      { title: 'Content Calendar', href: '#' },
      { title: 'AI Suggestions', href: '#' },
      { title: 'Analytics & Insights', href: '#' },
      { title: 'Team Collaboration', href: '#' }
    ]
  },
  {
    icon: HelpCircle,
    title: 'Troubleshooting',
    description: 'Something not working? Find solutions to common issues and problems.',
    articles: [
      { title: 'Post Failed to Schedule', href: '#' },
      { title: 'Account Connection Issues', href: '#' },
      { title: 'Analytics Not Updating', href: '#' },
      { title: 'Performance & Speed', href: '#' }
    ]
  },
  {
    icon: MessageSquare,
    title: 'Billing & Account',
    description: 'Questions about billing, subscriptions, upgrades, or your account settings.',
    articles: [
      { title: 'Upgrade or Downgrade Plan', href: '#' },
      { title: 'Manage Billing Settings', href: '#' },
      { title: 'Refund Policy', href: '#' },
      { title: 'Cancel Subscription', href: '#' }
    ]
  }
];

const populardocs = [
  { title: 'How to Schedule Posts on Multiple Platforms', views: '2.3K' },
  { title: 'Using AI to Generate Better Captions', views: '1.8K' },
  { title: 'Understanding Your Analytics Dashboard', views: '1.5K' },
  { title: 'Connecting LinkedIn Profile to Zyvarin', views: '1.2K' },
  { title: 'Team Permissions and Roles Explained', views: '980' },
  { title: 'Bulk Upload: Schedule 30 Days in Minutes', views: '850' }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-white">
      <Navbar />

      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Help Center
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Find answers, learn how-tos, and troubleshoot issues. We're here to help you succeed.
          </p>

          <div className="relative mb-4">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 py-3 text-lg"
            />
          </div>
          <p className="text-sm text-slate-500">
            Popular searches: scheduling posts, AI features, analytics, billing
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {helpCategories.map((category, i) => {
              const IconComponent = category.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
                      <p className="text-slate-600 mt-1">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-slate-200 pt-6">
                    {category.articles.map((article, idx) => (
                      <a
                        key={idx}
                        href={article.href}
                        className="flex items-center justify-between py-2 text-slate-700 hover:text-blue-600 group"
                      >
                        <span className="font-medium">{article.title}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>

                  <Link href="#" className="block mt-6 text-blue-600 hover:underline font-semibold text-sm">
                    View all articles →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Most Popular Articles</h2>

          <div className="space-y-3">
            {populardocs.map((doc, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <span className="font-medium text-slate-900 group-hover:text-blue-600">{doc.title}</span>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-slate-500">{doc.views} views</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Video Tutorials</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: '5-Minute Setup Guide', duration: '5:32' },
              { title: 'Scheduling Posts Across Platforms', duration: '8:15' },
              { title: 'Using AI to Write Captions', duration: '6:42' },
              { title: 'Team Collaboration Features', duration: '9:18' }
            ].map((video, i) => (
              <a
                key={i}
                href="#"
                className="bg-slate-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-slate-200 to-slate-300 aspect-video flex items-center justify-center">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600">{video.title}</h3>
                  <p className="text-sm text-slate-600">{video.duration}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="#" className="text-blue-600 hover:underline font-semibold">
              View All Tutorials →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <p className="text-slate-700">Comprehensive articles</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
              <p className="text-slate-700">Video tutorials</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <p className="text-slate-700">Customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Our support team is here to help. Get an answer within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="group w-full sm:w-auto">
                Contact Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:harsh@zyvarin.com">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Email harsh@zyvarin.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Join Our Community</h2>
          <p className="text-lg text-slate-600 mb-8">
            Connect with other creators, share tips, and get inspired by what others are building.
          </p>
          <div className="space-y-4 max-w-md mx-auto">
            {[
              { platform: 'Twitter', handle: '@zyvarin_social', cta: 'Follow on Twitter' },
              { platform: 'LinkedIn', handle: 'Zyvarin Social', cta: 'Follow on LinkedIn' },
              { platform: 'Discord', handle: 'Join Community', cta: 'Join Discord Server' }
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.platform}</p>
                  <p className="text-sm text-slate-600">{item.handle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

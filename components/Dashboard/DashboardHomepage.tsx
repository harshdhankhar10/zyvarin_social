"use client"

import React from 'react'
import Link from 'next/link'
import {
    BarChart3, Users, TrendingUp,
    Linkedin, Twitter, Globe, CheckCircle,
    Clock, Code2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { formatDate } from '@/utils/formatDate'

const DashboardHomepage = ({ data }: any) => {
    const router = useRouter()

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'linkedin': return <Linkedin className="w-4 h-4" />
            case 'twitter': return <Twitter className="w-4 h-4" />
            case 'devto': return <Code2 className="w-4 h-4" />
            default: return <Globe className="w-4 h-4" />
        }
    }

    const getStatusIcon = (status: string) => {
        if (status === 'POSTED') {
            return <CheckCircle className="w-4 h-4 text-green-600" />
        }
        return <Clock className="w-4 h-4 text-amber-600" />
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-10">
                
                <div className="mb-12">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                Welcome back, {data.user.name}
                            </h1>
                            <p className="text-gray-500">
                                Here's what's happening with your accounts
                            </p>
                        </div>
                        <div>
                            {data.user.plan === 'FREE' ? (
                                <Button onClick={() => router.push('/dashboard/settings/billing')}>
                                    Upgrade Plan
                                </Button>
                            ) : (
                                <span className="text-sm text-gray-600">
                                    {data.user.plan} Plan
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div className="border border-gray-200 rounded p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">Connected Platforms</span>
                            <Users className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {data.stats.connectedPlatforms}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">active</p>
                    </div>

                    <div className="border border-gray-200 rounded p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">Posts This Month</span>
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {data.stats.postsThisMonth}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">{data.remainingPosts} remaining</p>
                    </div>

                    <div className="border border-gray-200 rounded p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">AI Enhancements</span>
                            <BarChart3 className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {data.remainingAIGenerations}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">this month</p>
                    </div>

                    <div className="border border-gray-200 rounded p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">Plan Status</span>
                            <span className="text-xs font-medium text-gray-700">{data.user.plan}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {data.stats.connectedPlatforms > 0 ? 'Active' : 'Setup'}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">account</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2">
                        <div className="border border-gray-200 rounded p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Recent Posts</h2>
                                <Link href="/dashboard/analytics" className="text-sm text-blue-600">
                                    View all
                                </Link>
                            </div>

                            {data.recentPosts && data.recentPosts.length > 0 ? (
                                <div className="space-y-3">
                                    {data.recentPosts.slice(0, 5).map((post: any) => (
                                        <div key={post.id} className="border border-gray-200 rounded p-4">
                                            <div className="flex items-start gap-4">
                                                <div className="pt-1">
                                                    {getPlatformIcon(post.platform)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium text-gray-900 capitalize">
                                                            {post.platform}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            {getStatusIcon(post.status)}
                                                            <span className="text-xs text-gray-500">
                                                                {post.postedAt ? formatDate(post.postedAt) : 'Scheduled'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-2">
                                                        {post.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-600 mb-3">No posts published yet</p>
                                    <Link href="/dashboard/compose" className="text-sm text-blue-600">
                                        Create first post
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="border border-gray-200 rounded p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Connected Accounts</h2>

                            {data.connectedPlatforms && data.connectedPlatforms.length > 0 ? (
                                <div className="space-y-3">
                                    {data.connectedPlatforms.map((platform: string) => (
                                        <div key={platform} className="flex items-center gap-3 p-3 border border-gray-200 rounded">
                                            <div className="flex-shrink-0">
                                                {getPlatformIcon(platform)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 capitalize">
                                                    {platform}
                                                </p>
                                                <p className="text-xs text-gray-500">Connected</p>
                                            </div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-sm text-gray-600 mb-3">No accounts connected</p>
                                    <Link href="/dashboard/connect-accounts" className="text-sm text-blue-600">
                                        Connect account
                                    </Link>
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <Link href="/dashboard/compose">
                                    <button className="w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded hover:bg-gray-50">
                                        New Post
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Getting Started</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">1. Connect Accounts</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Link your LinkedIn, Twitter, and other social platforms to manage from one place.
                            </p>
                            <Link href="/dashboard/connect-accounts" className="text-sm text-blue-600">
                                Get started
                            </Link>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">2. Create Posts</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Write and schedule posts to publish across all your connected accounts.
                            </p>
                            <Link href="/dashboard/compose" className="text-sm text-blue-600">
                                Create post
                            </Link>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">3. View Analytics</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Track performance metrics and engagement across your social accounts.
                            </p>
                            <Link href="/dashboard/analytics" className="text-sm text-blue-600">
                                View analytics
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardHomepage
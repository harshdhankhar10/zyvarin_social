"use client"

import React from 'react'
import Link from 'next/link'
import {
    BarChart3, Sparkles, Users, TrendingUp,
    Calendar, ArrowUpRight, FileText,
    Linkedin, Twitter, Globe, CheckCircle,
    Clock, Plus
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const DashboardHomepage = ({ data }: any) => {
    const router = useRouter()

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-600" />
            case 'twitter': return <Twitter className="w-4 h-4 text-sky-500" />
            default: return <Globe className="w-4 h-4 text-gray-600" />
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'POSTED': return <CheckCircle className="w-3 h-3 text-green-500" />
            default: return <Clock className="w-3 h-3 text-yellow-500" />
        }
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto">
                <div className="mb-8 mt-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {data.user.name} 👋</h1>
                        <p className="text-gray-600">Here's what's happening with your social media</p>
                    </div>
                    {data.user.plan === 'FREE' ? (
                        <Button
                            onClick={() => router.push('/dashboard/settings/billing')}
                        >
                            ⚡ Upgrade Plan
                        </Button>
                    ) : (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${data.user.plan === 'CREATOR' ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800' :
                                'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800'
                            }`}>
                            ✓ {data.user.plan} Plan
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-blue-600 flex items-center">
                                {data.stats.connectedPlatforms} connected
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.stats.connectedPlatforms}</h3>
                        <p className="text-sm text-gray-600">Active Platforms</p>
                        <div className="mt-4">
                            <Link
                                href="/dashboard/connect-accounts"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            >
                                Connect more
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <BarChart3 className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-green-600 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {data.stats.postsThisMonth} this month
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {data.remainingPosts} Posts Left
                            </h3>
                        <p className="text-sm text-gray-600">Total Posts</p>
                        <div className="mt-4">
              
                            {data.canPublishPost ? (
                                <Link
                                    href="/dashboard/compose">
                                    <span className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">Create new post
                                        <Plus className="w-3 h-3" />
                                    </span>
                                </Link>
                            ) : (
                                <span className="text-sm text-gray-400 cursor-not-allowed font-medium flex items-center gap-1">
                                    Quota reached for this month
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-purple-600 flex items-center">
                                {data.stats.aiUsesThisMonth} this month
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {data.remainingAIGenerations} Enhancements Left
                            </h3>
                        <p className="text-sm text-gray-600">AI Enhancements</p>
                        <div className="mt-4">
                                {data.canCreateAIContent ? ( <Link
                                href="/dashboard/analytics"
                                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                            >
                                View usage
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        ) : (
                            <span className="text-sm text-gray-400 cursor-not-allowed font-medium flex items-center gap-1">
                                Quota reached for this month
                            </span>
                        )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">
                                Plan: {data.user.plan}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Today</h3>
                        <p className="text-sm text-gray-600">Ready to publish</p>
                        <div className="mt-4">
                            {data.canPublishPost ? (
                            <Button
                                onClick={() => router.push('/dashboard/compose')}
                                className='w-full'
                            >
                                Compose Post
                            </Button>
                            ) : (
                                <Button variant={"outline"} className='w-full' onClick={() => router.push('/dashboard/settings/billing')}>
                                    Upgrade Plan to Publish
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
                                <p className="text-sm text-gray-500">Latest published content</p>
                            </div>
                            <Link
                                href="/dashboard/analytics"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View all
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {data.recentPosts.length > 0 ? (
                                data.recentPosts.map((post: any) => (
                                    <div key={post.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                        <div className="p-2 rounded-lg bg-gray-100">
                                            {getPlatformIcon(post.platform)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-900 capitalize">{post.platform}</span>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(post.status)}
                                                    <span className="text-xs text-gray-500">
                                                        {post.postedAt ? formatDate(post.postedAt) : 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No posts yet</p>
                                    <Link
                                        href="/dashboard/compose"
                                        className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Create your first post →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Connected Platforms</h3>
                                <p className="text-sm text-gray-500">Your active social accounts</p>
                            </div>
                            <Link
                                href="/dashboard/connect-accounts"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Manage
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {data.connectedPlatforms.length > 0 ? (
                                data.connectedPlatforms.map((platform: string) => (
                                    <div key={platform} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gray-100">
                                                {getPlatformIcon(platform)}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900 capitalize">{platform}</span>
                                                <div className="text-xs text-gray-500">Connected</div>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No platforms connected</p>
                                    <Link
                                        href="/dashboard/connect-accounts"
                                        className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Connect your first account →
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/dashboard/compose"
                                    className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Plus className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-700">New Post</span>
                                    </div>
                                    <p className="text-xs text-blue-600">Start composing</p>
                                </Link>

                                <Link
                                    href="/dashboard/analytics"
                                    className="p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <BarChart3 className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-700">Analytics</span>
                                    </div>
                                    <p className="text-xs text-green-600">View insights</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
                            <p className="text-sm text-gray-500">Next steps for your account</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-900">Connect Accounts</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">Link your social media accounts to start publishing</p>
                            <Link
                                href="/dashboard/connect-accounts"
                                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Connect now →
                            </Link>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="font-medium text-gray-900">Try AI Enhance</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">Improve your posts with AI-powered suggestions</p>
                            <Link
                                href="/dashboard/compose"
                                className="inline-block text-sm font-medium text-purple-600 hover:text-purple-700"
                            >
                                Enhance content →
                            </Link>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <BarChart3 className="w-5 h-5 text-green-600" />
                                </div>
                                <span className="font-medium text-gray-900">View Analytics</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">Track your performance and insights</p>
                            <Link
                                href="/dashboard/analytics"
                                className="inline-block text-sm font-medium text-green-600 hover:text-green-700"
                            >
                                View dashboard →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHomepage
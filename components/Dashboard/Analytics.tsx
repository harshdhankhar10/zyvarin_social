"use client"

import React, { useState } from 'react'
import { 
  TrendingUp, TrendingDown, Users, Target, Calendar, 
  BarChart3, PieChart, Filter, Download, MoreVertical,
  CheckCircle, XCircle, Clock, Linkedin, Twitter,
  ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles,
  Zap, Wand2, Brain, FileText,
  Code2
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'

interface AIUsage {
  id: string
  type: string
  createdAt: Date
  platforms: string[]
  enhancements: string[]
}

interface Overview {
  totalPosts: number
  postsThisMonth: number
  successRate: number
  successfulPosts: number
  failedPosts: number
  totalAiUses: number
  aiUsesThisMonth: number
  aiUsesThisWeek: number
  postsThisWeek: number
  postsLast30Days: number
}

interface MonthlyTrend {
  month: string
  posts: number
}

interface AIUsageData {
  recentUses: AIUsage[]
  mostUsedEnhancements: Record<string, number>
  platformUsage: Record<string, number>
}

interface PlatformStats {
  total: number
  successful: number
  failed: number
}

interface AnalyticsData {
  overview: Overview
  monthlyTrends: MonthlyTrend[]
  aiUsage: AIUsageData
  platformPerformance: Record<string, PlatformStats>
  currentPlan: string | null
}

const Analytics = ({ data }: { data: AnalyticsData }) => {
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const platformColors: Record<string, string> = {
    linkedin: '#0077B5',
    twitter: '#1DA1F2',
    facebook: '#1877F2',
    instagram: '#E4405F',
    medium: '#00AB6C'
  }

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'linkedin': return <Linkedin className="w-4 h-4" />
      case 'twitter': return <Twitter className="w-4 h-4" />
      case 'devto': return <Code2 className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }



  const refreshData = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
    router.refresh()
  }

  const aiEnhancementColors: Record<string, string> = {
    'Professional': '#3B82F6',
    'Conversational': '#10B981',
    'Educational': '#8B5CF6',
    'Inspirational': '#F59E0B',
    'Persuasive': '#EF4444',
    'Casual': '#6B7280',
    'Short & Punchy': '#EC4899',
    'Detailed Professional': '#6366F1',
    'Engaging Story': '#0EA5E9',
    'Thread Format': '#84CC16',
    'Twitter Optimized': '#1DA1F2',
    'LinkedIn Ready': '#0077B5',
    'Cross-Platform': '#8B5CF6'
  }

  const topEnhancements = Object.entries(data.aiUsage.mostUsedEnhancements || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your social media performance and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={refreshData}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-200"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className={`text-sm font-medium flex items-center ${data.overview.postsThisMonth > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                {data.overview.postsThisMonth > 0 ? <ArrowUpRight className="w-4 h-4" /> : '-'}
                This month
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{formatNumber(data.overview.totalPosts)}</h3>
            <p className="text-sm text-gray-600">Total Posts Published</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Success Rate</span>
                <span className="text-sm font-semibold text-green-600">{data.overview.successRate}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                {data.overview.successfulPosts} successful
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{formatNumber(data.overview.successfulPosts)}</h3>
            <p className="text-sm text-gray-600">Successful Posts</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Failed Posts</span>
                <span className="text-sm font-semibold text-red-600">{data.overview.failedPosts}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                {data.overview.aiUsesThisMonth} this month
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{formatNumber(data.overview.totalAiUses)}</h3>
            <p className="text-sm text-gray-600">AI Enhancements Used</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">This Week</span>
                <span className="text-sm font-semibold text-purple-600">{data.overview.aiUsesThisWeek}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                {data.overview.postsLast30Days} last 30d
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{formatNumber(data.overview.postsThisWeek)}</h3>
            <p className="text-sm text-gray-600">Posts This Week</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">This Month</span>
                <span className="text-sm font-semibold text-blue-600">{data.overview.postsThisMonth}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Monthly Publishing Trend</h3>
                <p className="text-sm text-gray-500">Posts published over time</p>
              </div>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            {data.currentPlan === "FREE" ? (
              <div className="flex flex-col items-center justify-center h-80 text-center px-4">
                <Zap className="w-12 h-12 text-yellow-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">Upgrade to Access Analytics</h4>
              </div>
            ) : (
              <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#666" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} posts`, 'Count']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="posts" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Posts Published"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            ) }
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Usage Statistics</h3>
                <p className="text-sm text-gray-500">Most used enhancement types</p>
              </div>
              <Brain className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={topEnhancements.map(([name, value]) => ({
                      name,
                      value
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent! * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topEnhancements.map(([name], index) => (
                      <Cell key={`cell-${index}`} fill={aiEnhancementColors[name] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} uses`, 'Count']}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Usage History</h3>
                <p className="text-sm text-gray-500">Recent AI enhancement activities</p>
              </div>
              <Wand2 className="w-5 h-5 text-gray-400" />
            </div>
            
            {data.currentPlan === "FREE" ? (
              <div className="flex flex-col items-center justify-center h-80 text-center px-4">
                <Zap className="w-12 h-12 text-yellow-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">Upgrade to Access AI Usage History</h4>
              </div>
            ) : (
              <div className="space-y-4">
              {data.aiUsage.recentUses.map((usage: AIUsage) => (
                <div key={usage.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{usage.type.replace('_', ' ')}</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(usage.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">Platforms:</span>
                      <div className="flex flex-wrap gap-1">
                        {usage.platforms.map((platform: string) => (
                          <span key={platform} className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">Enhancements:</span>
                      <div className="flex flex-wrap gap-1">
                        {usage.enhancements.map((enhancement: string) => (
                          <span 
                            key={enhancement} 
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{
                              backgroundColor: `${aiEnhancementColors[enhancement] || '#6B7280'}20`,
                              color: aiEnhancementColors[enhancement] || '#6B7280'
                            }}
                          >
                            {enhancement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {data.aiUsage.recentUses.length === 0 && (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No AI usage yet</h4>
                  <p className="text-sm text-gray-500">Start using AI enhancements to see history here</p>
                </div>
              )}
            </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                <p className="text-sm text-gray-500">Your AI usage patterns</p>
              </div>
              <Brain className="w-5 h-5 text-gray-400" />
            </div>
            
           { data.currentPlan === "FREE" ? (
              <div className="flex flex-col items-center justify-center h-80 text-center px-4">
                <p className="text-gray-500">Upgrade to a paid plan to access detailed AI insights.</p>
              </div>
           ) : (
             <div className="space-y-6">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-3">Most Used Enhancements</h5>
                <div className="space-y-3">
                  {topEnhancements.map(([name, count]) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: aiEnhancementColors[name] || '#6B7280' }}
                        />
                        <span className="text-sm text-gray-700">{name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{count} uses</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Platform AI Usage</h5>
                <div className="space-y-3">
                  {Object.entries(data.aiUsage.platformUsage || {}).map(([platform, count]: [string, number]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(platform)}
                        <span className="text-sm text-gray-700 capitalize">{platform}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{count} times</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Usage Summary</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Total Uses</div>
                    <div className="text-lg font-semibold text-gray-900">{data.overview.totalAiUses}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">This Month</div>
                    <div className="text-lg font-semibold text-purple-600">{data.overview.aiUsesThisMonth}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">This Week</div>
                    <div className="text-lg font-semibold text-purple-600">{data.overview.aiUsesThisWeek}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Avg/Month</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {Math.round(data.overview.totalAiUses / 3)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
           )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Platform Performance</h3>
              <p className="text-sm text-gray-500">Detailed breakdown by platform</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Success Rate</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${data.overview.successRate}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{data.overview.successRate}%</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Platform</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total Posts</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Successful</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Failed</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Success Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">AI Uses</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.platformPerformance).map(([platform, stats]: [string, PlatformStats]) => {
                  const successRate = stats.total > 0 ? Math.round((stats.successful / stats.total) * 100) : 0
                  const aiUses = data.aiUsage.platformUsage?.[platform] || 0
                  
                  return (
                    <tr key={platform} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${platformColors[platform]}20` }}>
                            {getPlatformIcon(platform)}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 capitalize">{platform}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                                {platform === 'linkedin' ? 'Professional' : platform === 'twitter' ? 'Real-time' : 'Social'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-lg font-semibold text-gray-900">{stats.total}</div>
                        <div className="text-xs text-gray-500">posts</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">{stats.successful}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="font-medium text-red-600">{stats.failed}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500" 
                              style={{ width: `${successRate}%` }}
                            />
                          </div>
                          <span className="font-medium text-gray-900">{successRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span className="font-medium text-purple-600">{aiUses}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
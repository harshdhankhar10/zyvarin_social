"use client"

import React, { useState } from 'react'
import { 
  TrendingUp, TrendingDown, Users, Target, Calendar, 
  BarChart3, PieChart, Filter, Download, MoreVertical,
  CheckCircle, XCircle, Clock, Linkedin, Twitter,
  ArrowUpRight, ArrowDownRight, RefreshCw
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useRouter } from 'next/navigation'

const Analytics = ({ data }: any) => {
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
      default: return <Users className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'POSTED': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'FAILED': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const refreshData = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
    router.refresh()
  }

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
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Download className="w-4 h-4" />
                Export
              </button>
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
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                {data.overview.connectedPlatforms} connected
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{formatNumber(data.overview.connectedPlatforms)}</h3>
            <p className="text-sm text-gray-600">Active Platforms</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {Object.keys(data.platformPerformance).map(platform => (
                  <span key={platform} className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                    {platform}
                  </span>
                ))}
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
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Platform Distribution</h3>
                <p className="text-sm text-gray-500">Posts by social platform</p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={Object.entries(data.platformPerformance).map(([platform, stats]: [string, any]) => ({
                      name: platform.charAt(0).toUpperCase() + platform.slice(1),
                      value: stats.total,
                      success: stats.successful,
                      failed: stats.failed
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent! * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(data.platformPerformance).map(([platform], index) => (
                      <Cell key={`cell-${index}`} fill={platformColors[platform] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => {
                      if (name === 'value') return [`${value} posts`, 'Total Posts']
                      return [value, name]
                    }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.platformPerformance).map(([platform, stats]: [string, any]) => {
                  const platformData = data.recentPosts.find((p: any) => p.platform === platform)
                  const successRate = stats.total > 0 ? Math.round((stats.successful / stats.total) * 100) : 0
                  
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
                        <div className="text-sm text-gray-600">
                          {platformData?.postedAt ? formatDate(platformData.postedAt) : 'Never'}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-sm text-gray-500">Latest posts and updates</p>
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {data.recentPosts.slice(0, 5).map((post: any) => (
                <div key={post.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-lg bg-gray-100">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 capitalize">{post.platform}</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(post.status)}
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          post.status === 'POSTED' ? 'bg-green-100 text-green-800' :
                          post.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.postedAt ? formatDate(post.postedAt) : 'Not posted'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                  </div>
                </div>
              ))}
              
              {data.recentPosts.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No posts yet</h4>
                  <p className="text-sm text-gray-500">Start publishing to see your analytics here</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
                <p className="text-sm text-gray-500">Your account details</p>
              </div>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-indigo-600">
                      {data.user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{data.user.name}</h4>
                    <p className="text-sm text-gray-500">{data.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subscription Plan</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    data.user.plan === 'FREE' ? 'bg-gray-100 text-gray-800' :
                    data.user.plan === 'CREATOR' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {data.user.plan || 'FREE'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(data.user.joinedDate)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Connected Platforms</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.overview.connectedPlatforms}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatNumber(data.overview.totalPosts)}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">This Week</div>
                    <div className="text-lg font-semibold text-gray-900">{data.overview.postsThisWeek}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">This Month</div>
                    <div className="text-lg font-semibold text-gray-900">{data.overview.postsThisMonth}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                    <div className="text-lg font-semibold text-green-600">{data.overview.successRate}%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Avg. Posts/Day</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {(data.overview.totalPosts / 30).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
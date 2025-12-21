'use client'

import React from 'react'
import { TrendingUp, Users, Zap, FileText, DollarSign, Activity } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'

interface Transaction {
  id: string
  type: string
  amount: number
  status: string
  createdAt: Date
  user: { fullName: string; email: string }
}

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  totalAIUsage: number
  totalRevenue: number
  totalTransactions: number
  subscriptionBreakdown: { plan: string; count: number }[]
  recentTransactions: Transaction[]
  aiUsageByType: { type: string; count: number }[]
  postsByStatus: { status: string; count: number }[]
  monthlyRevenue: { month: string; total: number }[]
}

interface AnalyticsClientProps {
  data: AnalyticsData
}

const AnalyticsClient = ({ data }: AnalyticsClientProps) => {
  const statCards = [
    {
      label: 'Total Users',
      value: data.totalUsers,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Users',
      value: data.activeUsers,
      icon: Activity,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Posts',
      value: data.totalPosts,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'AI Usage',
      value: data.totalAIUsage,
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Total Revenue',
      value: `₹${data.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Transactions',
      value: data.totalTransactions,
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Platform performance and user metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className={`${card.bgColor} border border-gray-200 rounded-lg p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Subscription Breakdown</h2>
          <div className="space-y-3">
            {data.subscriptionBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.plan}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(item.count / data.totalUsers) * 100 || 0}%`,
                        backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899'][idx % 3],
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Posts by Status</h2>
          <div className="space-y-3">
            {data.postsByStatus.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.status}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(item.count / data.totalPosts) * 100 || 0}%`,
                        backgroundColor: item.status === 'POSTED' ? '#10B981' : item.status === 'SCHEDULED' ? '#F59E0B' : '#EF4444',
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">AI Usage by Type</h2>
          <div className="space-y-2">
            {data.aiUsageByType.length === 0 ? (
              <p className="text-gray-500 text-sm">No AI usage data</p>
            ) : (
              data.aiUsageByType.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.type}</span>
                  <span className="font-bold text-gray-900">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Monthly Revenue (Last 12 Months)</h2>
          <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
            {data.monthlyRevenue.length === 0 ? (
              <p className="text-gray-500">No revenue data</p>
            ) : (
              data.monthlyRevenue.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.month}</span>
                  <span className="font-bold text-gray-900">₹{item.total.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500 text-sm">
                    No transactions
                  </td>
                </tr>
              ) : (
                data.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.user.fullName}</p>
                        <p className="text-xs text-gray-500">{transaction.user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{transaction.type}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{transaction.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(transaction.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsClient

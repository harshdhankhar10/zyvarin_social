import prisma from '@/lib/prisma'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { notFound } from 'next/navigation'
import AnalyticsClient from '@/components/Admin/AnalyticsClient'

export default async function AnalyticsPage() {
  const admin = await currentLoggedInUserInfo()

  if (!admin || admin.role !== 'ADMIN') {
    notFound()
  }

  const [
    totalUsers,
    activeUsers,
    totalPosts,
    totalAIUsage,
    totalRevenue,
    totalTransactions,
    subscriptionBreakdown,
    recentTransactions,
    aiUsageByType,
    postsByStatus,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.post.count(),
    prisma.aI_Usage.count(),
    prisma.transaction.aggregate({
      where: { status: 'SUCCESS' },
      _sum: { amount: true },
    }),
    prisma.transaction.count({ where: { status: 'SUCCESS' } }),
    prisma.user.groupBy({
      by: ['subscription_plan'],
      _count: true,
    }),
    prisma.transaction.findMany({
      where: { status: 'SUCCESS' },
      select: {
        id: true,
        transactionType: true,
        amount: true,
        status: true,
        createdAt: true,
        user: { select: { fullName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.aI_Usage.groupBy({
      by: ['type'],
      _count: true,
    }),
    prisma.post.groupBy({
      by: ['status'],
      _count: true,
    }),
    (prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM(amount) as total
      FROM "Transaction"
      WHERE status = 'SUCCESS' AND "createdAt" >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
      LIMIT 12
    `) as unknown as Promise<any[]>,
  ])

  const analyticsData = {
    totalUsers,
    activeUsers,
    totalPosts,
    totalAIUsage,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalTransactions,
    subscriptionBreakdown: subscriptionBreakdown.map((item) => ({
      plan: item.subscription_plan || 'Unknown',
      count: item._count,
    })),
    recentTransactions: recentTransactions.map((t) => ({
      ...t,
      type: t.transactionType,
      createdAt: new Date(t.createdAt),
    })),
    aiUsageByType: aiUsageByType.map((item) => ({
      type: item.type,
      count: item._count,
    })),
    postsByStatus: postsByStatus.map((item) => ({
      status: item.status,
      count: item._count,
    })),
    monthlyRevenue: monthlyRevenue.map((item: any) => ({
      month: item.month ? new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'Unknown',
      total: parseFloat(item.total) || 0,
    })).reverse(),
  }

  return <AnalyticsClient data={analyticsData} />
}
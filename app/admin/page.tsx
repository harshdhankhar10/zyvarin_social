import prisma from '@/lib/prisma'
import AdminDashboard from '@/components/Admin/AdminDashboard'

export default async function AdminDashboardPage() {
  const [totalUsers, activeUsers, totalRevenue, totalPosts] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { status: 'ACTIVE' }
    }),
    prisma.transaction.aggregate({
      where: { status: 'SUCCESS' },
      _sum: { amount: true }
    }),
    prisma.post.count({
      where: { status: 'POSTED' }
    })
  ])

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      fullName: true,
      email: true,
      subscription_plan: true,
      createdAt: true,
      avatarUrl: true
    }
  })

  const stats = {
    totalUsers,
    activeUsers,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalPosts,
    recentUsers
  }

  return <AdminDashboard stats={stats} />
}
import Analytics from '@/components/Dashboard/Analytics'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, subDays, subMonths } from 'date-fns'
import { currentUserPlan } from '../pricingUtils'
const Page = async () => {
  const session = await currentLoggedInUserInfo()
  
  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
    include: {
      socialProviders: {
        include: {
          posts: true
        }
      },
      aiUsages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 50
      }
    }
  })

  if (!user) {
    return null
  }

  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)
  const weekStart = startOfWeek(now)
  const weekEnd = endOfWeek(now)
  const thirtyDaysAgo = subDays(now, 30)
  const threeMonthsAgo = subMonths(now, 3)

  const totalPosts = user.socialProviders.reduce((acc, provider) => acc + provider.posts.length, 0)
  
  const successfulPosts = user.socialProviders.reduce((acc, provider) => 
    acc + provider.posts.filter(post => post.status === 'POSTED').length, 0
  )
  
  const failedPosts = user.socialProviders.reduce((acc, provider) => 
    acc + provider.posts.filter(post => post.status === 'FAILED').length, 0
  )

  const postsThisMonth = user.socialProviders.reduce((acc, provider) => 
    acc + provider.posts.filter(post => 
      post.postedAt && post.postedAt >= monthStart && post.postedAt <= monthEnd
    ).length, 0
  )

  const postsThisWeek = user.socialProviders.reduce((acc, provider) => 
    acc + provider.posts.filter(post => 
      post.postedAt && post.postedAt >= weekStart && post.postedAt <= weekEnd
    ).length, 0
  )

  const postsLast30Days = user.socialProviders.reduce((acc, provider) => 
    acc + provider.posts.filter(post => 
      post.postedAt && post.postedAt >= thirtyDaysAgo
    ).length, 0
  )

  const connectedPlatforms = user.socialProviders
    .filter(provider => provider.isConnected)
    .map(provider => provider.provider)

  const postsByPlatform = user.socialProviders.reduce((acc, provider) => {
    if (!acc[provider.provider]) {
      acc[provider.provider] = {
        total: 0,
        successful: 0,
        failed: 0
      }
    }
    acc[provider.provider].total = provider.posts.length
    acc[provider.provider].successful = provider.posts.filter(p => p.status === 'POSTED').length
    acc[provider.provider].failed = provider.posts.filter(p => p.status === 'FAILED').length
    return acc
  }, {} as Record<string, { total: number, successful: number, failed: number }>)

  const monthlyTrends = Array.from({ length: 6 }, (_, i) => {
    const month = subMonths(now, 5 - i)
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)
    
    const monthPosts = user.socialProviders.reduce((acc, provider) => 
      acc + provider.posts.filter(post => 
        post.postedAt && post.postedAt >= monthStart && post.postedAt <= monthEnd
      ).length, 0
    )
    
    return {
      month: month.toLocaleDateString('en-US', { month: 'short' }),
      posts: monthPosts
    }
  })

  const recentPosts = user.socialProviders.flatMap(provider => 
    provider.posts.map(post => ({
      id: post.id,
      content: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
      platform: provider.provider,
      status: post.status,
      postedAt: post.postedAt,
      createdAt: post.createdAt
    }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10)

  const aiUsageStats = {
    totalUses: user.aiUsages.length,
    usesThisMonth: user.aiUsages.filter(usage => usage.createdAt >= monthStart).length,
    usesThisWeek: user.aiUsages.filter(usage => usage.createdAt >= weekStart).length,
    mostUsedEnhancements: user.aiUsages.reduce((acc, usage) => {
      usage.enhancement_types.forEach(type => {
        acc[type] = (acc[type] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>),
    platformUsage: user.aiUsages.reduce((acc, usage) => {
      usage.platforms_enhanced.forEach(platform => {
        acc[platform] = (acc[platform] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>),
    recentUses: user.aiUsages.slice(0, 10).map(usage => ({
      id: usage.id,
      type: usage.type,
      platforms: usage.platforms_enhanced,
      enhancements: usage.enhancement_types,
      createdAt: usage.createdAt
    }))
  }

  const analyticsData = {
    overview: {
      totalPosts,
      successfulPosts,
      failedPosts,
      successRate: totalPosts > 0 ? Math.round((successfulPosts / totalPosts) * 100) : 0,
      connectedPlatforms: connectedPlatforms.length,
      postsThisMonth,
      postsThisWeek,
      postsLast30Days,
      totalAiUses: aiUsageStats.totalUses,
      aiUsesThisMonth: aiUsageStats.usesThisMonth,
      aiUsesThisWeek: aiUsageStats.usesThisWeek
    },
    platformPerformance: postsByPlatform,
    monthlyTrends,
    recentPosts,
    aiUsage: aiUsageStats,
    user: {
      name: user.fullName,
      email: user.email,
      plan: user.subscription_plan,
      joinedDate: user.createdAt,
    },
    currentPlan: await currentUserPlan(user.id)
  }

  return (
    <div>
      <Analytics data={analyticsData} />
    </div>
  )
}

export default Page
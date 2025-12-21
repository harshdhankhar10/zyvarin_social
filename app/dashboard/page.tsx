import DashboardHomepage from '@/components/Dashboard/DashboardHomepage'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { startOfMonth } from 'date-fns'
import { canCreateAIContent, canPublishPost, getRemainingAIGenerations, getRemainingPosts } from './pricingUtils'

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
        where: {
          isConnected: true
        },
        include: {
          posts: {
            select: {
              id: true,
              content: true,
              status: true,
              postedAt: true,
              createdAt: true,
              mediaUrls: true
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 5
          }
        }
      },
      aiUsages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 3
      }
    }
  })

  if (!user) {
    return null
  }

  const monthStart = startOfMonth(new Date())
  
  const totalPosts = user.socialProviders.reduce((acc, provider) => acc + provider.posts.length, 0)
  const postsThisMonth = user.socialProviders.reduce((acc, provider) => 
    acc + provider.posts.filter(post => post.createdAt >= monthStart).length, 0
  )
  
  const totalAiUses = user.aiUsages.length
  const aiUsesThisMonth = user.aiUsages.filter(usage => usage.createdAt >= monthStart).length

  const connectedPlatforms = user.socialProviders
    .filter(provider => provider.isConnected)
    .map(provider => provider.provider)

  const recentPosts = user.socialProviders.flatMap(provider => 
    provider.posts.map(post => ({
      id: post.id,
      content: post.content.substring(0, 80) + (post.content.length > 80 ? '...' : ''),
      platform: provider.provider,
      status: post.status,
      postedAt: post.postedAt
    }))
  ).sort((a, b) => new Date(b.postedAt || 0).getTime() - new Date(a.postedAt || 0).getTime()).slice(0, 3)

  const dashboardData = {
    user: {
      name: user.fullName,
      email: user.email,
      plan: user.subscription_plan,
      avatarUrl: user.avatarUrl
    },
    stats: {
      connectedPlatforms: connectedPlatforms.length,
      totalPosts,
      postsThisMonth,
      totalAiUses,
      aiUsesThisMonth
    },
    connectedPlatforms,
    recentPosts,
    recentAiUses: user.aiUsages.slice(0, 3),
    remainingAIGenerations: await getRemainingAIGenerations(user.id),
    remainingPosts: await getRemainingPosts(user.id),
    canPublishPost: await canPublishPost(user.id),
    canCreateAIContent: await canCreateAIContent(user.id),
  }




  return <DashboardHomepage data={dashboardData} />
}

export default Page
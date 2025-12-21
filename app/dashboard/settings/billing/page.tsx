import BillingPage from '@/components/Dashboard/Settings/Billings'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { 
  getPlanLimits, 
  getUsageProgress,
  getRemainingAIGenerations,
  getRemainingPosts,
  getPlatformConnectionInfo
} from '../../pricingUtils'

const page = async () => {
  const session = await currentLoggedInUserInfo()
  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.email || '',
    },
    select: {
      id: true,
      subscription_plan: true,
      fullName: true,
      email: true,
      createdAt: true,
      socialProviders: {
        select: {
          isConnected: true
        }
      }
    }
  })

  if (!user) {
    return null
  }

  const connectedAccountsCount = user.socialProviders.filter(sp => sp.isConnected).length

  const [aiProgress, postsProgress, remainingAI, remainingPosts, platformInfo] = await Promise.all([
    getUsageProgress(user.id, 'ai'),
    getUsageProgress(user.id, 'posts'),
    getRemainingAIGenerations(user.id),
    getRemainingPosts(user.id),
    getPlatformConnectionInfo(user.id)
  ])

  const planLimits = getPlanLimits(user.subscription_plan)

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  })

  let nextBillingDate = null
  if (user.subscription_plan && user.subscription_plan !== 'FREE') {
    if (invoices.length > 0) {
      const lastInvoice = invoices[0]
      nextBillingDate = new Date(lastInvoice.createdAt)
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
    } else {
      nextBillingDate = new Date()
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
    }
  }

  const getPlanPrice = (plan: string | null) => {
    switch (plan) {
      case 'FREE': return 0
      case 'CREATOR': return 499
      case 'PREMIUM': return 1199 
      default: return 0
    }
  }

  const billingData = {
    user: {
      id: user.id,
      name: user.fullName || user.email?.split('@')[0] || 'User',
      email: user.email,
      createdAt: user.createdAt,
      currentPlan: user.subscription_plan || 'FREE',
      connectedAccountsCount,
      memberSince: new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    },
    usage: {
      ai: {
        used: aiProgress.used,
        total: aiProgress.total,
        remaining: remainingAI,
        percentage: aiProgress.percentage,
        hasReachedLimit: aiProgress.used >= aiProgress.total
      },
      posts: {
        used: postsProgress.used,
        total: postsProgress.total,
        remaining: remainingPosts,
        percentage: postsProgress.percentage,
        hasReachedLimit: postsProgress.used >= postsProgress.total
      },
      platforms: {
        used: platformInfo.connectedCount,
        total: platformInfo.maxAllowed,
        remaining: platformInfo.remaining,
        percentage: platformInfo.maxAllowed > 0 ? 
          Math.round((platformInfo.connectedCount / platformInfo.maxAllowed) * 100) : 0,
        hasReachedLimit: platformInfo.hasReachedLimit
      }
    },
    planLimits: {
      ...planLimits,
      price: getPlanPrice(user.subscription_plan),
      priceDisplay: user.subscription_plan === 'FREE' ? 'Free' : 
        user.subscription_plan === 'CREATOR' ? '₹499/month' : '₹1199/month'
    },
    invoices: invoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.issueDate || invoice.createdAt,
      amount: invoice.totalAmount || invoice.subTotal || 0,
      status: invoice.invoiceStatus || 'pending',
      description: invoice.itemDescription || `Invoice for ${invoice.plan} plan`,
      plan: invoice.plan,
      paymentStatus: invoice.paymentStatus
    })),
    nextBillingDate,
    subscription: user.subscription_plan && user.subscription_plan !== 'FREE' ? {
      plan: user.subscription_plan,
      status: 'active',
      billingCycle: 'monthly',
      price: getPlanPrice(user.subscription_plan)
    } : null
  }

  return <BillingPage billingData={billingData} />
}

export default page
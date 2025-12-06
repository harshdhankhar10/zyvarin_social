import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

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
        }
      }
    }
  })

  if (!user) {
    return null
  }

  const billingData = {
    currentPlan: user.subscription_plan || 'FREE',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    invoices: [
      { id: 'INV-001', date: new Date('2024-01-15'), amount: 499, status: 'Paid' },
      { id: 'INV-002', date: new Date('2024-02-15'), amount: 499, status: 'Paid' },
      { id: 'INV-003', date: new Date('2024-03-15'), amount: 499, status: 'Pending' }
    ],
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25'
    }
  }

  const preferences = {
    defaultTone: 'Professional',
    defaultPlatforms: ['linkedin', 'twitter'],
    publishDefault: 'now',
    emailNotifications: true,
    timezone: 'Asia/Kolkata',
    locale: 'en-IN'
  }

  const settingsData = {
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      timezone: user.timezone,
      createdAt: user.createdAt
    },
    preferences,
    connectedAccounts: user.socialProviders.map(provider => ({
      id: provider.id,
      provider: provider.provider,
      providerUserId: provider.providerUserId,
      connectedAt: provider.connectedAt,
      lastUsedAt: provider.lastUsedAt,
      profileData: provider.profileData
    })),
    billing: billingData
  }

 redirect('/dashboard/settings/profile')
}

export default Page
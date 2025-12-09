import { NextRequest, NextResponse } from 'next/server'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await currentLoggedInUserInfo()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id }
    })

    if (!user || user.subscription_plan === 'FREE') {
      return NextResponse.json({ error: 'No active subscription to cancel' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: session.id },
      data: {
        subscription_plan: 'FREE',
        subscription_status: 'CANCELED',
        next_billing_date: null
      }
    })

    await prisma.notification.create({
      data: {
        userId: session.id,
        title: 'Subscription Canceled',
        message: `Your ${user.subscription_plan} plan has been canceled. You will be moved to the FREE plan.`,
        senderType: 'SYSTEM'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription canceled successfully' 
    })
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 })
  }
}

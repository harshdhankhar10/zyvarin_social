import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const admin = await currentLoggedInUserInfo()

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { plan } = await request.json()

    if (!plan || !['FREE', 'CREATOR', 'PREMIUM'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: { subscription_plan: plan as any }
    })

    await prisma.notification.create({
      data: {
        userId: resolvedParams.id,
        title: 'Plan Updated',
        message: `Your subscription plan has been updated to ${plan}.`,
        senderType: 'ADMIN'
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}

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

    const { status } = await request.json()

    if (!status || !['ACTIVE', 'INACTIVE', 'SUSPENDED', 'DEACTIVATED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: { status }
    })

    await prisma.notification.create({
      data: {
        userId: resolvedParams.id,
        title: 'Account Status Updated',
        message: `Your account status has been changed to ${status} by an administrator.`,
        senderType: 'ADMIN'
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}

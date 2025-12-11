import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { SenderType } from '@prisma/client'

type TargetType = 'single' | 'all-users' | 'all-admins'

interface Payload {
  targetType: TargetType
  email?: string
  title: string
  message: string
}

export async function POST(req: Request) {
  try {
    const admin = await currentLoggedInUserInfo()
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await req.json()) as Payload
    const { targetType, email, title, message } = body

    if (!title?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Title and message are required' }, { status: 400 })
    }

    if (!targetType || !['single', 'all-users', 'all-admins'].includes(targetType)) {
      return NextResponse.json({ error: 'Invalid targetType' }, { status: 400 })
    }

    let recipients: { id: string }[] = []

    if (targetType === 'single') {
      if (!email?.trim()) {
        return NextResponse.json({ error: 'Email is required for single user' }, { status: 400 })
      }
      const user = await prisma.user.findUnique({
        where: { email: email.trim() },
        select: { id: true }
      })
      if (!user) {
        return NextResponse.json({ error: 'User not found for the provided email' }, { status: 404 })
      }
      recipients = [user]
    }

    if (targetType === 'all-users') {
      recipients = await prisma.user.findMany({ select: { id: true } })
    }

    if (targetType === 'all-admins') {
      recipients = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true }
      })
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients found' }, { status: 400 })
    }

    if (recipients.length === 1) {
      await prisma.notification.create({
        data: {
          userId: recipients[0].id,
          title: title.trim(),
          message: message.trim(),
          senderType: SenderType.ADMIN,
        }
      })
    } else {
      await prisma.notification.createMany({
        data: recipients.map((r) => ({
          userId: r.id,
          title: title.trim(),
          message: message.trim(),
          senderType: SenderType.ADMIN,
          isRead: false
        }))
      })
    }

    return NextResponse.json({ success: true, count: recipients.length })
  } catch (error) {
    console.error('Error sending notifications:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}

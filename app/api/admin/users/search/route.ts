import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'

export async function GET(req: Request) {
  try {
    const admin = await currentLoggedInUserInfo()
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')?.trim()

    if (!email || email.length < 3) {
      return NextResponse.json({ error: 'Email search must be at least 3 characters' }, { status: 400 })
    }

    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: email,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true
      },
      take: 10
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json({ error: 'Failed to search users' }, { status: 500 })
  }
}

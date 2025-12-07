import { NextRequest, NextResponse } from 'next/server'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'

export async function PUT(req: NextRequest) {
  try {
    const session = await currentLoggedInUserInfo()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { fullName, timezone } = body

    if (!fullName || !timezone) {
      return NextResponse.json(
        { error: 'Full name and timezone are required' },
        { status: 400 }
      )
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        email: session.email,
      },
      data: {
        fullName,
        timezone,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        timezone: true,
        avatarUrl: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

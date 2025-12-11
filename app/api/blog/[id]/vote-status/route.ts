import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentLoggedInUserInfo()
    if (!user) {
      return NextResponse.json({
        hasUpvoted: false,
        hasDownvoted: false
      })
    }

    const resolvedParams = await params

    const [upvote, downvote] = await Promise.all([
      prisma.blogUpvote.findFirst({
        where: {
          blogId: resolvedParams.id,
          userId: user.id
        }
      }),
      prisma.blogDownvote.findFirst({
        where: {
          blogId: resolvedParams.id,
          userId: user.id
        }
      })
    ])

    return NextResponse.json({
      hasUpvoted: !!upvote,
      hasDownvoted: !!downvote
    })
  } catch (error) {
    console.error('Error fetching vote status:', error)
    return NextResponse.json({ error: 'Failed to fetch vote status' }, { status: 500 })
  }
}

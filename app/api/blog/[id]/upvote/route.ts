import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentLoggedInUserInfo()
    if (!user) {
      return NextResponse.json({ error: 'Please login to vote' }, { status: 401 })
    }

    const resolvedParams = await params

    const existingUpvote = await prisma.blogUpvote.findFirst({
      where: {
        blogId: resolvedParams.id,
        userId: user.id
      }
    })

    if (existingUpvote) {
      await prisma.blogUpvote.delete({
        where: { id: existingUpvote.id }
      })
      const updatedBlog = await prisma.blog.update({
        where: { id: resolvedParams.id },
        data: { upvotes: { decrement: 1 } }
      })
      return NextResponse.json({ 
        message: 'Upvote removed',
        upvotes: updatedBlog.upvotes,
        downvotes: updatedBlog.downvotes
      })
    }

    const existingDownvote = await prisma.blogDownvote.findFirst({
      where: {
        blogId: resolvedParams.id,
        userId: user.id
      }
    })

    if (existingDownvote) {
      await prisma.blogDownvote.delete({
        where: { id: existingDownvote.id }
      })
      await prisma.blog.update({
        where: { id: resolvedParams.id },
        data: { downvotes: { decrement: 1 } }
      })
    }

    await prisma.blogUpvote.create({
      data: {
        blogId: resolvedParams.id,
        userId: user.id
      }
    })

    const updatedBlog = await prisma.blog.update({
      where: { id: resolvedParams.id },
      data: { upvotes: { increment: 1 } }
    })

    return NextResponse.json({ 
      message: 'Upvoted', 
      upvotes: updatedBlog.upvotes,
      downvotes: updatedBlog.downvotes 
    })
  } catch (error) {
    console.error('Error upvoting:', error)
    return NextResponse.json({ error: 'Failed to upvote' }, { status: 500 })
  }
}

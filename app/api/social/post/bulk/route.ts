import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo";

export async function DELETE(req: NextRequest) {
  try {
    const session = await currentLoggedInUserInfo();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postIds } = await req.json();

    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return NextResponse.json({ error: "Post IDs array is required" }, { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: {
        id: { in: postIds }
      },
      include: {
        socialProvider: {
          include: {
            user: true
          }
        }
      }
    });

    const unauthorizedPosts = posts.filter(post => post.socialProvider.user.id !== session.id);
    if (unauthorizedPosts.length > 0) {
      return NextResponse.json({ error: "Unauthorized to delete some posts" }, { status: 403 });
    }

    const alreadyPosted = posts.filter(post => post.status === "POSTED");
    if (alreadyPosted.length > 0) {
      return NextResponse.json({ 
        error: "Cannot delete already published posts",
        publishedPostIds: alreadyPosted.map(p => p.id)
      }, { status: 400 });
    }

    const deletedPosts = await prisma.post.deleteMany({
      where: {
        id: { in: postIds },
        socialProvider: {
          userId: session.id
        },
        status: { not: "POSTED" }
      }
    });

    return NextResponse.json({
      message: "Posts deleted successfully",
      deletedCount: deletedPosts.count
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting posts:", error);
    return NextResponse.json({ error: "Failed to delete posts" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await currentLoggedInUserInfo();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postIds, scheduledFor } = await req.json();

    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return NextResponse.json({ error: "Post IDs array is required" }, { status: 400 });
    }

    if (!scheduledFor) {
      return NextResponse.json({ error: "Scheduled time is required" }, { status: 400 });
    }

    const newScheduledTime = new Date(scheduledFor);
    if (newScheduledTime <= new Date()) {
      return NextResponse.json({ error: "Scheduled time must be in the future" }, { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: {
        id: { in: postIds }
      },
      include: {
        socialProvider: {
          include: {
            user: true
          }
        }
      }
    });

    const unauthorizedPosts = posts.filter(post => post.socialProvider.user.id !== session.id);
    if (unauthorizedPosts.length > 0) {
      return NextResponse.json({ error: "Unauthorized to reschedule some posts" }, { status: 403 });
    }

    const alreadyPosted = posts.filter(post => post.status === "POSTED");
    if (alreadyPosted.length > 0) {
      return NextResponse.json({ 
        error: "Cannot reschedule already published posts",
        publishedPostIds: alreadyPosted.map(p => p.id)
      }, { status: 400 });
    }

    const updatedPosts = await prisma.post.updateMany({
      where: {
        id: { in: postIds },
        socialProvider: {
          userId: session.id
        },
        status: "SCHEDULED"
      },
      data: {
        scheduledFor: newScheduledTime,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: "Posts rescheduled successfully",
      updatedCount: updatedPosts.count
    }, { status: 200 });

  } catch (error) {
    console.error("Error rescheduling posts:", error);
    return NextResponse.json({ error: "Failed to reschedule posts" }, { status: 500 });
  }
}

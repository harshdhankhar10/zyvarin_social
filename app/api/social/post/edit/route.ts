import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo";

export async function PUT(req: NextRequest) {
  try {
    const session = await currentLoggedInUserInfo();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, content, mediaUrls, scheduledFor } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        socialProvider: {
          include: {
            user: true
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.socialProvider.user.id !== session.id) {
      return NextResponse.json({ error: "Unauthorized to edit this post" }, { status: 403 });
    }

    if (post.status === "POSTED") {
      return NextResponse.json({ error: "Cannot edit already published posts" }, { status: 400 });
    }

    if (post.status === "FAILED") {
      return NextResponse.json({ error: "Cannot edit failed posts" }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        content,
        mediaUrls: mediaUrls || post.mediaUrls,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : post.scheduledFor,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: "Post updated successfully",
      post: updatedPost
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

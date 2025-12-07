import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo';

export async function POST(req: NextRequest) {
  try {
    const user = await currentLoggedInUserInfo();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const result = await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Marked ${result.count} notification(s) as read`,
      count: result.count,
    });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark notifications as read' },
      { status: 500 }
    );
  }
}

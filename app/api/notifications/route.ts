import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo';

export async function GET(req: NextRequest) {
  try {
    const user = await currentLoggedInUserInfo();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, 
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return NextResponse.json({
      notifications,
      unreadCount,
      total: notifications.length,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

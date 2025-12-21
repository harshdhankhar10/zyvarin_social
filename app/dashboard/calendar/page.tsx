import React from 'react';
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo';
import prisma from '@/lib/prisma';
import CalendarContent from '@/components/Dashboard/CalendarContent';

const CalendarPage = async () => {
  const session = await currentLoggedInUserInfo();
  
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
    select: {
      id: true,
    }
  });

  if (!user) {
    return null;
  }

  const scheduledPosts = await prisma.post.findMany({
    where: {
      socialProvider: {
        userId: user.id,
      },
      status: 'SCHEDULED',
      scheduledFor: {
        gte: new Date(),
      }
    },
    include: {
      socialProvider: {
        select: {
          provider: true,
        }
      }
    },
    orderBy: {
      scheduledFor: 'asc',
    }
  });

  const formattedPosts = scheduledPosts.map(post => ({
    id: post.id,
    content: post.content,
    scheduledFor: post.scheduledFor?.toISOString() || new Date().toISOString(),
    status: post.status,
    platform: post.socialProvider.provider,
    mediaUrls: post.mediaUrls,
  }));

  return <CalendarContent posts={formattedPosts} />;
};

export default CalendarPage;
 
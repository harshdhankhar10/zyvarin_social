import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export async function getCurrentMonthUsage(userId: string) {
  const currentMonthStart = startOfMonth(new Date());
  
  const usage = await prisma.aI_Usage.findMany({
    where: {
      userId,
      createdAt: {
        gte: currentMonthStart,
      }
    }
  });
  
  return usage.length;
}

export async function currentUserPlan(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscription_plan: true }
  });
  return user?.subscription_plan || null;
}

export async function getCurrentMonthPosts(userId: string) {
  const currentMonthStart = startOfMonth(new Date());
  
  const posts = await prisma.post.findMany({
    where: {
      socialProvider: {
        userId: userId
      },
      postedAt: {
        gte: currentMonthStart,
      },
      status: "POSTED"
    }
  });
  
  return posts.length;
}

export async function getRemainingAIGenerations(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscription_plan: true }
  });
  
  if (!user) return 0;
  
  const planLimits = getPlanLimits(user.subscription_plan);
  const used = await getCurrentMonthUsage(userId);
  
  return Math.max(0, planLimits.aiGenerations - used);
}

export async function getRemainingPosts(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscription_plan: true }
  });
  
  if (!user) return 0;
  
  const planLimits = getPlanLimits(user.subscription_plan);
  const used = await getCurrentMonthPosts(userId);
  
  return Math.max(0, planLimits.posts - used);
}

export async function canCreateAIContent(userId: string): Promise<boolean> {
  const remaining = await getRemainingAIGenerations(userId);
  return remaining > 0;
}

export async function canPublishPost(userId: string): Promise<boolean> {
  const remaining = await getRemainingPosts(userId);
  return remaining > 0;
}

// Enhanced function to return detailed platform connection info
export async function getPlatformConnectionInfo(userId: string): Promise<{
  canConnectMore: boolean;
  connectedCount: number;
  maxAllowed: number;
  remaining: number;
  hasReachedLimit: boolean;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      subscription_plan: true, 
      socialProviders: true 
    }
  });
  
  if (!user) {
    return {
      canConnectMore: false,
      connectedCount: 0,
      maxAllowed: 0,
      remaining: 0,
      hasReachedLimit: true
    };
  }
  
  const planLimits = getPlanLimits(user.subscription_plan);
  const connectedCount = user.socialProviders.filter(sp => sp.isConnected).length;
  const remaining = Math.max(0, planLimits.platforms - connectedCount);
  
  return {
    canConnectMore: connectedCount < planLimits.platforms,
    connectedCount,
    maxAllowed: planLimits.platforms,
    remaining,
    hasReachedLimit: connectedCount >= planLimits.platforms
  };
}

// Keep backward compatibility
export async function canConnectMorePlatforms(userId: string): Promise<boolean> {
  const info = await getPlatformConnectionInfo(userId);
  return info.canConnectMore;
}

export function getPlanLimits(plan: string | null | undefined) {
  switch (plan) {
    case "FREE":
      return {
        aiGenerations: 15,
        posts: 5,
        platforms: 2,
        scheduling: false,
        analytics: false
      };
    case "CREATOR":
      return {
        aiGenerations: 40,
        posts: 20,
        platforms: 4,
        scheduling: true,
        analytics: true
      };
    case "PREMIUM":
      return {
        aiGenerations: 120,
        posts: 40,
        platforms: 6,
        scheduling: true,
        analytics: true,
        teamMembers: 3
      };
    default:
      return {
        aiGenerations: 10,
        posts: 5,
        platforms: 2,
        scheduling: false,
        analytics: false
      };
  }
}

export async function getUsageProgress(userId: string, type: 'ai' | 'posts' | 'platforms') {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscription_plan: true, socialProviders: true }
  });
  
  if (!user) return { used: 0, total: 0, percentage: 0 };
  
  const planLimits = getPlanLimits(user.subscription_plan);
  
  let used = 0;
  let total = 0;
  
  if (type === 'ai') {
    used = await getCurrentMonthUsage(userId);
    total = planLimits.aiGenerations;
  } else if (type === 'posts') {
    used = await getCurrentMonthPosts(userId);
    total = planLimits.posts;
  } else if (type === 'platforms') {
    used = user.socialProviders.filter(sp => sp.isConnected).length;
    total = planLimits.platforms;
  }
  
  const percentage = total > 0 ? Math.round((used / total) * 100) : 0;
  
  return { used, total, percentage };
}

export async function getUsageWarningLevel(userId: string, type: 'ai' | 'posts' | 'platforms'): Promise<'safe' | 'warning' | 'danger'> {
  const progress = await getUsageProgress(userId, type);
  
  if (progress.percentage >= 90) return 'danger';
  if (progress.percentage >= 70) return 'warning';
  return 'safe';
}

export async function hasReachedLimit(userId: string, type: 'ai' | 'posts' | 'platforms'): Promise<boolean> {
  const progress = await getUsageProgress(userId, type);
  return progress.used >= progress.total;
}

export async function formatUsageDisplay(userId: string, type: 'ai' | 'posts' | 'platforms'): Promise<string> {
  const progress = await getUsageProgress(userId, type);
  return `${progress.used}/${progress.total} ${type === 'ai' ? 'AI generations' : type === 'posts' ? 'posts' : 'platforms'}`;
}
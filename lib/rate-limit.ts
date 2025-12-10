import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "./redisDB"
import { NextRequest, NextResponse } from "next/server"

export const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

export const rateLimiters = {
  register: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "ratelimit:register",
  }),
  
  forgotPassword: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "ratelimit:forgot-password",
  }),
  
  verifyEmail: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    analytics: true,
    prefix: "ratelimit:verify-email",
  }),
  
  changePassword: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix: "ratelimit:change-password",
  }),
  
  aiGeneration: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "ratelimit:ai-generation",
  }),
  
  socialPost: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 h"),
    analytics: true,
    prefix: "ratelimit:social-post",
  }),
  
  uploadImage: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 h"),
    analytics: true,
    prefix: "ratelimit:upload",
  }),
  
  billingCreate: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "5 m"),
    analytics: true,
    prefix: "ratelimit:billing-create",
  }),
  
  billingVerify: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "ratelimit:billing-verify",
  }),
  
  oauthCallback: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "ratelimit:oauth-callback",
  }),
}

export function getIdentifier(req: NextRequest, type: 'ip' | 'email' | 'user', value?: string): string {
  if (type === 'email' || type === 'user') {
    return value || 'anonymous';
  }
  
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get("x-real-ip") || "127.0.0.1";
  return ip;
}

export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  return { success, limit, remaining, reset };
}

export function rateLimitResponse(limit: number, remaining: number, reset: number) {
  return NextResponse.json(
    {
      error: `Too many requests. Please try again after ${formatTime(reset - Date.now())}.`,
      limit,
      remaining,
      resetAt: new Date(reset).toISOString(),
    },
    { 
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      }
    }
  );
}
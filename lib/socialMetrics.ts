import prisma from '@/lib/prisma'

export type MetricSnapshot = {
  impressions: number
  clicks: number
  likes: number
  comments: number
  shares: number
  ctr?: number | null
  videoViews?: number | null
  followsGained?: number | null
}

const DAY_IN_MS = 24 * 60 * 60 * 1000

async function upsertMetric(postId: string, platform: string, snapshot: MetricSnapshot) {
  await prisma.socialMetric.upsert({
    where: { postId },
    update: {
      platform,
      impressions: snapshot.impressions,
      clicks: snapshot.clicks,
      likes: snapshot.likes,
      comments: snapshot.comments,
      shares: snapshot.shares,
      ctr: snapshot.ctr ?? null,
      videoViews: snapshot.videoViews ?? null,
      followsGained: snapshot.followsGained ?? null,
      collectedAt: new Date()
    },
    create: {
      postId,
      platform,
      impressions: snapshot.impressions,
      clicks: snapshot.clicks,
      likes: snapshot.likes,
      comments: snapshot.comments,
      shares: snapshot.shares,
      ctr: snapshot.ctr ?? null,
      videoViews: snapshot.videoViews ?? null,
      followsGained: snapshot.followsGained ?? null
    }
  })
}

async function fetchLinkedinMetrics(platformPostId: string, accessToken: string): Promise<MetricSnapshot | null> {
  try {
    const response = await fetch(`https://api.linkedin.com/rest/socialActions/${encodeURIComponent(platformPostId)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202401'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LinkedIn metrics fetch failed:', errorText)
      return null
    }

    const data = await response.json()

    const impressions = data?.viewStatistics?.views?.value ?? 0
    const likes = data?.likesSummary?.totalLikes ?? 0
    const comments = data?.commentsSummary?.totalFirstLevelComments ?? 0
    const shares = data?.shareStatistics?.shareCount ?? 0
    const clicks = data?.clicks ?? 0

    return {
      impressions,
      clicks,
      likes,
      comments,
      shares,
      ctr: null,
      videoViews: null,
      followsGained: null
    }
  } catch (error) {
    console.error('LinkedIn metrics error:', error)
    return null
  }
}

async function refreshTwitterToken(providerId: string, refreshToken?: string | null) {
  if (!refreshToken) return null

  try {
    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.X_CLIENT_ID || ''
      })
    })

    if (!response.ok) {
      console.error('Failed to refresh Twitter token', await response.text())
      return null
    }

    const data = await response.json()

    const updatedProvider = await prisma.socialProvider.update({
      where: { id: providerId },
      data: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + (data.expires_in || 0)
      }
    })

    return updatedProvider
  } catch (error) {
    console.error('Twitter token refresh error:', error)
    return null
  }
}

async function fetchTwitterMetrics(platformPostId: string, provider: { id: string; access_token: string | null; refresh_token?: string | null; expires_at?: number | null; isConnected?: boolean | null; }) {
  try {
    const now = Math.floor(Date.now() / 1000)
    let token = provider.access_token

    if (provider.expires_at && provider.expires_at < now) {
      const refreshed = await refreshTwitterToken(provider.id, provider.refresh_token)
      token = refreshed?.access_token || null
    }

    if (!token) return null

    const response = await fetch(`https://api.twitter.com/2/tweets?ids=${platformPostId}&tweet.fields=public_metrics,organic_metrics,non_public_metrics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Twitter metrics fetch failed:', errorText)
      return null
    }

    const payload = await response.json()
    const tweet = payload?.data?.[0]
    if (!tweet) return null

    const publicMetrics = tweet.public_metrics || {}
    const organicMetrics = tweet.organic_metrics || {}
    const nonPublicMetrics = tweet.non_public_metrics || {}

    const impressions = nonPublicMetrics.impression_count ?? organicMetrics.impression_count ?? 0
    const clicks = organicMetrics.user_profile_clicks ?? nonPublicMetrics.user_profile_clicks ?? 0
    const likes = publicMetrics.like_count ?? 0
    const comments = publicMetrics.reply_count ?? 0
    const shares = (publicMetrics.retweet_count ?? 0) + (publicMetrics.quote_count ?? 0)
    const videoViews = nonPublicMetrics.video_playback_0_count ?? organicMetrics.video_playback_0_count ?? null

    return {
      impressions,
      clicks,
      likes,
      comments,
      shares,
      ctr: null,
      videoViews,
      followsGained: null
    }
  } catch (error) {
    console.error('Twitter metrics error:', error)
    return null
  }
}

async function fetchDevtoMetrics(platformPostId: string, accessToken: string) {
  try {
    const response = await fetch(`https://dev.to/api/articles/${platformPostId}`, {
      headers: {
        'api-key': accessToken
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Dev.to metrics fetch failed:', errorText)
      return null
    }

    const article = await response.json()

    return {
      impressions: article?.page_views_count ?? 0,
      clicks: article?.page_views_count ?? 0,
      likes: article?.public_reactions_count ?? 0,
      comments: article?.comments_count ?? 0,
      shares: 0,
      ctr: null,
      videoViews: null,
      followsGained: null
    }
  } catch (error) {
    console.error('Dev.to metrics error:', error)
    return null
  }
}

async function fetchMetricsForPlatform(provider: string, platformPostId: string, socialProvider: any): Promise<MetricSnapshot | null> {
  if (!platformPostId) return null

  switch (provider) {
    case 'linkedin':
      return socialProvider?.access_token ? fetchLinkedinMetrics(platformPostId, socialProvider.access_token) : null
    case 'twitter':
      return fetchTwitterMetrics(platformPostId, socialProvider)
    case 'devto':
      return socialProvider?.access_token ? fetchDevtoMetrics(platformPostId, socialProvider.access_token) : null
    default:
      return null
  }
}

export async function fetchAndStoreMetricsForUser(userId: string, windowInDays = 60) {
  const since = new Date(Date.now() - windowInDays * DAY_IN_MS)

  const posts = await prisma.post.findMany({
    where: {
      status: 'POSTED',
      postedAt: { gte: since },
      platformPostId: { not: null },
      socialProvider: {
        userId,
        isConnected: true
      }
    },
    include: {
      socialProvider: true
    }
  })

  let updated = 0
  let skipped = 0
  const errors: string[] = []

  for (const post of posts) {
    const provider = post.socialProvider

    if (!provider?.access_token) {
      skipped++
      continue
    }

    const snapshot = await fetchMetricsForPlatform(provider.provider, post.platformPostId as string, provider)

    if (!snapshot) {
      skipped++
      continue
    }

    try {
      await upsertMetric(post.id, provider.provider, snapshot)
      updated++
    } catch (error) {
      console.error(`Failed to upsert metrics for post ${post.id}:`, error)
      errors.push(post.id)
    }
  }

  return {
    postsProcessed: posts.length,
    updated,
    skipped,
    errors
  }
}

export async function getAggregatedMetricsForUser(userId: string) {
  const metrics = await prisma.socialMetric.findMany({
    where: {
      post: {
        socialProvider: {
          userId
        }
      }
    },
    include: {
      post: {
        select: {
          socialProvider: {
            select: { provider: true }
          }
        }
      }
    }
  })

  const grouped: Record<string, {
    provider: string
    impressions: number
    clicks: number
    likes: number
    comments: number
    shares: number
    videoViews: number
    followsGained: number
    postsTracked: number
    lastCollectedAt: Date | null
  }> = {}

  for (const entry of metrics) {
    const provider = entry.post.socialProvider.provider
    if (!grouped[provider]) {
      grouped[provider] = {
        provider,
        impressions: 0,
        clicks: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        videoViews: 0,
        followsGained: 0,
        postsTracked: 0,
        lastCollectedAt: null
      }
    }

    grouped[provider].impressions += entry.impressions
    grouped[provider].clicks += entry.clicks
    grouped[provider].likes += entry.likes
    grouped[provider].comments += entry.comments
    grouped[provider].shares += entry.shares
    grouped[provider].videoViews += entry.videoViews ?? 0
    grouped[provider].followsGained += entry.followsGained ?? 0
    grouped[provider].postsTracked += 1

    if (!grouped[provider].lastCollectedAt || grouped[provider].lastCollectedAt.getTime() < entry.collectedAt.getTime()) {
      grouped[provider].lastCollectedAt = entry.collectedAt
    }
  }

  return Object.values(grouped)
}

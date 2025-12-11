import { NextResponse, NextRequest } from 'next/server'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { fetchAndStoreMetricsForUser, getAggregatedMetricsForUser } from '@/lib/socialMetrics'

export async function GET() {
  const session = await currentLoggedInUserInfo()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const accounts = await getAggregatedMetricsForUser(session.id)
  return NextResponse.json({ accounts }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const session = await currentLoggedInUserInfo()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let windowInDays = 60
  try {
    const body = await req.json()
    if (body?.windowInDays && Number.isFinite(body.windowInDays)) {
      windowInDays = Math.max(1, Math.min(180, Math.floor(body.windowInDays)))
    }
  } catch {
    windowInDays = 60
  }

  const summary = await fetchAndStoreMetricsForUser(session.id, windowInDays)
  const accounts = await getAggregatedMetricsForUser(session.id)

  return NextResponse.json({ success: true, summary, accounts }, { status: 200 })
}

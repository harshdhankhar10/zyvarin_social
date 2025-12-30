"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/formatDate"
import {
  Sparkles,
  PenSquare,
  PlugZap,
  Clock4,
  BarChart3,
  Flame,
  Send,
  ArrowRight,
  Link2,
  CheckCircle2,
  CalendarRange,
  ListChecks
} from "lucide-react"

type DashboardData = {
  user: {
    name: string | null
    email: string
    plan: string | null
    avatarUrl?: string | null
  }
  stats: {
    connectedPlatforms: number
    totalPosts: number
    postsThisMonth: number
    totalAiUses: number
    aiUsesThisMonth: number
  }
  connectedPlatforms: string[]
  recentPosts: {
    id: string
    content: string
    platform: string
    status: string
    postedAt: string | null
  }[]
  recentAiUses: { createdAt?: string | null }[]
  remainingAIGenerations: number
  remainingPosts: number
  canPublishPost: boolean
  canCreateAIContent: boolean
}

const tone = {
  linkedin: "text-sky-700 bg-sky-50 border-sky-100",
  twitter: "text-slate-900 bg-slate-50 border-slate-200",
  pinterest: "text-rose-700 bg-rose-50 border-rose-100",
  default: "text-emerald-800 bg-emerald-50 border-emerald-100"
} as const

function platformStyle(platform: string) {
  const key = platform.toLowerCase() as keyof typeof tone
  return tone[key] || tone.default
}

function AvatarBadge({ name, avatarUrl }: { name: string | null; avatarUrl?: string | null }) {
  if (avatarUrl) {
    return (
      <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
        <Image src={avatarUrl} alt={name || "User"} width={48} height={48} className="h-full w-full object-cover" />
      </div>
    )
  }
  const initials = name ? name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "U"
  return (
    <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold ring-2 ring-white shadow-sm">
      {initials}
    </div>
  )
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-3xl font-semibold text-slate-900">{value}</span>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
    </div>
  )
}

function UsageBar({ label, used, total }: { label: string; used: number; total: number }) {
  const safeTotal = total <= 0 ? 1 : total
  const pct = Math.min(100, Math.max(0, Math.round((used / safeTotal) * 100)))
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Badge({ label }: { label: string }) {
  const style = platformStyle(label)
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${style}`}>{label}</span>
}

function StatusPill({ status }: { status: string }) {
  const normalized = status.toLowerCase()
  if (normalized === "posted") return <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Live</span>
  if (normalized === "scheduled") return <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">Scheduled</span>
  return <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">Draft</span>
}

export default function DashboardOverview({ data }: { data: DashboardData }) {
  const firstName = data.user.name ? data.user.name.split(" ")[0] : "there"

  const postUsed = Math.max(0, data.stats.postsThisMonth)
  const postTotal = Math.max(1, data.stats.postsThisMonth + data.remainingPosts)
  const aiUsed = Math.max(0, data.stats.aiUsesThisMonth)
  const aiTotal = Math.max(1, data.stats.aiUsesThisMonth + data.remainingAIGenerations)

  const quickActions = [
    { label: "Compose", href: "/dashboard/compose", icon: PenSquare },
    { label: "Schedule", href: "/dashboard/calendar", icon: CalendarRange },
    { label: "Connect", href: "/dashboard/connect-accounts", icon: PlugZap },
    { label: "Tasks", href: "/dashboard/posts", icon: ListChecks }
  ]

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <AvatarBadge name={data.user.name} avatarUrl={data.user.avatarUrl} />
          <div>
            <p className="text-sm text-slate-500">Dashboard</p>
            <h1 className="text-2xl font-semibold text-slate-900">Welcome back, {firstName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-slate-600">{data.user.email}</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">{data.user.plan || "Free"}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/compose">
            <Button>
              <PenSquare className="h-4 w-4" />
              Compose
            </Button>
          </Link>
          <Link href="/dashboard/connect-accounts">
            <Button variant="outline" className="border-slate-200 text-slate-900 hover:bg-slate-100">
              <PlugZap className="h-4 w-4" />
              Connect
            </Button>
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Connected platforms" value={String(data.stats.connectedPlatforms)} />
        <StatCard label="Posts" value={String(data.stats.totalPosts)} hint={`${data.stats.postsThisMonth} this month`} />
        <StatCard label="AI runs" value={String(data.stats.totalAiUses)} hint={`${data.stats.aiUsesThisMonth} this month`} />
        <StatCard label="Remaining quota" value={`${data.remainingPosts} posts`} hint={`${data.remainingAIGenerations} AI`} />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Sparkles className="h-4 w-4 text-slate-700" />
            Quick actions
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(action => (
            <Link key={action.label} href={action.href} className="group">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3 transition hover:border-accent ">
                <span className="h-10 w-10 rounded-xl text-accent flex items-center justify-center">
                  <action.icon className="h-6 w-6" />
                </span>
                <div className="text-sm font-semibold text-slate-900">{action.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Send className="h-4 w-4 text-slate-700" />
              Latest posts
            </div>
            <Link href="/dashboard/posts" className="text-sm font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentPosts.length === 0 && <div className="text-sm text-slate-500">No posts yet. Start by composing your first one.</div>}
            {data.recentPosts.map(post => (
              <div key={post.id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge label={post.platform} />
                  <div>
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{post.content}</p>
                    <p className="text-xs text-slate-500">{post.postedAt ? formatDate(new Date(post.postedAt)) : "Draft"}</p>
                  </div>
                </div>
                <StatusPill status={post.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Clock4 className="h-4 w-4 text-slate-700" />
            Recent AI activity
          </div>
          <div className="space-y-3">
            {data.recentAiUses.length === 0 && <div className="text-sm text-slate-500">No AI runs yet.</div>}
            {data.recentAiUses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Flame className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">AI generation</p>
                    <p className="text-xs text-slate-500">{item.createdAt ? formatDate(new Date(item.createdAt)) : "Recently"}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">Used</span>
              </div>
            ))}
          </div>
          <div className="pt-1">
            <Link href="/dashboard/compose">
              <Button className="w-full">
                <Sparkles className="h-4 w-4" />
                Create with AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <BarChart3 className="h-4 w-4 text-slate-700" />
            Plan usage
          </div>
          <UsageBar label="Posts" used={postUsed} total={postTotal} />
          <UsageBar label="AI" used={aiUsed} total={aiTotal} />
          <div className="flex gap-2 pt-2">
            <Link href="/dashboard/settings/billing" className="flex-1">
              <Button variant="outline" className="w-full text-slate-900">Manage plan</Button>
            </Link>
            <Link href="/dashboard/settings" className="flex-1">
              <Button className="w-full">Settings</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Link2 className="h-4 w-4 text-slate-700" />
            Connected platforms
          </div>
          {data.connectedPlatforms.length === 0 && <p className="text-sm text-slate-500">Nothing connected yet.</p>}
          <div className="flex flex-wrap gap-2">
            {data.connectedPlatforms.map(p => (
              <span key={p} className={`text-xs font-semibold px-3 py-1 rounded-full border ${platformStyle(p)}`}>
                <CheckCircle2 className="h-3 w-3 inline mr-1" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

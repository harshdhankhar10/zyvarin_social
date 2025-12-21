import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import UserDetailClient from '@/components/Admin/UserDetailClient'

export default async function UserDetailPage({ params }: any) {
  const resolvedParams = await params
  const admin = await currentLoggedInUserInfo()

  if (!admin || admin.role !== 'ADMIN') {
    notFound()
  }

  const user = await prisma.user.findUnique({
    where: { id: resolvedParams.id },
    include: {
      socialProviders: true,
      invoices: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      notifications: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      aiUsages: {
        orderBy: { createdAt: 'desc' },
        take: 20
      }
    }
  })

  if (!user) {
    notFound()
  }

  return <UserDetailClient user={user as any} />
}

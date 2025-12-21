import prisma from '@/lib/prisma'
import AdminUsersClient from '@/components/Admin/AdminUsersClient'

const ITEMS_PER_PAGE = 20

export default async function AdminUsersPage({
  searchParams
}: {
  searchParams: { page?: string; search?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10))
  const search = searchParams.search || ''

  const pageSize = 20
  const skip = (page - 1) * pageSize

  const whereConditions: any = {}

  if (search) {
    whereConditions.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        subscription_plan: true,
        status: true,
        role: true,
        createdAt: true,
        lastLogin: true
      },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.count({ where: whereConditions })
  ])

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <AdminUsersClient
      users={users}
      currentPage={page}
      totalPages={totalPages}
      totalCount={totalCount}
      search={search}
    />
  )
}
import React from 'react'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import TransactionsHistory from '@/components/Dashboard/Settings/TransactionsHistory'


export default async function TransactionsHistoryPage({ searchParams }: any) {
  const session = await currentLoggedInUserInfo()
  
  if (!session) {
    redirect('/signin')
  }

  const params = await searchParams
  
  if (!params.page) {
    redirect('/dashboard/settings/transactions-history?page=1')
  }

  const currentPage = Number(params.page) || 1
  const itemsPerPage = 10
  const skip = (currentPage - 1) * itemsPerPage

  const [transactions, totalCount] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        userId: session.id,
      },
      orderBy: {
        transactionDate: 'desc',
      },
      take: itemsPerPage,
      skip: skip,
    }),
    prisma.transaction.count({
      where: {
        userId: session.id,
      },
    }),
  ])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <TransactionsHistory
      transactions={transactions}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={totalCount}
    />
  )
}
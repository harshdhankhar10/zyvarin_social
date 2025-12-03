import ComposeContent from '@/components/Dashboard/ComposeContent'
import React from 'react'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'

const page = async () => {
  const session = await currentLoggedInUserInfo()
  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.email || '',
    },
  })

  const connectedAccounts = await prisma.socialProvider.findMany({
    where: {
      userId: user?.id,
      isConnected: true,
    },
    select: {
      provider: true,
      profileData: true,
    }
  })

  const linkedinAccount = connectedAccounts.find(acc => acc.provider === 'linkedin')
  const twitterAccount = connectedAccounts.find(acc => acc.provider === 'twitter')

  return (
    <div>
      <ComposeContent 
        connectedAccounts={connectedAccounts}
        hasLinkedin={!!linkedinAccount}
        hasTwitter={!!twitterAccount}
      />
    </div>
  )
}

export default page;
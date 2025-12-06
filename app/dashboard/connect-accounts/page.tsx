import ConnectAccounts from '@/components/Dashboard/ConnectAccounts'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { 
  getRemainingAIGenerations, 
  getPlatformConnectionInfo,
  getUsageProgress 
} from '../pricingUtils'

const Page = async () => {
  const session = await currentLoggedInUserInfo()
  
  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
  })

  if (!user) {
    return null
  }

  const connectedAccounts = await prisma.socialProvider.findMany({
    where: {
      userId: user.id,
      isConnected: true
    },
    select: {
      provider: true,
      profileData: true,
    }
  })

  const linkedinAccount = connectedAccounts.find(acc => acc.provider === 'linkedin')
  const twitterAccount = connectedAccounts.find(acc => acc.provider === 'twitter')

  const connectedPlatforms = connectedAccounts.map(acc => ({
    id: acc.provider,
  }))

  const platformConnectionInfo = await getPlatformConnectionInfo(user.id)
  const aiUsageProgress = await getUsageProgress(user.id, 'ai')
  const platformUsageProgress = await getUsageProgress(user.id, 'platforms')

  const limits = {
    aiGenerations: {
      remaining: await getRemainingAIGenerations(user.id),
      used: aiUsageProgress.used,
      total: aiUsageProgress.total,
      percentage: aiUsageProgress.percentage
    },
    platforms: {
      canConnectMore: platformConnectionInfo.canConnectMore,
      remaining: platformConnectionInfo.remaining,
      connectedCount: platformConnectionInfo.connectedCount,
      maxAllowed: platformConnectionInfo.maxAllowed,
      hasReachedLimit: platformConnectionInfo.hasReachedLimit,
      used: platformUsageProgress.used,
      total: platformUsageProgress.total,
      percentage: platformUsageProgress.percentage
    }
  }

  return (
    <div>
      <ConnectAccounts 
        connectedPlatforms={connectedPlatforms}
        linkedinProfile={linkedinAccount?.profileData}
        twitterProfile={twitterAccount?.profileData}
        limits={limits}
      />
    </div>
  )
}

export default Page
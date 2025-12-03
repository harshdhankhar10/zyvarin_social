import ConnectAccounts from '@/components/Dashboard/ConnectAccounts'
import prisma from '@/lib/prisma'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'

const Page = async () => {
  const session = await currentLoggedInUserInfo()
  if (!session) {
    return null
  }
  const socialProviders = await prisma.socialProvider.findMany({
    where: {
      userId: session.id,
      isConnected: true
    },
    select: {
      provider: true,
      profileData: true,
      connectedAt: true
    }
  })

  const connectedPlatforms = socialProviders.map(p => p.provider)

  return (
    <ConnectAccounts 
      connectedPlatforms={connectedPlatforms}
      linkedinProfile={socialProviders.find(p => p.provider === 'linkedin')?.profileData}
    />
  )
}

export default Page
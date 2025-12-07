import React from 'react'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Twitter, Linkedin, Code2, CheckCircle, XCircle, Settings } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'

export default async function IntegrationsPage() {
  const session = await currentLoggedInUserInfo()
  
  if (!session) {
    redirect('/signin')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
    include: {
      socialProviders: {
        orderBy: {
          connectedAt: 'desc'
        }
      }
    }
  })

  if (!user) {
    redirect('/signin')
  }

  const connectedAccounts = user.socialProviders.filter(sp => sp.isConnected)

  const getPlatformConfig = (provider: string) => {
    const configs: Record<string, {
      name: string
      icon: any
      color: string
      bgColor: string
    }> = {
      twitter: {
        name: 'Twitter',
        icon: Twitter,
        color: 'text-sky-500',
        bgColor: 'bg-sky-50',
      },
      linkedin: {
        name: 'LinkedIn',
        icon: Linkedin,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      },
      dev_to: {
        name: 'Dev.to',
        icon: Code2,
        color: 'text-gray-900',
        bgColor: 'bg-gray-50',
      }
    }
    return configs[provider] || {
      name: provider,
      icon: Code2,
      color: 'text-gray-700',
      bgColor: 'bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Connected Accounts</h2>
            <p className="text-sm text-gray-500">Manage your social media integrations</p>
          </div>
          <Link href="/dashboard/connect-accounts">
            <Button variant={"outline"}>
              <Settings className="w-5 h-5" />
              Manage Accounts
            </Button>
          </Link>
        </div>
        
        {connectedAccounts.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-gray-600">
              {connectedAccounts.length} {connectedAccounts.length === 1 ? 'account' : 'accounts'} connected
            </p>
          </div>
        )}
      </div>

      {connectedAccounts.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {connectedAccounts.map((account) => {
            const platformConfig = getPlatformConfig(account.provider)
            const Icon = platformConfig.icon
            const profileData = account.profileData as any

            return (
              <div key={account.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${platformConfig.bgColor}`}>
                      <Icon className={`w-6 h-6 ${platformConfig.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-gray-900">{platformConfig.name}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Connected
                        </span>
                      </div>
                      
                      {profileData?.name && (
                        <p className="text-sm text-gray-500 mt-2">
                          Account: <span className="font-medium text-gray-700">{profileData.name}</span>
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>Connected on {formatDate(account.connectedAt)}</span>
                        {account.lastUsedAt && (
                          <span>Last used {formatDate(account.lastUsedAt)}</span>
                        )}
                        <span>Used {account.connectionCount} {account.connectionCount === 1 ? 'time' : 'times'}</span>
                      </div>
                    </div>
                  </div>
    
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connected Accounts</h3>
          <p className="text-gray-600 mb-6">
            Connect your social media accounts to start posting
          </p>
          <Link 
            href="/dashboard/connect-accounts"
          >
            <Button variant={"outline"} >
              
            <Settings className="w-5 h-5" />
            Manage Accounts
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
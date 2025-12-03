"use client"

import React, { useState } from 'react'
import { 
  Linkedin, Twitter, Globe, Instagram, Facebook, 
  Github, Search, Plus, CheckCircle2, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const ConnectAccounts = ({ 
  connectedPlatforms: initialConnectedPlatforms,
  linkedinProfile
}: { 
  connectedPlatforms: string[]
  linkedinProfile?: any
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [connectedPlatforms, setConnectedPlatforms] = useState(initialConnectedPlatforms)
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const platforms = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-[#0077b5]',
      bgColor: 'bg-blue-50',
      description: 'Professional networking'
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'text-black',
      bgColor: 'bg-slate-50',
      description: 'Real-time conversations'
    },
    {
      id: 'medium',
      name: 'Medium',
      icon: Globe,
      color: 'text-slate-800',
      bgColor: 'bg-slate-50',
      description: 'Long-form articles'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Visual content'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Community engagement'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: 'text-slate-800',
      bgColor: 'bg-slate-50',
      description: 'Developer community'
    }
  ]

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const connectLinkedIn = async () => {
    setLoadingPlatform('linkedin')
    setError(null)
    
    try {
      window.location.href = '/api/social/linkedin/connect'
    } catch (err) {
      setError('Failed to connect LinkedIn')
      setLoadingPlatform(null)
    }
  }

  const disconnectLinkedIn = async () => {
    setLoadingPlatform('linkedin')
    setError(null)
    
    try {
      const response = await fetch('/api/social/linkedin/disconnect', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setConnectedPlatforms(prev => prev.filter(id => id !== 'linkedin'))
      } else {
        setError('Failed to disconnect LinkedIn')
      }
    } catch (err) {
      setError('Failed to disconnect LinkedIn')
    } finally {
      setLoadingPlatform(null)
    }
  }

  const isConnected = (platformId: string) => connectedPlatforms.includes(platformId)

  return (
    <div className="">
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Social Connections</h1>
          <p className="text-slate-500">Connect your social accounts to publish everywhere from one dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-8 flex justify-between items-center gap-4 flex-wrap">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="">
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {connectedPlatforms.length} connected
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                {platforms.length - connectedPlatforms.length} available
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredPlatforms.map((platform) => {
            const connected = isConnected(platform.id)
            
            return (
              <div 
                key={platform.id}
                className={`bg-white rounded-xl border p-5 ${
                  connected ? 'border-emerald-200' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${platform.bgColor}`}>
                      <platform.icon className={`w-5 h-5 ${platform.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{platform.name}</h3>
                      <p className="text-sm text-slate-500">{platform.description}</p>
                    </div>
                  </div>
                  {connected && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {platform.id === 'linkedin' && connected && linkedinProfile && (
                  <div className="mb-3 p-2 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700">{linkedinProfile.name}</p>
                    <p className="text-xs text-slate-500">{linkedinProfile.email}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {platform.id === 'linkedin' ? (
                    connected ? (
                      <Button 
                        variant="outline"
                        onClick={disconnectLinkedIn}
                        disabled={loadingPlatform === 'linkedin'}
                      >
                        {loadingPlatform === 'linkedin' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Disconnect'
                        )}
                      </Button>
                    ) : (
                      <Button 
                        variant="accent"
                        onClick={connectLinkedIn}
                        disabled={loadingPlatform === 'linkedin'}
                      >
                        {loadingPlatform === 'linkedin' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Connect
                          </>
                        )}
                      </Button>
                    )
                  ) : (
                    <Button 
                      variant="accent"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredPlatforms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No platforms found</h3>
            <p className="text-slate-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConnectAccounts
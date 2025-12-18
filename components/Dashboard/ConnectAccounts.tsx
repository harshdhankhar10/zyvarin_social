"use client"

import React, { useState, useEffect } from 'react'
import { 
  Linkedin, Twitter, Instagram, Facebook, 
  Github, Search, Plus, CheckCircle2, Loader2,
  AlertCircle, Info,
  Code, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

interface PlatformLimit {
  canConnectMore: boolean;
  remaining: number;
  connectedCount: number;
  maxAllowed: number;
  hasReachedLimit: boolean;
  used: number;
  total: number;
  percentage: number;
}

interface AILimit {
  remaining: number;
  used: number;
  total: number;
  percentage: number;
}

interface Limits {
  aiGenerations: AILimit;
  platforms: PlatformLimit;
}

interface ConnectedPlatform {
  id: string;
  name?: string;
  username?: string;
}


const ConnectAccounts = ({ 
  connectedPlatforms: initialConnectedPlatforms,
  linkedinProfile,
  twitterProfile,
  limits
}: { 
  connectedPlatforms: ConnectedPlatform[]
  linkedinProfile?: any
  twitterProfile?: any
  limits: Limits
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [connectedPlatforms, setConnectedPlatforms] = useState<ConnectedPlatform[]>(initialConnectedPlatforms)
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showLimitWarning, setShowLimitWarning] = useState(false)
  const [showDevToModal, setShowDevToModal] = useState(false)
  const [devToApiKey, setDevToApiKey] = useState('')
  const [devToLoading, setDevToLoading] = useState(false)

  useEffect(() => {
    if (limits.platforms.hasReachedLimit && !showLimitWarning) {
      setShowLimitWarning(true)
    }
  }, [limits.platforms.hasReachedLimit, showLimitWarning])

  const platforms = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-[#0077b5]',
      bgColor: 'bg-blue-50',
      description: 'Professional networking',
      isAvailable: true
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'text-black',
      bgColor: 'bg-slate-50',
      description: 'Real-time conversations',
      isAvailable: true
    },
    {
      id: 'devto',
      name: 'Dev.to',
      icon: Code,
      color: 'text-black',
      bgColor: 'bg-slate-50',
      description: 'Developer community',
      isAvailable: true
    }
  ]

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isConnected = (platformId: string) => 
    connectedPlatforms.some(p => p.id === platformId)

  const getPlatformProfile = (platformId: string) => {
    if (platformId === 'linkedin' && linkedinProfile) {
      return {
        name: linkedinProfile.name,
        detail: linkedinProfile.email
      }
    }
    if (platformId === 'twitter' && twitterProfile) {
      return {
        name: twitterProfile.name,
        detail: `@${twitterProfile.username}`
      }
    }
    if (platformId === 'devto') {
      const devToPlatform = connectedPlatforms.find(p => p.id === 'devto')
      if (devToPlatform) {
        return {
          name: devToPlatform.name || 'Dev.to Account',
          detail: devToPlatform.username || 'Connected'
        }
      }
    }
    return null
  }

  const connectToDevTo = async () => {
    if (!devToApiKey.trim()) {
      setError('Please enter your Dev.to API key')
      return
    }

    setDevToLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/social/dev_to/connect', {
        apiKey: devToApiKey.trim()
      })

      if (response.data.success) {
        const devToProfile = {
          id: 'devto',
          name: response.data.user?.name || 'Dev.to User',
          username: response.data.user?.username
        }
        setConnectedPlatforms(prev => [...prev, devToProfile])
        setShowDevToModal(false)
        setDevToApiKey('')
      } else {
        setError(response.data.message || 'Failed to connect Dev.to')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to connect Dev.to. Please check your API key.')
    } finally {
      setDevToLoading(false)
    }
  }

  const connectPlatform = async (platformId: string) => {
    if (!limits.platforms.canConnectMore) {
      setError(`You've reached your limit of ${limits.platforms.maxAllowed} connected platforms. Upgrade your plan to connect more.`)
      setShowLimitWarning(true)
      return
    }

    setLoadingPlatform(platformId)
    setError(null)
    setShowLimitWarning(false)

    try {
      if (platformId === 'linkedin') {
        window.location.href = '/api/social/linkedin/connect'
      } else if (platformId === 'twitter') {
        window.location.href = '/api/social/twitter/connect'
      } else if (platformId === 'devto') {
        setShowDevToModal(true)
        setLoadingPlatform(null)
      }
    } catch (err) {
      setError(`Failed to connect ${platformId}`)
      setLoadingPlatform(null)
    }
  }

  const disconnectPlatform = async (platformId: string) => {
    setLoadingPlatform(platformId)
    setError(null)
    
    try {
      const response = await axios.post(`/api/social/${platformId}/disconnect`)
      
      if (response.data.success) {
        setConnectedPlatforms(prev => prev.filter(p => p.id !== platformId))
      } else {
        setError(`Failed to disconnect ${platformId}`)
      }
    } catch (err) {
      setError(`Failed to disconnect ${platformId}`)
    } finally {
      setLoadingPlatform(null)
    }
  }

  const getConnectionButton = (platform: typeof platforms[0]) => {
    const connected = isConnected(platform.id)
    
    if (!platform.isAvailable) {
      return (
        <Button 
          variant="outline"
          disabled
          className="w-full opacity-50"
        >
          Coming Soon
        </Button>
      )
    }

    if (connected) {
      return (
        <Button 
          variant="outline"
          onClick={() => disconnectPlatform(platform.id)}
          disabled={loadingPlatform === platform.id}
          className="w-full"
        >
          {loadingPlatform === platform.id ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Disconnect'
          )}
        </Button>
      )
    }

    return (
      <Button 
        variant="accent"
        onClick={() => connectPlatform(platform.id)}
        disabled={loadingPlatform === platform.id || !limits.platforms.canConnectMore}
        className="w-full"
      >
        {loadingPlatform === platform.id ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Connect
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="">
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Social Connections</h1>
          <p className="text-slate-500">Connect your social accounts to publish everywhere from one dashboard</p>
        </div>

        {showLimitWarning && limits.platforms.hasReachedLimit && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              You've reached your limit of {limits.platforms.maxAllowed} connected platforms. 
              <a href="/pricing" className="font-semibold ml-1 hover:underline">Upgrade your plan</a> to connect more.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">AI Generations</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                {limits.aiGenerations.percentage}%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">
              {limits.aiGenerations.remaining} remaining
            </p>
            <p className="text-xs text-slate-500">
              {limits.aiGenerations.used}/{limits.aiGenerations.total} used this month
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">Connected Platforms</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                limits.platforms.percentage >= 90 ? 'bg-red-100 text-red-600' :
                limits.platforms.percentage >= 70 ? 'bg-amber-100 text-amber-600' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                {limits.platforms.percentage}%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">
              {limits.platforms.connectedCount}/{limits.platforms.maxAllowed}
            </p>
            <p className="text-xs text-slate-500">
              {limits.platforms.remaining} {limits.platforms.remaining === 1 ? 'slot' : 'slots'} remaining
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600">Account Status</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                limits.platforms.hasReachedLimit ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {limits.platforms.hasReachedLimit ? 'Limit Reached' : 'Active'}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">
              {limits.platforms.remaining} available
            </p>
            <p className="text-xs text-slate-500">
              {limits.platforms.canConnectMore ? 'Can connect more' : 'Upgrade for more slots'}
            </p>
          </div>
        </div>

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
          <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              {limits.platforms.connectedCount} connected
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              {limits.platforms.remaining} available
            </span>
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400" />
              Max: {limits.platforms.maxAllowed}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlatforms.map((platform) => {
            const connected = isConnected(platform.id)
            const profile = getPlatformProfile(platform.id)
            
            return (
              <div 
                key={platform.id}
                className={`bg-white rounded-xl border p-5 ${
                  connected ? 'border-emerald-200' : 'border-slate-200'
                } ${!platform.isAvailable ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${platform.bgColor}`}>
                      {platform.name === 'Dev.to' ? (
                        <Image
                          src="https://cdn.iconscout.com/icon/free/png-512/free-dev-dot-to-logo-icon-svg-download-png-2878471.png?f=webp&w=512" 
                          alt="Dev.to"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      ) : (
                        <platform.icon className={`w-5 h-5 ${platform.color}`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{platform.name}</h3>
                      <p className="text-sm text-slate-500">{platform.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {connected && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}

                  </div>
                </div>

                {connected && profile && (
                  <div className="mb-3 p-2 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700">{profile.name}</p>
                    <p className="text-xs text-slate-500">{profile.detail}</p>
                  </div>
                )}

                {getConnectionButton(platform)}
                
                {!limits.platforms.canConnectMore && !connected && platform.isAvailable && (
                  <p className="mt-2 text-xs text-red-500 text-center">
                    Limit reached
                  </p>
                )}
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

      <Dialog open={showDevToModal} onOpenChange={setShowDevToModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Connect Dev.to Account</DialogTitle>
            <DialogDescription className="text-slate-500">
              Enter your Dev.to API key to connect your account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-slate-700 mb-2">How to get your API key:</p>
              <ol className="list-decimal list-inside text-sm text-slate-600 space-y-1 mb-3">
                <li>Go to <a href="https://dev.to/settings" target="_blank"  className="text-indigo-600 hover:underline">dev.to/settings</a></li>
                <li>Navigate to <strong>Account → Extensions</strong></li>
                <li>Click "Generate API Key"</li>
                <li>Copy and paste the key below</li>
              </ol>
              <a 
                href="https://medium.com/@dhankhar14804/how-to-get-your-dev-to-api-key-easy-step-by-step-guide-b1727cf9962e" 
                target="_blank" 
                className="inline-flex items-center text-sm text-indigo-600 hover:underline"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Read this Step-by-Step Guide
              </a>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">API Key</label>
              <Input
                type="password"
                placeholder="Paste your Dev.to API key here"
                value={devToApiKey}
                onChange={(e) => setDevToApiKey(e.target.value)}
                className="w-full"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDevToModal(false)
                  setDevToApiKey('')
                  setError(null)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={connectToDevTo}
                disabled={devToLoading || !devToApiKey.trim()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {devToLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  'Connect Account'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ConnectAccounts
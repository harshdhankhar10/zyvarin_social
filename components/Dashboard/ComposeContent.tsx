"use client"

import React, { useEffect, useState } from 'react'
import {
  Linkedin, Twitter, Globe, Send, Save,
  Image as ImageIcon, Calendar, Wand2, ChevronDown,
  Check, X, Clock, AlertCircle, Users, Loader2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import axios from 'axios'



const ComposeContent = ({ 
  connectedAccounts, 
  hasLinkedin, 
  hasTwitter 
}: { 
  connectedAccounts: Array<{ provider: string; profileData: any }>
  hasLinkedin: boolean
  hasTwitter: boolean
}) => {

  const [content, setContent] = useState('')
  const [tone, setTone] = useState('')
  const [customToneContent, setCustomToneContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scheduleTime, setScheduleTime] = useState('now')
  const [showPlatformSelector, setShowPlatformSelector] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{success?: boolean; message?: string} | null>(null)

  const fetchFromLocalDraft = () => {
    const draft = localStorage.getItem('postDraft')
    if (draft) {
      const parsedDraft = JSON.parse(draft)
      setContent(parsedDraft.content || '')
      setTone(parsedDraft.tone || '')
      setCustomToneContent(parsedDraft.customToneContent || '')
      setSelectedPlatforms(parsedDraft.selectedPlatforms || [])
    }
  }

  useEffect(() => {
    fetchFromLocalDraft()
  }, [])

  const getProviderIcon = (provider: string) => {
    switch(provider) {
      case 'linkedin': return Linkedin
      case 'twitter': return Twitter
      default: return Globe
    }
  }

  const getProviderColor = (provider: string) => {
    switch(provider) {
      case 'linkedin': return 'blue'
      case 'twitter': return 'black'
      default: return 'slate'
    }
  }

  const getProviderLabel = (provider: string) => {
    switch(provider) {
      case 'linkedin': return 'LinkedIn'
      case 'twitter': return 'Twitter'
      default: return provider
    }
  }

  const getUsername = (provider: string, profileData: any) => {
    if (!profileData) return ''
    switch(provider) {
      case 'linkedin': return profileData.name || 'LinkedIn Account'
      case 'twitter': return `@${profileData.username || 'user'}`
      default: return ''
    }
  }

  const getProfileImage = (provider: string) => {
    const account = connectedAccounts.find(acc => acc.provider === provider)
    return account?.profileData?.picture || account?.profileData?.profile_image_url || null
  }

  const handlePublish = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) {
      setResult({ success: false, message: 'Please add content and select platforms' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const results = []

      for (const platform of selectedPlatforms) {
        try {
          const response = await axios.post(`/api/social/${platform}/post`, {
            content: content.trim(),
            mediaUrls: []
          })
          const data = response.data
          
          if (data.success) {
            results.push(`${platform}: ✅ Success`)
          } else {
            results.push(`${platform}: ❌ ${data.error}`)
          }
        } catch (error) {
          results.push(`${platform}: ❌ Failed to connect`)
        }
      }

      const successCount = results.filter(r => r.includes('✅')).length
      const totalCount = selectedPlatforms.length

      setResult({ 
        success: successCount > 0,
        message: `Posted to ${successCount} of ${totalCount} platforms: ${results.join(', ')}`
      })

      if (successCount === totalCount) {
        setContent('')
        setSelectedPlatforms([])
      }

    } catch (error) {
      setResult({ success: false, message: 'Failed to publish posts' })
    } finally {
      setLoading(false)
    }
  }


  const handleSaveToLocal = () => {
    setLoading(true)
    try {
      const draft = {
        content,
        tone,
        customToneContent,
        selectedPlatforms,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('postDraft', JSON.stringify(draft))
      setResult({ success: true, message: 'Draft saved locally' })
    } catch (error) {
      setResult({ success: false, message: 'Failed to save draft' })
    } finally {
      setLoading(false)
    }
  }

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(prev => prev.filter(p => p !== platform))
    } else {
      setSelectedPlatforms(prev => [...prev, platform])
    }
  }

  const initializePlatforms = () => {
    const platforms = []
    if (hasLinkedin) platforms.push('linkedin')
    if (hasTwitter) platforms.push('twitter')
    setSelectedPlatforms(platforms)
  }

  React.useEffect(() => {
    if (hasLinkedin || hasTwitter) {
      initializePlatforms()
    }
  }, [hasLinkedin, hasTwitter])

  if (connectedAccounts.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl p-8 text-center">
        <Users className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">No Connected Accounts</h2>
        <p className="text-sm text-slate-500 mb-6">Connect your social media accounts to start composing posts.</p>
        <Link href="/dashboard/connect-accounts" className="px-4 py-2 text-accent hover:underline text-sm font-medium">
          Click here to connect account
        </Link>
      </div>
    )
  }

  const PlatformDropdown = () => (
    <DropdownMenu open={showPlatformSelector} onOpenChange={setShowPlatformSelector}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Users className="w-4 h-4" />
          <span>{selectedPlatforms.length} selected</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-0">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">Post to accounts</span>
            <button 
              onClick={() => setSelectedPlatforms([])}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Clear all
            </button>
          </div>
        </div>
        <div className="p-2 max-h-60 overflow-y-auto">
          {connectedAccounts.map((account) => {
            const Icon = getProviderIcon(account.provider)
            const color = getProviderColor(account.provider)
            const isSelected = selectedPlatforms.includes(account.provider)
            
            return (
              <div
                key={account.provider}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'bg-slate-50' : 'hover:bg-slate-50'
                }`}
                onClick={() => togglePlatform(account.provider)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? `bg-${color}-100` : 'bg-slate-100'}`}>
                    <Icon className={`w-4 h-4 ${isSelected ? `text-${color}-600` : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{getProviderLabel(account.provider)}</p>
                    <p className="text-xs text-slate-500">{getUsername(account.provider, account.profileData)}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? `bg-${color}-600 border-${color}-600` : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const previewAccounts = connectedAccounts.filter(acc => selectedPlatforms.includes(acc.provider))

  const canPublish = content.trim().length > 0 && selectedPlatforms.length > 0

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[70%] flex flex-col border-r border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Create Post</h1>
                <p className="text-sm text-slate-500 mt-1">Compose your message below</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <select 
                    className="bg-transparent text-sm text-slate-700 outline-none"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  >
                    <option value="now">Publish Now</option>
                    <option value="schedule">Schedule</option>
                    <option value="draft">Save Draft</option>
                  </select>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md text-sm hover:bg-slate-100 transition-colors">
                      {tone || 'Tone'}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Tone</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setTone('Professional')}>Professional</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTone('Friendly')}>Friendly</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTone('Educational')}>Educational</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTone('Concise')}>Concise</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTone('Custom')}>Custom</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Enhance
                </button>
              </div>
            </div>
          </div>
          
          {tone === 'Custom' && (
            <div className="px-6 py-3 bg-indigo-50/30 border-b">
              <textarea
                placeholder="Custom tone instructions..."
                value={customToneContent}
                onChange={(e) => setCustomToneContent(e.target.value)}
                className="text-sm w-full border-slate-200 p-2 rounded border"
                rows={2}
              />
            </div>
          )}

          <div className="flex-1 p-6 relative">
            <textarea
              className="w-full h-full pb-16 resize-none outline-none text-base text-slate-900 placeholder:text-slate-400 font-normal leading-relaxed min-h-[300px]"
              placeholder="What would you like to share today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <div className="absolute bottom-12 left-6 right-6 flex items-center justify-between">
              <div className="flex gap-1">
                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${content.length > 3000 ? 'text-red-600' : 'text-slate-500'}`}>
                  {content.length}/3000
                </span>
                <span className={`text-xs ${content.length > 280 ? 'text-red-600' : 'text-slate-500'}`}>
                  Twitter: {content.length}/280
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] flex flex-col border-l border-slate-200">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Preview</h3>
                <div className="flex items-center gap-2">
                  {previewAccounts.slice(0, 3).map((account, index) => {
                    const Icon = getProviderIcon(account.provider)
                    const color = getProviderColor(account.provider)
                    const profileImg = getProfileImage(account.provider)
                    
                    return (
                      <div key={account.provider} className="relative" style={{ zIndex: 3 - index }}>
                        {profileImg ? (
                          <img 
                            src={profileImg} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${
                            color === 'blue' ? 'bg-blue-100' : 
                            color === 'black' ? 'bg-slate-100' : 
                            'bg-green-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              color === 'blue' ? 'text-blue-600' : 
                              color === 'black' ? 'text-slate-800' : 
                              'text-green-600'
                            }`} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {previewAccounts.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-600">+{previewAccounts.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {previewAccounts.map((account) => {
                  const Icon = getProviderIcon(account.provider)
                  const color = getProviderColor(account.provider)
                  const profileImg = getProfileImage(account.provider)
                  
                  return (
                    <div key={account.provider} className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {profileImg ? (
                          <img 
                            src={profileImg} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            color === 'blue' ? 'bg-blue-100' : 
                            color === 'black' ? 'bg-slate-100' : 
                            'bg-green-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              color === 'blue' ? 'text-blue-600' : 
                              color === 'black' ? 'text-slate-800' : 
                              'text-green-600'
                            }`} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {getUsername(account.provider, account.profileData)}
                            </p>
                            <div className={`p-1 rounded ${
                              color === 'blue' ? 'bg-blue-50' : 
                              color === 'black' ? 'bg-slate-50' : 
                              'bg-green-50'
                            }`}>
                              <Icon className={`w-3 h-3 ${
                                color === 'blue' ? 'text-blue-600' : 
                                color === 'black' ? 'text-slate-800' : 
                                'text-green-600'
                              }`} />
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {account.provider === 'linkedin' ? 'LinkedIn' : 
                             account.provider === 'twitter' ? 'Twitter' : 
                             'Medium'}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {content.substring(0, account.provider === 'twitter' ? 280 : 3000)}
                        {account.provider === 'twitter' && content.length > 280 && (
                          <span className="text-red-500 text-xs ml-1">[...]</span>
                        )}
                      </div>
                      {account.provider === 'twitter' && content.length > 280 && (
                        <div className="mt-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            <p className="text-xs text-red-700">Exceeds Twitter limit ({content.length}/280)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {previewAccounts.length === 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-700">No accounts selected</p>
                    <p className="text-xs text-slate-500 mt-1">Select platforms to see preview</p>
                  </div>
                )}
              </div>
            </div>

            {result && (
              <div className={`mt-4 p-3 rounded-lg ${
                result.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="flex items-start">
                  {result.success ? (
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="text-sm">{result.message}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white px-6 py-3 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PlatformDropdown />
            
            {selectedPlatforms.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  {selectedPlatforms.map((platform) => {
                    const Icon = getProviderIcon(platform)
                    const color = getProviderColor(platform)
                    return (
                      <div 
                        key={platform}
                        className={`p-1 rounded ${
                          color === 'blue' ? 'bg-blue-50' : 
                          color === 'black' ? 'bg-slate-50' : 
                          'bg-green-50'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${
                          color === 'blue' ? 'text-blue-600' : 
                          color === 'black' ? 'text-slate-800' : 
                          'text-green-600'
                        }`} />
                      </div>
                    )
                  })}
                </div>
                <span className="text-xs text-slate-500">
                  {selectedPlatforms.length} account{selectedPlatforms.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => {handleSaveToLocal();}}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button 
              onClick={handlePublish}
              disabled={!canPublish || loading}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                !canPublish || loading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? 'Publishing...' : 
               scheduleTime === 'now' ? 'Publish' : 
               scheduleTime === 'schedule' ? 'Schedule' : 
               'Save Draft'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComposeContent
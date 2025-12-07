"use client"

import React, { useState } from 'react'
import { AlertCircle, Users, Check } from 'lucide-react'
import { getProviderIcon, getProviderColor, getProviderBgColor, getUsername, getProfileImage } from '@/utils/socialUtils'

interface PreviewPanelProps {
  connectedAccounts: Array<{ provider: string; profileData: any }>
  selectedPlatforms: string[]
  content: string
  mediaUrls: string[]
  result: { success?: boolean; message?: string } | null
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  connectedAccounts,
  selectedPlatforms,
  content,
  mediaUrls,
  result
}) => {
  const [activeTab, setActiveTab] = useState<string>('twitter')
  
  const previewAccounts = connectedAccounts.filter(acc => selectedPlatforms.includes(acc.provider))
  
  const tabs = previewAccounts.map(account => ({
    id: account.provider,
    label: account.provider === 'linkedin' ? 'LinkedIn' : 
           account.provider === 'twitter' ? 'Twitter' : 
           account.provider === 'medium' ? 'Medium' :
           account.provider === 'devto' ? 'Dev.to' : account.provider,
    icon: getProviderIcon(account.provider)
  }))

  const activeAccount = previewAccounts.find(acc => acc.provider === activeTab)

  if (tabs.length === 0) {
    return (
      <div className="w-full lg:w-[30%] flex flex-col border-l border-slate-200">
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-6">Preview</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-base font-medium text-slate-700 mb-2">No platforms selected</p>
            <p className="text-sm text-slate-500">Select platforms to see how your post will look</p>
          </div>
        </div>
      </div>
    )
  }

  const Icon = getProviderIcon(activeTab)
  const colorClass = getProviderColor(activeTab)
  const bgClass = getProviderBgColor(activeTab)
  const profileImg = getProfileImage(activeTab, connectedAccounts)

  return (
    <div className="w-full lg:w-[30%] flex flex-col border-l border-slate-200">
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Preview</h3>
        
        <div className="flex border-b border-slate-200 mb-6">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            {profileImg ? (
              <img 
                src={profileImg} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass.split(' ')[1]}`}>
                <Icon className={`w-5 h-5 ${colorClass.split(' ')[0]}`} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {getUsername(activeTab, activeAccount?.profileData)}
                </p>
                <div className={`px-2 py-1 rounded-full text-xs ${bgClass}`}>
                  <span className={colorClass.split(' ')[0]}>
                    {activeTab === 'linkedin' ? 'LinkedIn' : 
                     activeTab === 'twitter' ? 'Twitter' : 
                      activeTab === 'medium' ? 'Medium' :
                       activeTab === 'devto' ? 'Dev.to' : activeTab}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {activeTab === 'twitter' ? 'Tweet' : 'Post'}
              </p>
            </div>
          </div>
          
          <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed mb-4">
            {content}
          </div>
          
          {mediaUrls.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className={`grid gap-2 ${
                mediaUrls.length === 1 ? 'grid-cols-1' :
                mediaUrls.length === 2 ? 'grid-cols-2' :
                mediaUrls.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
              }`}>
                {mediaUrls.slice(0, 4).map((url, index) => (
                  <div key={index} className={`${
                    mediaUrls.length === 3 && index === 0 ? 'col-span-2' : ''
                  }`}>
                    <img
                      src={url}
                      alt={`Media ${index + 1}`}
                      className="w-full h-32 object-cover rounded border border-slate-200"
                    />
                  </div>
                ))}
                {mediaUrls.length > 4 && (
                  <div className="col-span-2 h-32 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                    <span className="text-sm text-slate-600">+{mediaUrls.length - 4} more</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'twitter' && content.length > 280 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">Exceeds Twitter limit ({content.length}/280)</p>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className={`mt-5 p-4 rounded ${
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
  )
}

export default PreviewPanel
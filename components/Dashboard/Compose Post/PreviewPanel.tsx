"use client"

import React from 'react'
import { AlertCircle, Users, Check } from 'lucide-react'
import { getProviderIcon, getProviderColor, getProviderBgColor, getProviderLabel, getUsername, getProfileImage } from '@/utils/socialUtils'

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
  const previewAccounts = connectedAccounts.filter(acc => selectedPlatforms.includes(acc.provider))

  return (
    <div className="w-full lg:w-[30%] flex flex-col border-l border-slate-200">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Preview</h3>
            <div className="flex items-center gap-2">
              {previewAccounts.slice(0, 3).map((account, index) => {
                const Icon = getProviderIcon(account.provider)
                const colorClass = getProviderColor(account.provider)
                const profileImg = getProfileImage(account.provider, connectedAccounts)
                
                return (
                  <div key={account.provider} className="relative" style={{ zIndex: 3 - index }}>
                    {profileImg ? (
                      <img 
                        src={profileImg} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${colorClass.split(' ')[1]}`}>
                        <Icon className={`w-4 h-4 ${colorClass.split(' ')[0]}`} />
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
              const colorClass = getProviderColor(account.provider)
              const bgClass = getProviderBgColor(account.provider)
              const profileImg = getProfileImage(account.provider, connectedAccounts)
              
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass.split(' ')[1]}`}>
                        <Icon className={`w-5 h-5 ${colorClass.split(' ')[0]}`} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {getUsername(account.provider, account.profileData)}
                        </p>
                        <div className={`p-1 rounded ${bgClass}`}>
                          <Icon className={`w-3 h-3 ${colorClass.split(' ')[0]}`} />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {account.provider === 'linkedin' ? 'LinkedIn' : 
                         account.provider === 'twitter' ? 'Twitter' : 
                          account.provider === 'medium' ? 'Medium' :
                           account.provider === 'devto' ? 'Dev.to' : account.provider}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed mb-3">
                    {content.substring(0, account.provider === 'twitter' ? 280 : 3000)}
                    {account.provider === 'twitter' && content.length > 280 && (
                      <span className="text-red-500 text-xs ml-1">[...]</span>
                    )}
                  </div>
                  
                  {mediaUrls.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2">
                        {mediaUrls.slice(0, 4).map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Media ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border border-slate-200"
                          />
                        ))}
                        {mediaUrls.length > 4 && (
                          <div className="h-20 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                            <span className="text-xs text-slate-600">+{mediaUrls.length - 4} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
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
  )
}

export default PreviewPanel
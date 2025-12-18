"use client"

import React, { useState } from 'react'
import { X, Check, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { getProviderIcon, getProviderColor, getProviderBgColor } from '@/utils/socialUtils'

interface AISuggestionsModalProps {
  aiLoading: boolean
  aiSuggestions: any
  onSelectVersion: (platform: string, version: any) => void
  onClose: () => void
  selectedEnhanceOptions: string[]
}

const AISuggestionsModal: React.FC<AISuggestionsModalProps> = ({
  aiLoading,
  aiSuggestions,
  onSelectVersion,
  onClose,
  selectedEnhanceOptions
}) => {
  const [selectedVersions, setSelectedVersions] = useState<{[key: string]: number}>({})
  const [applyToAll, setApplyToAll] = useState(false)
  const [expandedPreviews, setExpandedPreviews] = useState<{[key: string]: boolean}>({})

  const handleSelectVersion = (platform: string, versionId: number) => {
    if (applyToAll) {
      const newSelectedVersions: {[key: string]: number} = {}
      aiSuggestions?.platforms?.forEach((p: any) => {
        newSelectedVersions[p.provider] = versionId
      })
      setSelectedVersions(newSelectedVersions)
    } else {
      setSelectedVersions(prev => ({
        ...prev,
        [platform]: versionId
      }))
    }
  }

  const handleApplySelection = () => {
    if (aiSuggestions?.platforms) {
      aiSuggestions.platforms.forEach((platform: any) => {
        const selectedVersionId = selectedVersions[platform.provider]
        if (selectedVersionId) {
          const version = platform.versions.find((v: any) => v.id === selectedVersionId)
          if (version) {
            onSelectVersion(platform.provider, version)
          }
        }
      })
    }
    onClose()
  }

  const togglePreview = (platform: string, versionId: number) => {
    const key = `${platform}-${versionId}`
    setExpandedPreviews(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (aiLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg animate-pulse">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-80" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-72" />
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            </div>

            {[1, 2, 3].map((platformIndex) => (
              <div key={platformIndex} className="border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((versionIndex) => (
                    <div key={versionIndex} className="border border-slate-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                      </div>

                      <Skeleton className="h-10 w-full rounded-lg mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
            <Skeleton className="h-5 w-48" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-60" />
              <Skeleton className="h-10 w-40 rounded-lg" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900 mb-1">Generating AI Suggestions</p>
                <p className="text-xs text-slate-500">Analyzing content for {selectedEnhanceOptions.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">AI Suggestions</h2>
              <p className="text-sm text-slate-500">
                {selectedEnhanceOptions.join(', ')} • {aiSuggestions?.platforms?.length || 0} platforms
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-900">Apply same version to all platforms</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={applyToAll}
                  onChange={(e) => setApplyToAll(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          <div className="space-y-8">
            {aiSuggestions?.platforms?.map((platform: any) => {
              const Icon = getProviderIcon(platform.provider)
              const colorClass = getProviderColor(platform.provider)
              const bgClass = getProviderBgColor(platform.provider)
              
              return (
                <div key={platform.provider} className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${bgClass}`}>
                      <Icon className={`w-5 h-5 ${colorClass.split(' ')[0]}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 capitalize">
                        {platform.provider === 'twitter' ? 'Twitter/X' : platform.provider}
                      </h3>
                      <p className="text-sm text-slate-500">Select one of 3 optimized versions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {platform.versions.map((version: any) => {
                      const isSelected = selectedVersions[platform.provider] === version.id
                      const previewKey = `${platform.provider}-${version.id}`
                      const isExpanded = expandedPreviews[previewKey]
                      
                      return (
                        <div
                          key={version.id}
                          className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border-indigo-300 bg-indigo-50/30'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                          onClick={() => handleSelectVersion(platform.provider, version.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-600'
                                  : 'border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <h4 className="text-sm font-semibold text-slate-900">{version.title}</h4>
                            </div>
                            {isSelected && (
                              <span className="text-xs font-medium text-indigo-600">Selected</span>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className={`text-sm text-slate-700 whitespace-pre-wrap leading-relaxed ${
                              isExpanded ? '' : 'line-clamp-3'
                            }`}>
                              {version.content || 'No content generated'}
                            </div>
                            
                            {platform.provider === 'twitter' && (
                              <div className={`mt-2 text-xs font-medium ${
                                version.content?.length > 280 
                                  ? 'text-red-600' 
                                  : 'text-green-600'
                              }`}>
                                {version.content?.length || 0}/280 characters
                                {version.content?.length > 280 && ' - Exceeds limit!'}
                              </div>
                            )}
                            
                            {(version.content?.length > 150) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  togglePreview(platform.provider, version.id)
                                }}
                                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium mt-2 flex items-center gap-1"
                              >
                                {isExpanded ? (
                                  <>
                                    Show less <ChevronUp className="w-3 h-3" />
                                  </>
                                ) : (
                                  <>
                                    Preview full <ChevronDown className="w-3 h-3" />
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectVersion(platform.provider, version.id)
                              onSelectVersion(platform.provider, version)
                            }}
                            className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                              isSelected
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ Selected' : 'Select this version'}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500">
              {Object.keys(selectedVersions).length} of {aiSuggestions?.platforms?.length || 0} platforms selected
            </div>
            <button
              onClick={handleApplySelection}
              disabled={Object.keys(selectedVersions).length === 0}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                Object.keys(selectedVersions).length === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Check className="w-4 h-4" />
              Apply to Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AISuggestionsModal
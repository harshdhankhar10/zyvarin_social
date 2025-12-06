import React from 'react'
import { Users, ChevronDown, Check, Send, Save, Loader2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getProviderIcon, getProviderBgColor, getProviderColor, getProviderLabel, getUsername } from '@/utils/socialUtils'

interface ActionBarProps {
  connectedAccounts: Array<{ provider: string; profileData: any }>
  selectedPlatforms: string[]
  showPlatformSelector: boolean
  setShowPlatformSelector: (show: boolean) => void
  togglePlatform: (platform: string) => void
  handleSaveToLocal: () => void
  handlePublish: () => void
  publishLoading: boolean
  scheduleTime: string
  canPublish: boolean
}

const ActionBar: React.FC<ActionBarProps> = ({
  connectedAccounts,
  selectedPlatforms,
  showPlatformSelector,
  setShowPlatformSelector,
  togglePlatform,
  handleSaveToLocal,
  handlePublish,
  publishLoading,
  scheduleTime,
  canPublish
}) => {
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
              onClick={() => togglePlatform('clear')}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Clear all
            </button>
          </div>
        </div>
        <div className="p-2 max-h-60 overflow-y-auto">
          {connectedAccounts.map((account) => {
            const Icon = getProviderIcon(account.provider)
            const colorClass = getProviderColor(account.provider)
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
                  <div className={`p-2 rounded-lg ${isSelected ? colorClass : 'bg-slate-100'}`}>
                    <Icon className={`w-4 h-4 ${isSelected ? colorClass.split(' ')[0] : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{getProviderLabel(account.provider)}</p>
                    <p className="text-xs text-slate-500">{getUsername(account.provider, account.profileData)}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? `bg-blue-600 border-blue-600` : 'border-slate-300'
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

  return (
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
                  const bgClass = getProviderBgColor(platform)
                  const colorClass = getProviderColor(platform)
                  return (
                    <div 
                      key={platform}
                      className={`p-1 rounded ${bgClass}`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${colorClass.split(' ')[0]}`} />
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
          <button 
            onClick={handleSaveToLocal}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button 
            onClick={handlePublish}
            disabled={!canPublish || publishLoading}
            className={`px-5 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
              !canPublish || publishLoading
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {publishLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {publishLoading ? 'Publishing...' : 
             scheduleTime === 'now' ? 'Publish' : 
             scheduleTime === 'schedule' ? 'Schedule' : 
             'Save Draft'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActionBar
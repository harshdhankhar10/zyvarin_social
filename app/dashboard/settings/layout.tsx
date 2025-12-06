"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  User, Settings as SettingsIcon, CreditCard, Shield, 
  Globe as WebIcon, ChevronRight
} from 'lucide-react'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const activeTab = pathname.split('/').pop() || 'profile'

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, href: '/dashboard/settings/profile' },
    { id: 'workspace', label: 'Workspace', icon: <SettingsIcon className="w-4 h-4" />, href: '/dashboard/settings/workspace' },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" />, href: '/dashboard/settings/billing' },
    { id: 'integrations', label: 'Integrations', icon: <WebIcon className="w-4 h-4" />, href: '/dashboard/settings/integrations' },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" />, href: '/dashboard/settings/security' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg border border-gray-200">
              <nav className="p-2">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
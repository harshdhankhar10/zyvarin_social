'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, LogOut, FileText, Settings, TrendingUp, Bell, Bug, Shield } from 'lucide-react'
import { signOut } from 'next-auth/react'

const AdminSidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/notifications', label: 'Notifications', icon: Bell },
    { href: '/admin/bug-reports', label: 'Bug Reports', icon: Bug },
    { href: '/admin/maintenance', label: 'Maintenance', icon: Shield },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 bg-gray-900 text-white fixed left-0 top-0 bottom-0 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Zyvarin Admin</h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar

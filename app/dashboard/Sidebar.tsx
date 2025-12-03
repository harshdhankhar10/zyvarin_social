"use client"

import React from 'react';
import { LayoutGrid, PenTool, BarChart3, Settings, LogOut, Link2Icon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { id: '/dashboard', icon: LayoutGrid, label: 'Home' },
    { id: '/dashboard/compose', icon: PenTool, label: 'Compose' },
    { id: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { id: '/dashboard/connect-accounts', icon: Link2Icon, label: 'Connect Accounts' },
    { id: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ];
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 fixed left-0 top-0 bottom-0 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 -ml-4 rounded-r-full hidden md:block"></div>}
              </button>
            );
          })}
        </nav>
        
       
      </div>
    </aside>
  );
};

export default Sidebar;
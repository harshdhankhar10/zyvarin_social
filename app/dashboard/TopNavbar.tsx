"use client"
import React, {useState} from 'react';
import { Search, HelpCircle, Bell, ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  fullName: string;
  email: string;
  avatarUrl: string | null;
}

const TopNavbar: React.FC<{ user: User }> = ({ user }) => {
  return (
    <header className="fixed w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20">
      <div className="flex items-center gap-4">
       
        
        <div className="flex items-center gap-3">
          <Image 
            src="/zyvarin-logo_1.png" 
            alt="Zyvarin Logo" 
            width={120}
            height={40}
            className="w-32 h-auto md:w-40 -ml-12 object-contain md:-ml-16"
          />
           <Link href="/dashboard" className=" md:block -ml-12 text-gray-700 hover:text-gray-900">
                <h1 className=" text-2xl md:text-3xl font-bold tracking-tight flex gap-2">
                  <span className="text-accent">
                    Zyvarin</span>
                   Dashboard</h1>
              </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 transition-all md:focus:w-80"
          />
        </div>
        
        <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>
        
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-100 rounded-full transition-colors">
          <Image
            src={ user.avatarUrl || '/default-avatar.png' }
            alt="User" 
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border border-slate-200"
          />
          <span className="hidden sm:block text-sm font-medium text-slate-700">{user.fullName}</span>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
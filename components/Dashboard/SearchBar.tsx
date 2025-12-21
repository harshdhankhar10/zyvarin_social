"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Search, Home, PenTool, BarChart3, Link2, Settings, User, CreditCard, Receipt, Shield, HelpCircle, FileText, Bell, TrendingUp, Calendar, Hash, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'Pages' | 'Settings' | 'Features' | 'Help';
  keywords: string[];
}

const searchData: SearchItem[] = [
  {
    id: 'dashboard-home',
    title: 'Dashboard Home',
    description: 'Overview of your account and recent activity',
    href: '/dashboard',
    icon: Home,
    category: 'Pages',
    keywords: ['home', 'overview', 'dashboard', 'main', 'stats', 'summary']
  },
  {
    id: 'compose',
    title: 'Compose Post',
    description: 'Create and schedule posts for social media',
    href: '/dashboard/compose',
    icon: PenTool,
    category: 'Pages',
    keywords: ['compose', 'create', 'post', 'write', 'publish', 'social media', 'content', 'schedule']
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View performance metrics and insights',
    href: '/dashboard/analytics',
    icon: BarChart3,
    category: 'Pages',
    keywords: ['analytics', 'stats', 'metrics', 'performance', 'insights', 'data', 'reports', 'charts']
  },
  {
    id: 'connect-accounts',
    title: 'Connect Accounts',
    description: 'Manage your social media connections',
    href: '/dashboard/connect-accounts',
    icon: Link2,
    category: 'Pages',
    keywords: ['connect', 'accounts', 'social media', 'linkedin', 'twitter', 'facebook', 'integrations', 'link']
  },
  
  {
    id: 'settings',
    title: 'Settings',
    description: 'Manage your account preferences',
    href: '/dashboard/settings',
    icon: Settings,
    category: 'Settings',
    keywords: ['settings', 'preferences', 'configuration', 'account']
  },
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Edit your personal information',
    href: '/dashboard/settings/profile',
    icon: User,
    category: 'Settings',
    keywords: ['profile', 'personal', 'info', 'name', 'email', 'avatar', 'timezone', 'edit']
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    description: 'Manage subscription and payment methods',
    href: '/dashboard/settings/billing',
    icon: CreditCard,
    category: 'Settings',
    keywords: ['billing', 'payment', 'subscription', 'plan', 'upgrade', 'pricing', 'invoice', 'card']
  },
  {
    id: 'transactions',
    title: 'Transaction History',
    description: 'View all your payment transactions',
    href: '/dashboard/settings/transactions-history?page=1',
    icon: Receipt,
    category: 'Settings',
    keywords: ['transactions', 'history', 'payments', 'receipts', 'orders', 'billing history']
  },
  {
    id: 'security',
    title: 'Security Settings',
    description: 'Change password and manage account security',
    href: '/dashboard/settings/security',
    icon: Shield,
    category: 'Settings',
    keywords: ['security', 'password', 'change password', 'authentication', 'login', 'secure']
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'View connected social media accounts',
    href: '/dashboard/settings/integrations',
    icon: Link2,
    category: 'Settings',
    keywords: ['integrations', 'connected', 'accounts', 'social', 'platforms', 'manage connections']
  },
  
  {
    id: 'ai-suggestions',
    title: 'AI Suggestions',
    description: 'Get AI-powered content recommendations',
    href: '/dashboard/compose',
    icon: TrendingUp,
    category: 'Features',
    keywords: ['ai', 'suggestions', 'recommendations', 'content', 'generate', 'artificial intelligence', 'smart']
  },
  {
    id: 'schedule-posts',
    title: 'Schedule Posts',
    description: 'Plan and schedule your content',
    href: '/dashboard/compose',
    icon: Calendar,
    category: 'Features',
    keywords: ['schedule', 'calendar', 'plan', 'timing', 'post later', 'automate']
  },
  {
    id: 'hashtags',
    title: 'Hashtag Suggestions',
    description: 'Get relevant hashtag recommendations',
    href: '/dashboard/compose',
    icon: Hash,
    category: 'Features',
    keywords: ['hashtags', 'tags', '#', 'trending', 'suggestions', 'keywords']
  },
  {
    id: 'pricing',
    title: 'View Pricing Plans',
    description: 'Compare subscription plans and features',
    href: '/dashboard/settings/billing',
    icon: DollarSign,
    category: 'Features',
    keywords: ['pricing', 'plans', 'free', 'creator', 'premium', 'upgrade', 'subscription tiers']
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'View your notifications and alerts',
    href: '/dashboard',
    icon: Bell,
    category: 'Features',
    keywords: ['notifications', 'alerts', 'updates', 'messages', 'news']
  },
  
  {
    id: 'help',
    title: 'Help Center',
    description: 'Get help and find answers to common questions',
    href: '/dashboard/help',
    icon: HelpCircle,
    category: 'Help',
    keywords: ['help', 'support', 'faq', 'questions', 'guide', 'tutorial', 'documentation', 'how to']
  },
  {
    id: 'getting-started',
    title: 'Getting Started Guide',
    description: 'Learn how to use the platform',
    href: '/dashboard/help',
    icon: FileText,
    category: 'Help',
    keywords: ['getting started', 'tutorial', 'guide', 'beginner', 'onboarding', 'setup', 'first steps']
  }
];

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredResults([]);
      setIsOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    const results = searchData.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }).slice(0, 8); 

    setFilteredResults(results);
    setIsOpen(results.length > 0);
  }, [searchQuery]);

  const handleResultClick = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="font-semibold text-indigo-600">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() && setIsOpen(true)}
          className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 transition-all focus:w-full"
        />
      </div>

      {isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-[70vh] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Search Results ({filteredResults.length})
            </div>
            
            {Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="mb-2">
                <div className="px-3 py-1.5 text-xs font-medium text-slate-400">
                  {category}
                </div>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={handleResultClick}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <Icon className="w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 mb-0.5">
                          {highlightText(item.title, searchQuery)}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {highlightText(item.description, searchQuery)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && searchQuery.trim() && filteredResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 text-center z-50 animate-in slide-in-from-top-2 duration-200">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-900 mb-1">No results found</p>
          <p className="text-xs text-slate-500">
            Try searching for pages, settings, or features
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

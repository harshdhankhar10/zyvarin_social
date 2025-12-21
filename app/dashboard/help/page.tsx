import React from 'react'
import { 
  BookOpen, 
  HelpCircle, 
  Zap, 
  Link as LinkIcon, 
  CreditCard, 
  Shield, 
  AlertCircle,
  Mail,
  ExternalLink,
  Settings,
  FileText,
  Users,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

export default function HelpCenterPage() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      articles: [
        {
          title: 'Quick Start Guide',
          description: 'Learn the basics of using Zyvarin Social',
          content: 'Get started with Zyvarin Social in 3 easy steps: 1) Set up your account, 2) Connect your social media platforms, 3) Compose and publish your first post.'
        },
        {
          title: 'Connect Social Accounts',
          description: 'How to connect LinkedIn, Twitter, and Dev.to',
          content: 'Navigate to Connect Accounts page, select your platform, authorize the connection, and start posting across multiple platforms simultaneously.'
        },
        {
          title: 'Compose Your First Post',
          description: 'Create and publish content across platforms',
          content: 'Use our compose editor to write your post, select target platforms, preview how it will look, and publish instantly or schedule for later.'
        }
      ]
    },
    {
      title: 'Features & How-to',
      icon: BookOpen,
      articles: [
        {
          title: 'AI-Powered Enhancements',
          description: 'Optimize your posts with AI assistance',
          content: 'Use AI to improve your post tone, generate relevant hashtags, add emojis, and optimize content for each platform automatically.'
        },
        {
          title: 'Post Scheduling',
          description: 'Schedule posts for optimal engagement',
          content: 'Schedule your posts to publish at the best times for your audience. Coming soon: Analytics-based time suggestions.'
        },
        {
          title: 'Analytics & Insights',
          description: 'Track your post performance',
          content: 'View detailed analytics including impressions, engagement rates, and performance across different platforms in your Analytics dashboard.'
        },
        {
          title: 'Managing Connected Accounts',
          description: 'Add, remove, or reconnect social accounts',
          content: 'Go to Settings > Integrations to view all connected accounts, disconnect platforms, or add new social media accounts.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      icon: CreditCard,
      articles: [
        {
          title: 'Subscription Plans',
          description: 'Understanding Free, Creator, and Premium plans',
          content: 'Free: 10 posts/month. Creator ($9.99): 100 posts/month + AI features. Premium ($24.99): Unlimited posts + priority support.'
        },
        {
          title: 'Transaction History',
          description: 'View and export your billing history',
          content: 'Access your transaction history in Settings > Transaction History. Export as PDF or CSV for your records.'
        },
        {
          title: 'Updating Payment Method',
          description: 'Change your payment information',
          content: 'Go to Settings > Billing to update your payment method, view upcoming charges, and manage your subscription.'
        },
        {
          title: 'Canceling Subscription',
          description: 'How to cancel or downgrade your plan',
          content: 'Visit Settings > Billing and click "Manage Subscription" to cancel or change your plan. Your access continues until the end of the billing period.'
        }
      ]
    },
    {
      title: 'Security & Privacy',
      icon: Shield,
      articles: [
        {
          title: 'Password Management',
          description: 'Change and secure your password',
          content: 'Go to Settings > Security to change your password. Use a strong password with at least 8 characters including letters, numbers, and symbols.'
        },
        {
          title: 'Account Status',
          description: 'Understanding account verification',
          content: 'Verify your email address to unlock all features. Check your account status in Settings > Security.'
        },
        {
          title: 'Data & Privacy',
          description: 'How we protect your information',
          content: 'We use industry-standard encryption to protect your data. Your social media credentials are securely stored and never shared.'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      icon: AlertCircle,
      articles: [
        {
          title: 'Connection Issues',
          description: 'Troubleshoot social account connections',
          content: 'If your account disconnects, try reconnecting in Settings > Integrations. Ensure you have granted all necessary permissions.'
        },
        {
          title: 'Post Publishing Problems',
          description: 'What to do if posts fail to publish',
          content: 'Check your internet connection, verify the account is still connected, and ensure your post meets the platform\'s requirements (character limits, media formats).'
        },
        {
          title: 'Account Access Issues',
          description: 'Cannot log in or forgot password',
          content: 'Use the "Forgot Password" link on the sign-in page. If you still cannot access your account, contact support.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-gray-600">Find answers and learn how to use Zyvarin Social</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">Comprehensive guides and tutorials</p>
            <div className="text-sm text-purple-600 font-medium">Coming soon </div>
          </div>

          <Link href="/contact" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get help from our support team</p>
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              Send message <ExternalLink className="w-3 h-3" />
            </div>
          </Link>

          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-sm text-gray-600 mb-4">Connect with other users</p>
            <div className="text-sm text-purple-600 font-medium">Coming soon</div>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, sectionIndex) => {
            const Icon = section.icon
            return (
              <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.articles.map((article, articleIndex) => (
                    <details key={articleIndex} className="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 group-open:text-blue-600">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600">{article.description}</p>
                          </div>
                          <HelpCircle className="w-5 h-5 text-gray-400 group-open:text-blue-600 flex-shrink-0 ml-2" />
                        </div>
                      </summary>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-700 leading-relaxed">
                        {article.content}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Still need help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our support team is here to assist you. We typically respond within 24-48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
                <a 
                  href="mailto:support@zyvarin.com"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  support@zyvarin.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import React, { useState } from 'react'
import { 
  CreditCard, Check, Download, ExternalLink, ArrowRight,
  Zap, Send, Globe, Users, Calendar, BarChart,
  Info, AlertCircle, Sparkles, Crown, Clock,
  FileText, Receipt, Shield, CheckCircle,
  XCircle, AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'
import axios from 'axios'

interface BillingPageProps {
  billingData: {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: Date;
      currentPlan: string;
      connectedAccountsCount: number;
      memberSince: string;
    };
    usage: {
      ai: {
        used: number;
        total: number;
        remaining: number;
        percentage: number;
        hasReachedLimit: boolean;
      };
      posts: {
        used: number;
        total: number;
        remaining: number;
        percentage: number;
        hasReachedLimit: boolean;
      };
      platforms: {
        used: number;
        total: number;
        remaining: number;
        percentage: number;
        hasReachedLimit: boolean;
      };
    };
    planLimits: {
      aiGenerations: number;
      posts: number;
      platforms: number;
      scheduling: boolean;
      analytics: boolean;
      teamMembers?: number;
      price: number;
      priceDisplay: string;
    };
    invoices: Array<{
      id: string;
      invoiceNumber: string;
      date: Date;
      amount: number;
      status: string;
      description: string;
      plan: string;
      paymentStatus: string;
    }>;
    nextBillingDate: Date | null;
    subscription: {
      plan: string;
      status: string;
      billingCycle: string;
      price: number;
    } | null;
  };
}

export default function BillingPage({ billingData }: BillingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState(billingData.user.currentPlan)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getPlanPrice = (plan: string) => {
    switch (plan) {
      case 'FREE': return 0;
      case 'CREATOR': return 499;
      case 'PREMIUM': return 1199;
      default: return 0;
    }
  }

  const getPlanPriceDisplay = (plan: string) => {
    switch (plan) {
      case 'FREE': return '₹0';
      case 'CREATOR': return '₹499';
      case 'PREMIUM': return '₹1199';
      default: return '₹0';
    }
  }

  const plans = [
    {
      id: 'FREE',
      name: 'Free',
      price: getPlanPrice('FREE'),
      priceDisplay: getPlanPriceDisplay('FREE'),
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        `${billingData.planLimits.aiGenerations} AI generations/month`,
        `${billingData.planLimits.posts} posts/month`,
        `${billingData.planLimits.platforms} connected accounts`,
        'Basic publishing',
        'Email support',
      ],
      limitations: ['No scheduling', 'No analytics'],
      current: billingData.user.currentPlan === 'FREE'
    },
    {
      id: 'CREATOR',
      name: 'Creator',
      price: getPlanPrice('CREATOR'),
      priceDisplay: getPlanPriceDisplay('CREATOR'),
      period: '/month',
      description: 'For growing creators & solopreneurs',
      features: [
        '40 AI generations/month',
        '20 posts/month',
        '4 connected accounts',
        'Advanced scheduling',
        'Analytics dashboard',
        'Multiple content tones',
        'Priority support'
      ],
      current: billingData.user.currentPlan === 'CREATOR',
      popular: true
    },
    {
      id: 'PREMIUM',
      name: 'Premium',
      price: getPlanPrice('PREMIUM'),
      priceDisplay: getPlanPriceDisplay('PREMIUM'),
      period: '/month',
      description: 'For professionals & small teams',
      features: [
        '120 AI generations/month',
        '40 posts/month',
        '6 connected accounts',
        'Advanced analytics',
        'Custom workflows',
        'Dedicated support'
      ],
      current: billingData.user.currentPlan === 'PREMIUM'
    }
  ]

   const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (typeof window === 'undefined') {
                resolve(false);
                return;
            }

            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

  const handleUpgrade = async (planId: string) => {
    if (planId === billingData.user.currentPlan || isUpgrading) return
    
    setIsUpgrading(true)
    try {
      const response = await axios.post('/api/dashboard/billing/buy', {
        planId,
        price: getPlanPrice(planId)
      } )

      const orderData = response.data;

            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                throw new Error('Failed to load payment gateway');
            }
            let updatedAmount = orderData.amount + (orderData.amount * 0.18);
            orderData.amount = Math.round(updatedAmount);
             const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount * 100,
                currency: orderData.currency,
                name: 'Zyvarin Social',
                description: `Upgrade to ${planId} Plan`,
                order_id: orderData.orderId,
                handler: async function (razorpayResponse: any) {
                    try {
                        const verificationResponse = await axios.post('/api/dashboard/billing/verify', {
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature,
                            paymentId: orderData.paymentId,
                            planId,
                            orderId: orderData.orderId
                        });

                        const verificationData = verificationResponse.data;

                        setIsSuccess(true);

                        router.refresh();
                    } catch (error: any) {
                        console.error('Payment verification failed:', error);
                        alert('Payment verification failed. Please contact support.');
                        router.refresh();
                    }finally {
                        setIsUpgrading(false);
                    }
                },
                prefill: {
                    name: billingData.user.name,
                    email: billingData.user.email,
                },
                theme: {
                    color: '#6B5CFF',
                },
                modal: {
                    ondismiss: function () {
                      alert('Payment process was cancelled.');
                        setIsUpgrading(false);
                        router.refresh();
                    }
                }
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();


    } catch (error) {
      console.error('Error upgrading plan:', error)
      alert('An error occurred while processing your upgrade')
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    alert("Comming soon!")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (percentage: number, hasReachedLimit: boolean) => {
    if (hasReachedLimit) return 'red'
    if (percentage >= 90) return 'red'
    if (percentage >= 70) return 'amber'
    return 'emerald'
  }

  if(isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <div className="bg-green-100 rounded-full p-4 mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade Successful!</h2>
        <div className="text-center text-gray-600 mb-6 px-4"></div>
          <p>Your plan has been upgraded successfully. Enjoy your new features and benefits!</p>
        <div>
          <Button className='mt-6'
            onClick={() => router.refresh()} 
          >
            Go to Billing Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-1">Manage your subscription, view invoices, and upgrade your plan</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="px-3 py-1.5 bg-gray-100 text-gray-800 border border-gray-300">
            <span className="font-medium">Current: </span>
            {billingData.user.currentPlan}
          </Badge>
          {billingData.user.currentPlan === 'FREE' && (
            <Button onClick={() => handleUpgrade('CREATOR')} disabled={isUpgrading}>
              {isUpgrading ? 'Processing...' : 'Upgrade Plan'} 
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-medium text-gray-900">AI Generations</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {billingData.usage.ai.remaining}
                <span className="text-sm font-normal text-gray-500 ml-2">remaining</span>
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                getProgressColor(billingData.usage.ai.percentage, billingData.usage.ai.hasReachedLimit) === 'red' ? 
                  'bg-red-100 text-red-700' :
                  getProgressColor(billingData.usage.ai.percentage, billingData.usage.ai.hasReachedLimit) === 'amber' ? 
                  'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {billingData.usage.ai.percentage}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {billingData.usage.ai.used} of {billingData.usage.ai.total} used this month
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  getProgressColor(billingData.usage.ai.percentage, billingData.usage.ai.hasReachedLimit) === 'red' ? 
                    'bg-red-500' :
                    getProgressColor(billingData.usage.ai.percentage, billingData.usage.ai.hasReachedLimit) === 'amber' ? 
                    'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(billingData.usage.ai.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Send className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-900">Monthly Posts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {billingData.usage.posts.remaining}
                <span className="text-sm font-normal text-gray-500 ml-2">remaining</span>
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                getProgressColor(billingData.usage.posts.percentage, billingData.usage.posts.hasReachedLimit) === 'red' ? 
                  'bg-red-100 text-red-700' :
                  getProgressColor(billingData.usage.posts.percentage, billingData.usage.posts.hasReachedLimit) === 'amber' ? 
                  'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {billingData.usage.posts.percentage}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {billingData.usage.posts.used} of {billingData.usage.posts.total} used this month
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  getProgressColor(billingData.usage.posts.percentage, billingData.usage.posts.hasReachedLimit) === 'red' ? 
                    'bg-red-500' :
                    getProgressColor(billingData.usage.posts.percentage, billingData.usage.posts.hasReachedLimit) === 'amber' ? 
                    'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(billingData.usage.posts.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-medium text-gray-900">Connected Platforms</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {billingData.usage.platforms.remaining}
                <span className="text-sm font-normal text-gray-500 ml-2">available</span>
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                getProgressColor(billingData.usage.platforms.percentage, billingData.usage.platforms.hasReachedLimit) === 'red' ? 
                  'bg-red-100 text-red-700' :
                  getProgressColor(billingData.usage.platforms.percentage, billingData.usage.platforms.hasReachedLimit) === 'amber' ? 
                  'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {billingData.usage.platforms.percentage}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {billingData.usage.platforms.used} of {billingData.usage.platforms.total} connected
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  getProgressColor(billingData.usage.platforms.percentage, billingData.usage.platforms.hasReachedLimit) === 'red' ? 
                    'bg-red-500' :
                    getProgressColor(billingData.usage.platforms.percentage, billingData.usage.platforms.hasReachedLimit) === 'amber' ? 
                    'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(billingData.usage.platforms.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
            <p className="text-sm text-gray-500">Manage your plan and billing information</p>
          </div>
          {billingData.user.currentPlan === 'FREE' ? (
            <Button 
              onClick={() => handleUpgrade('CREATOR')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Upgrade Plan
            </Button>
          ) : (
            <Button variant="outline">Change Plan</Button>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="px-3 py-1 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
                  {billingData.user.currentPlan} PLAN
                </Badge>
                {billingData.user.currentPlan !== 'FREE' && (
                  <span className="text-xl font-bold text-gray-900">
                    {billingData.planLimits.priceDisplay}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">
                Member since {billingData.user.memberSince}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Zap className="w-3 h-3 text-amber-500" />
                  {billingData.planLimits.aiGenerations} AI generations
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Send className="w-3 h-3 text-blue-500" />
                  {billingData.planLimits.posts} posts/month
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Globe className="w-3 h-3 text-purple-500" />
                  {billingData.planLimits.platforms} platforms
                </span>
                {billingData.planLimits.scheduling && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-3 h-3 text-green-500" />
                    Scheduling
                  </span>
                )}
                {billingData.planLimits.analytics && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <BarChart className="w-3 h-3 text-indigo-500" />
                    Analytics
                  </span>
                )}
              </div>
            </div>
            
            {billingData.nextBillingDate && (
              <div className="lg:text-right">
                <p className="text-sm text-gray-500 mb-1">Next billing date</p>
                <p className="font-medium text-gray-900 text-lg">{formatDate(billingData.nextBillingDate)}</p>
                <p className="text-xs text-gray-500 mt-1">Auto-renews monthly</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Method</h4>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  No payment method on file
                </p>
                <p className="text-sm text-gray-500">Add a payment method to upgrade your plan</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Add Payment Method
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upgrade Your Plan</h3>
          <p className="text-sm text-gray-500 mt-1">Choose the perfect plan for your needs</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-xl p-6 relative transition-all ${
                plan.current ? 'border-blue-500 border-2 shadow-sm' : 'border-gray-200'
              } ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-white text-green-600 text-xs font-medium rounded-full border border-green-300">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    CURRENT PLAN
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6 pt-4">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.priceDisplay}
                    {plan.price > 0 && (
                     <span className="text-sm font-normal text-gray-500 ml-1">
                      +18% GST
                     </span>
                    )}
                  </span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations && plan.limitations.length > 0 && (
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-gray-700">Limitations:</p>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-red-500">•</span>
                      {limitation}
                    </div>
                  ))}
                </div>
              )}

              <Button 
                onClick={() => handleUpgrade(plan.id)}
                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                variant={plan.current ? 'outline' : plan.popular ? 'default' : 'outline'}
                disabled={plan.current || isUpgrading}
              >
                {isUpgrading && plan.id === selectedPlan ? (
                  'Processing...'
                ) : plan.current ? (
                  'Current Plan'
                ) : (
                  `Upgrade to ${plan.name}`
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">What happens when I upgrade?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• New limits take effect immediately</li>
                <li>• You can downgrade at any time</li>
                <li>• We follow no <span className="font-semibold">refund policy</span> for any of our plans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Invoice History</h3>
          <p className="text-sm text-gray-500 mt-1">View and download your previous invoices</p>
        </div>
        
        {billingData.invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Invoice #</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Plan</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingData.invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
                      <p className="text-sm text-gray-500 mt-1">{invoice.description}</p>
                    </td>
                    <td className="py-4 text-gray-700">{formatDate(invoice.date)}</td>
                    <td className="py-4 font-medium text-gray-900">{formatCurrency(invoice.amount)}</td>
                    <td className="py-4">
                      <Badge variant="outline" className="text-xs">
                        {invoice.plan}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No invoices yet</h3>
            <p className="text-gray-500">Your invoice history will appear here after your first payment</p>
          </div>
        )}
      </div>
    </div>
  )
}
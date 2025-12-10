"use client"

import React, { useState } from 'react'
import { 
  CreditCard, Check, Download, ArrowRight,
  Zap, Send, Globe, Calendar, BarChart,
  Info, CheckCircle, FileText, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showChangePlanDialog, setShowChangePlanDialog] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
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

  const handleDowngrade = async (planId: string) => {
    if (planId === billingData.user.currentPlan || isUpgrading) return
    
    setIsUpgrading(true)
    setSelectedPlan(planId)
    try {
      const response = await axios.post('/api/dashboard/billing/change-plan', { newPlan: planId })
      if (response.data.success) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error downgrading plan:', error)
      alert('Failed to downgrade plan')
    } finally {
      setIsUpgrading(false)
    }
  }

  const getPlanHierarchy = (plan: string) => {
    switch (plan) {
      case 'FREE': return 0;
      case 'CREATOR': return 1;
      case 'PREMIUM': return 2;
      default: return 0;
    }
  }

  const isUpgradePath = (newPlan: string) => {
    return getPlanHierarchy(newPlan) > getPlanHierarchy(billingData.user.currentPlan)
  }

  const handleUpgrade = async (planId: string) => {
    if (planId === billingData.user.currentPlan || isUpgrading) return
    
    const isUpgrade = isUpgradePath(planId)
    
    if (!isUpgrade) {
      await handleDowngrade(planId)
      return
    }
    
    setIsUpgrading(true)
    try {
      const response = await axios.post('/api/dashboard/billing/buy', {
        planId,
        price: getPlanPrice(planId)
      })

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

  const handleDownloadInvoice = (invoiceNumber: string) => {
    const invoice = billingData.invoices.find(inv => inv.invoiceNumber === invoiceNumber)
    if (!invoice) return

    const issuedOn = formatDate(new Date(invoice.date))
    const amountLabel = formatCurrency(invoice.amount)
    const amountText = `${amountLabel}`
    const website = 'Zyvarin Social'
    const supportEmail = 'support@zyvarin.com'
    const accent: [number, number, number] = [42, 63, 206]

    const doc = new jsPDF()

    doc.setFillColor(...accent)
    doc.rect(0, 0, 210, 32, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.text(website, 20, 20)
    doc.setFontSize(10)
    doc.text('Professional Invoice', 20, 27)

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 20, 46)
    doc.text(`Date: ${issuedOn}`, 20, 54)
    doc.text(`Plan: ${invoice.plan}`, 20, 62)
    doc.setTextColor(90, 90, 90)
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 70)
    doc.setTextColor(0, 0, 0)

    doc.setFontSize(12)
    doc.text('Bill To', 140, 46)
    doc.setFontSize(11)
    doc.text(billingData.user.name, 140, 54)
    doc.text(billingData.user.email, 140, 62)
    doc.setDrawColor(...accent)
    doc.roundedRect(136, 40, 60, 30, 2, 2)
    doc.setDrawColor(0, 0, 0)

    autoTable(doc, {
      startY: 82,
      head: [['Description', 'Qty', 'Amount']],
      body: [[`${invoice.description} (${invoice.plan})`, '1', amountText]],
      styles: { fontSize: 11 },
      headStyles: { fillColor: [42, 63, 206], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 110 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 40, halign: 'right' }
      }
    })

    const afterTableY = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(12)
  doc.text('Subtotal:', 150, afterTableY)
  doc.text(amountText, 190, afterTableY, { align: 'right' })
  doc.setTextColor(90, 90, 90)
  doc.text('Total Due (INR):', 150, afterTableY + 8)
  doc.setFontSize(13)
  doc.setTextColor(...accent)
  doc.text(amountText, 190, afterTableY + 8, { align: 'right' })
  doc.setTextColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Thank you for choosing ${website}.`, 20, afterTableY + 16)
    doc.text(`Need help? ${supportEmail}`, 20, afterTableY + 24)

    doc.save(`invoice-${invoice.invoiceNumber}.pdf`)
  }

  const handleCancelSubscription = async () => {
    setIsCanceling(true)
    try {
      const response = await axios.post('/api/dashboard/billing/cancel')
      if (response.data.success) {
        router.refresh()
        setShowCancelDialog(false)
      }
    } catch (error) {
      console.error('Error canceling subscription:', error)
      alert('Failed to cancel subscription')
    } finally {
      setIsCanceling(false)
    }
  }

  const handleChangePlan = async (newPlan: string) => {
    if (newPlan === billingData.user.currentPlan) return
    
    setIsChanging(true)
    setSelectedPlan(newPlan)
    try {
      const response = await axios.post('/api/dashboard/billing/change-plan', { newPlan })
      if (response.data.success) {
        router.refresh()
        setShowChangePlanDialog(false)
      }
    } catch (error) {
      console.error('Error changing plan:', error)
      alert('Failed to change plan')
    } finally {
      setIsChanging(false)
    }
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
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h2>
        <p className="text-center text-gray-600 mb-6 px-4">
          Your plan has been upgraded successfully.
        </p>
        <Button onClick={() => router.refresh()}>
          Go to Dashboard
        </Button>
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
            <Button 
              variant="outline"
              onClick={() => setShowChangePlanDialog(true)}
            >
              Change Plan
            </Button>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="px-3 py-1 bg-blue-100 text-blue-800">
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
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="text-sm text-gray-600">
                  {billingData.planLimits.aiGenerations} AI generations
                </span>
                <span className="text-sm text-gray-600">
                  {billingData.planLimits.posts} posts/month
                </span>
                <span className="text-sm text-gray-600">
                  {billingData.planLimits.platforms} platforms
                </span>
                {billingData.planLimits.scheduling && (
                  <span className="text-sm text-gray-600">Scheduling</span>
                )}
                {billingData.planLimits.analytics && (
                  <span className="text-sm text-gray-600">Analytics</span>
                )}
              </div>
            </div>
            
            {billingData.nextBillingDate && (
              <div className="lg:text-right">
                <p className="text-sm text-gray-500 mb-1">Next billing date</p>
                <p className="font-medium text-gray-900">{formatDate(billingData.nextBillingDate)}</p>
              </div>
            )}
          </div>
        </div>

        {billingData.user.currentPlan !== 'FREE' && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Subscription Actions</h4>
                <p className="text-sm text-gray-500 mt-1">Manage your active subscription</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setShowCancelDialog(true)}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        )}
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
              className={`border rounded-lg p-6 relative ${
                plan.current ? 'border-blue-600 border-2' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                    POPULAR
                  </span>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded">
                    CURRENT
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6 pt-4">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.priceDisplay}</span>
                  {plan.price > 0 && (
                    <span className="text-sm text-gray-500 ml-1">+18% GST</span>
                  )}
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => handleUpgrade(plan.id)}
                className="w-full"
                variant={plan.current ? 'outline' : 'default'}
                disabled={plan.current || isUpgrading}
              >
                {isUpgrading && plan.id === selectedPlan ? (
                  'Processing...'
                ) : plan.current ? (
                  'Current Plan'
                ) : isUpgradePath(plan.id) ? (
                  `Upgrade to ${plan.name}`
                ) : (
                  `Downgrade to ${plan.name}`
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Important</h4>
              <p className="text-sm text-gray-600">
                New limits take effect immediately. No refunds are provided for any plans.
              </p>
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
                        onClick={() => handleDownloadInvoice(invoice.invoiceNumber)}
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

      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Subscription</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You will be moved to the FREE plan.
            </p>
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowCancelDialog(false)}
                disabled={isCanceling}
              >
                Keep Subscription
              </Button>
              <Button 
                onClick={handleCancelSubscription}
                disabled={isCanceling}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isCanceling ? 'Canceling...' : 'Yes, Cancel'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showChangePlanDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Change Plan</h3>
              <button 
                onClick={() => setShowChangePlanDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {plans.filter(p => p.id !== billingData.user.currentPlan).map((plan) => (
                <div 
                  key={plan.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer"
                  onClick={() => handleChangePlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{plan.name}</h4>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">{plan.priceDisplay}</p>
                      <p className="text-xs text-gray-500">{plan.period}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {plan.features.slice(0, 3).map((feature, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <Info className="w-4 h-4 inline mr-1" />
                Plan changes take effect immediately. Your billing will be adjusted accordingly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'FREE',
    price: 0,
    period: 'forever',
    description: 'Perfect for individuals getting started with social media',
    icon: Sparkles,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    features: [
      '15 AI generations per month',
      '5 posts per month',
      'Connect up to 2 platforms',
      'Basic analytics',
      'Email support',
    ],
    limitations: [
      'No post scheduling',
      'Limited platform connections',
    ],
  },
  {
    name: 'CREATOR',
    price: 499,
    period: 'month',
    description: 'Ideal for creators and influencers building their brand',
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    popular: true,
    features: [
      '40 AI generations per month',
      '20 posts per month',
      'Connect up to 4 platforms',
      'Advanced scheduling',
      'Full analytics dashboard',
      'Priority email support',
      'Content calendar view',
    ],
    limitations: [],
  },
  {
    name: 'PREMIUM',
    price: 999,
    period: 'month',
    description: 'For businesses and teams managing multiple brands',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    features: [
      '120 AI generations per month',
      '40 posts per month',
      'Connect up to 6 platforms',
      'Advanced scheduling',
      'Full analytics dashboard',
      'Priority support (24/7)',
      'Team collaboration (3 members)',
      'Custom branding options',
      'API access',
    ],
    limitations: [],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const router = useRouter();

  const handleSelectPlan = (planName: string) => {
    if (planName === 'FREE') {
      router.push('/signup');
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="w-full bg-white">
      <Navbar />

      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your social media needs. Start free, upgrade anytime.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const yearlyPrice = Math.round(plan.price * 12 * 0.8);

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 ${plan.borderColor} ${
                  plan.popular ? 'shadow-xl scale-105' : 'shadow-md'
                } bg-white p-8 transition-all hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl ${plan.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${plan.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div className="text-4xl font-bold text-slate-900">Free</div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-slate-900">
                        ₹{billingCycle === 'monthly' ? plan.price : Math.round(yearlyPrice / 12)}
                        <span className="text-lg text-slate-600 font-normal">/month</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-600 mt-1">
                          ₹{yearlyPrice} billed annually
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full h-12 mb-6 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.price === 0 ? 'Start Free' : 'Get Started'}
                </Button>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-slate-900 mb-3">What's included:</div>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="text-sm font-semibold text-slate-500 mb-3">Not included:</div>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-3 opacity-60">
                          <span className="text-slate-500 text-sm">• {limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-20 bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 mt-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-slate-600 text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What happens when I reach my limits?</h3>
              <p className="text-slate-600 text-sm">
                You'll be notified when approaching limits. You can upgrade your plan or wait for the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Do you offer refunds?</h3>
              <p className="text-slate-600 text-sm">
                Yes, we offer a 14-day money-back guarantee on all paid plans. No questions asked.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Which platforms are supported?</h3>
              <p className="text-slate-600 text-sm">
                Currently we support LinkedIn, Twitter/X, and Dev.to. More platforms coming soon!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

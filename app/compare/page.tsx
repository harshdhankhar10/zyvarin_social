'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, X } from 'lucide-react';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const comparisonData = [
  {
    category: 'Core Scheduling',
    features: [
      { name: 'Multi-platform scheduling', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'Calendar view', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'Bulk upload', zyvarin: true, buffer: false, hootsuite: true, later: true },
      { name: 'Content library', zyvarin: true, buffer: true, hootsuite: true, later: true }
    ]
  },
  {
    category: 'AI & Suggestions',
    features: [
      { name: 'AI content suggestions', zyvarin: true, buffer: true, hootsuite: false, later: false },
      { name: 'Caption generation', zyvarin: true, buffer: false, hootsuite: false, later: false },
      { name: 'Best time to post', zyvarin: true, buffer: true, hootsuite: true, later: true }
    ]
  },
  {
    category: 'Analytics',
    features: [
      { name: 'Basic analytics', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'Advanced insights', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'ROI tracking', zyvarin: true, buffer: false, hootsuite: false, later: false },
      { name: 'Competitor analysis', zyvarin: false, buffer: false, hootsuite: true, later: true }
    ]
  },
  {
    category: 'Team & Collaboration',
    features: [
      { name: 'Team members', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'Approval workflows', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'Role-based access', zyvarin: true, buffer: true, hootsuite: true, later: true }
    ]
  },
  {
    category: 'Pricing & Value',
    features: [
      { name: 'Free tier available', zyvarin: true, buffer: true, hootsuite: true, later: true },
      { name: 'Per-post pricing', zyvarin: false, buffer: true, hootsuite: false, later: false },
      { name: 'Transparent pricing', zyvarin: true, buffer: true, hootsuite: false, later: false },
      { name: 'Money-back guarantee', zyvarin: true, buffer: false, hootsuite: false, later: false }
    ]
  }
];

const competitors = [
  { name: 'Zyvarin', color: 'bg-blue-50', highlight: true },
  { name: 'Buffer', color: 'bg-white', highlight: false },
  { name: 'Hootsuite', color: 'bg-white', highlight: false },
  { name: 'Later', color: 'bg-white', highlight: false }
];

export default function ComparePage() {
  return (
    <div className="w-full bg-white">
      <Navbar />

      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Why Creators Choose <span className='text-accent'>Zyvarin</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Simple, powerful, and built specifically for creators. See how Zyvarin compares to the rest.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            <Check className="w-4 h-4" />
            4.8★ rating on ProductHunt (450+ reviews)
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {comparisonData.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 px-4 bg-slate-50 py-4 -mx-4">{section.category}</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-bold text-slate-900 w-1/3">Feature</th>
                      {competitors.map((comp, idx) => (
                        <th key={idx} className={`text-center py-4 px-4 font-semibold ${comp.highlight ? 'bg-blue-50 text-blue-900' : 'text-slate-700'}`}>
                          {comp.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {section.features.map((feature, featureIdx) => (
                      <tr key={featureIdx} className="hover:bg-slate-50">
                        <td className="py-4 px-4 font-semibold text-slate-900">{feature.name}</td>
                        <td className={`text-center py-4 px-4 ${feature.zyvarin ? 'bg-blue-50' : ''}`}>
                          {feature.zyvarin ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {feature.buffer ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {feature.hootsuite ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {feature.later ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-slate-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Why Zyvarin is Different</h2>
          
          <div className="space-y-6">
            {[
              {
                title: '✨ Obsessively Simple',
                description: 'No complex menus or steep learning curve. If it\'s not essential, we remove it. You\'ll be scheduling posts in minutes, not hours.'
              },
              {
                title: '🎯 Built for Creators',
                description: 'Not designed for enterprise, then downgraded for creators. Built from day one with your needs in mind. Every feature is requested by creators, not imposed by us.'
              },
              {
                title: '🤖 Smart AI',
                description: 'Google Gemini-powered caption generation and content suggestions that actually work. Not generic, not overwhelming—just helpful.'
              },
              {
                title: '💰 Transparent Pricing',
                description: 'No per-platform surcharges. No feature locked behind paywalls. One simple price for everything. 14-day free trial, 30-day money-back guarantee.'
              },
              {
                title: '🚀 Built by a Solo Creator',
                description: 'I run Zyvarin alone. That means fast decisions, quick bug fixes, and genuine care about your success. You\'re not a ticket number.'
              },
              {
                title: '📱 Multi-Platform Master',
                description: 'LinkedIn, Twitter/X, Dev.to, and more coming soon. Schedule once, post everywhere. No platform limitations.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Quick Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Choose Zyvarin if...</h3>
              <ul className="space-y-2">
                {[
                  'You want simplicity over features',
                  'You care about price transparency',
                  'You need AI-powered suggestions',
                  'You value creator support',
                  'You want multi-platform scheduling',
                  'You want rapid feature development'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-blue-900">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Choose competitors if...</h3>
              <ul className="space-y-2">
                {[
                  'You need advanced competitor analysis',
                  'You need per-post pay-as-you-go pricing',
                  'You require extensive enterprise features',
                  'You want established brand recognition',
                  'You need heavy API integrations',
                  'You operate at massive scale (1000+ posts/day)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-slate-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Try Zyvarin free for 14 days. No credit card required. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="group w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                Questions? Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

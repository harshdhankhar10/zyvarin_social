'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Briefcase, Rocket, Building2, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const useCases = [
  {
    icon: '✨',
    title: 'Solo Creators',
    subtitle: 'Content Creators & Influencers',
    description: 'Creators who want to build their audience without spending hours on social media logistics.',
    benefits: [
      'Schedule 1 month of content in 30 minutes',
      'Get AI-powered content suggestions',
      'Track what content works best',
      'Grow faster with less time investment'
    ],
    stats: '5,000+ solo creators',
    cta: 'Start Creating'
  },
  {
    icon: '🤝',
    title: 'Agencies',
    subtitle: 'Social Media Agencies',
    description: 'Agencies managing multiple client accounts with complex approval workflows and team collaboration.',
    benefits: [
      'Manage unlimited client accounts',
      'Team collaboration with approval workflows',
      'Centralized reporting and analytics',
      'White-label ready for your clients'
    ],
    stats: '150+ agencies',
    cta: 'Contact Sales'
  },
  {
    icon: '🚀',
    title: 'Startups',
    subtitle: 'Bootstrapped & Growth Stage',
    description: 'Early-stage companies building their brand and community on a limited budget.',
    benefits: [
      'Affordable pricing that scales with you',
      'Cross-platform scheduling',
      'Built-in analytics to optimize ROI',
      'Dedicated support when you need it'
    ],
    stats: '2,000+ startups',
    cta: 'Try Free'
  },
  {
    icon: '🏢',
    title: 'Enterprises',
    subtitle: 'Large Organizations',
    description: 'Enterprises with complex compliance requirements, multiple teams, and high-volume posting needs.',
    benefits: [
      'SSO and advanced security controls',
      'Custom integrations',
      'Dedicated account manager',
      'SLA with 99.5% uptime guarantee'
    ],
    stats: '50+ enterprises',
    cta: 'Contact Sales'
  }
];

export default function UseCasesPage() {
  return (
    <div className="w-full bg-white">
      <Navbar />

      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Built for Every Creator Type
          </h1>
          <p className="text-xl text-slate-600">
            Whether you're a solo creator, agency, startup, or enterprise—Zyvarin scales with you.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{useCase.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{useCase.subtitle}</p>
                <p className="text-slate-600 mb-6 leading-relaxed">{useCase.description}</p>
                
                <div className="mb-6 space-y-3 border-t border-slate-200 pt-6">
                  {useCase.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">{useCase.stats}</span>
                  <Link href="/signup">
                    <Button variant="default" size="sm">
                      {useCase.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Features by Use Case</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Solo Creators</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Agencies</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Startups</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Enterprises</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { feature: 'Multi-platform scheduling', solo: true, agency: true, startup: true, enterprise: true },
                  { feature: 'AI content suggestions', solo: true, agency: true, startup: true, enterprise: true },
                  { feature: 'Team collaboration', solo: false, agency: true, startup: true, enterprise: true },
                  { feature: 'Client management', solo: false, agency: true, startup: false, enterprise: true },
                  { feature: 'Advanced analytics', solo: true, agency: true, startup: true, enterprise: true },
                  { feature: 'API access', solo: false, agency: true, startup: true, enterprise: true },
                  { feature: 'SSO integration', solo: false, agency: false, startup: false, enterprise: true },
                  { feature: 'Dedicated support', solo: false, agency: true, startup: false, enterprise: true }
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 px-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="text-center py-4 px-4">{row.solo ? '✓' : '—'}</td>
                    <td className="text-center py-4 px-4">{row.agency ? '✓' : '—'}</td>
                    <td className="text-center py-4 px-4">{row.startup ? '✓' : '—'}</td>
                    <td className="text-center py-4 px-4">{row.enterprise ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Success Stories</h2>
          <p className="text-lg text-slate-600 mb-12">
            Hear from creators, agencies, and companies that are using Zyvarin to save time and grow their audience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'Sarah Chen', role: 'Content Creator', quote: '"Saved me 20 hours per month. Game changer."' },
              { name: 'Marcus Johnson', role: 'Agency Owner', quote: '"Managing 50 client accounts is now effortless."' },
              { name: 'Elena Rodriguez', role: 'Startup Founder', quote: '"Best tool for our budget and scale."' }
            ].map((story, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <p className="text-slate-600 italic mb-4">{story.quote}</p>
                <p className="font-semibold text-slate-900">{story.name}</p>
                <p className="text-sm text-slate-500">{story.role}</p>
              </div>
            ))}
          </div>

          <Link href="/contact">
            <Button size="lg" variant="outline">
              Read More Stories
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Fit?</h2>
          <p className="text-xl text-slate-300 mb-8">
            No matter your use case, Zyvarin has everything you need to succeed on social media.
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
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

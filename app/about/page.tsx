import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {

  const stats = [
    { number: '50K+', label: 'Creators Using Zyvarin' },
    { number: '2.3M+', label: 'Posts Scheduled Monthly' },
    { number: '4.8★', label: 'Average Rating' },
    { number: '99.5%', label: 'Uptime' },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Creator-First',
      description: 'Every feature built with creators in mind. Your feedback shapes our roadmap.'
    },
    {
      icon: '⚡',
      title: 'Speed & Simplicity',
      description: 'Fast, intuitive, no learning curve. Get scheduling in seconds, not hours.'
    },
    {
      icon: '🔒',
      title: 'Trust & Security',
      description: 'SOC 2 Type II certified. Your data is encrypted and protected like our own.'
    },
    {
      icon: '🌱',
      title: 'Long-term Thinking',
      description: 'Bootstrapped and profitable. Building for creators, not investors.'
    }
  ]

  const timeline = [
    {
      year: '2023',
      title: 'The Idea',
      description: 'I was manually scheduling posts every Sunday. Wasted hours copying and pasting. I thought: "There has to be a better way."'
    },
    {
      year: '2023 Oct',
      title: 'The First Weekend',
      description: 'Built the first version in 48 hours. No UI/UX polish, just raw functionality. Shared with Twitter: got 100 beta signups overnight.'
    },
    {
      year: '2024 Q1',
      title: 'Multi-Platform',
      description: 'Added LinkedIn and Twitter integrations. Users started saving 15-20 hours per month. The feedback was incredible.'
    },
    {
      year: '2024 Q2',
      title: 'AI & Polish',
      description: 'Integrated Google Gemini for smart suggestions. Redesigned the entire UI. Hit 10K users, many becoming loyal advocates.'
    },
    {
      year: '2024 Q3',
      title: 'Going Serious',
      description: 'Got SOC 2 Type II certified. Added analytics, advanced scheduling, Dev.to support. 25K creators trusting Zyvarin daily.'
    },
    {
      year: '2024 Q4',
      title: 'Scale Mode',
      description: 'Optimized everything. Now handling 2.3M scheduled posts monthly. 50K creators managing their social with Zyvarin.'
    },
    {
      year: '2025+',
      title: 'The Mission',
      description: 'Goal: Help 1 million creators reclaim their time and grow their audience. Building automations, advanced analytics, and more.'
    }
  ]

  return (
    <div className="w-full bg-white">
      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Built by One Creator, for All Creators
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Hi, I'm Harsh. I built Zyvarin because I was tired of wasting hours on repetitive social media tasks. 
            Now 50K+ creators are using it to reclaim their time and grow their audience.
          </p>
          <p className="text-lg text-slate-500">
            This is the story of Zyvarin and why it exists.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Why I Built This</h2>
          
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              In 2023, I was spending every Sunday evening manually scheduling posts across LinkedIn and Twitter. 
              Copy, paste, schedule, repeat. Three hours every week, just gone. And the tools that existed felt either too complicated 
              (Hootsuite, Buffer) or missing critical features.
            </p>
            
            <p>
              So I did what any frustrated creator would do—I built what I needed. First version took a weekend. 
              It was ugly, buggy, and incomplete. But it saved me time. I shared it on Twitter as a joke, 
              and within 24 hours, 100 people wanted access.
            </p>

            <p>
              That's when I realized: millions of creators are wasting time on this same problem. 
              They have incredible content to create, audiences to build, and businesses to grow. 
              But instead, they're manually scheduling posts across multiple platforms.
            </p>

            <p>
              <strong>Zyvarin exists to give that time back. To make social media management effortless, 
              so creators can focus on what they do best—creating amazing content.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Core Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">I Build Zyvarin Solo</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <p className="text-lg text-slate-700 mb-6">
              I'm a solo creator building this full-time. Everything from code to design to customer support—I do it. 
              This means:
            </p>
            
            <ul className="space-y-3">
              {[
                'Decisions are fast. No meetings, no bureaucracy.',
                'I respond to your feedback in hours, not weeks.',
                'Every feature is built because creators asked for it.',
                'No bloated features nobody uses. Just what matters.',
                'I care deeply because this is my life\'s work.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-slate-600 text-lg">
            I'm not trying to build a unicorn or sell to the highest bidder. I'm building a tool that creators love, 
            that's profitable, and that I can maintain for the next 10 years. That's the dream.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">The Journey</h2>

          <div className="space-y-8">
            {timeline.map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-slate-400 mt-2"></div>
                  {i < timeline.length - 1 && <div className="w-1 h-24 bg-slate-200 mt-3"></div>}
                </div>
                <div className="pb-4">
                  <span className="inline-block bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                  <p className="text-slate-600 max-w-2xl">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">What's Next</h2>
          
          <p className="text-lg text-slate-600 mb-8">
            In 2025, I'm focused on:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Smarter AI', desc: 'Better content suggestions powered by advanced models' },
              { title: 'Deep Analytics', desc: 'Real insights that help you grow faster' },
              { title: 'Automation', desc: 'Schedule posts based on audience engagement patterns' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 mb-8">
            And always listening to what creators need. That's how Zyvarin will become the best social media tool in the world.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Save Hours on Social Media?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 50K+ creators using Zyvarin to schedule, grow, and succeed on social media.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="group w-full sm:w-auto">
                Start Free (14 Days)
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

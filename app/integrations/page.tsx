import React from 'react'
import { CheckCircle2, Zap, Shield, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const IntegrationsPage = () => {
  const integrations = [
    {
      name: 'LinkedIn',
      icon: 'in',
      bg: 'bg-[#0A66C2]',
      description: 'Connect your LinkedIn profile to share professional updates and engage with your network.',
      features: [
        'Post text updates with up to 3,000 characters',
        'Upload images and media',
        'OAuth 2.0 secure authentication',
        'Automatic token refresh',
        'Schedule posts for optimal engagement'
      ],
      status: 'active'
    },
    {
      name: 'Twitter/X',
      icon: '𝕏',
      bg: 'bg-foreground',
      description: 'Share quick updates and engage with your audience on X (formerly Twitter).',
      features: [
        'Post tweets up to 280 characters',
        'Thread support coming soon',
        'OAuth 2.0 secure authentication',
        'Automatic token refresh',
        'Real-time posting'
      ],
      status: 'active'
    },
    {
      name: 'Dev.to',
      icon: 'DEV',
      bg: 'bg-foreground',
      description: 'Publish technical articles and engage with the developer community.',
      features: [
        'Publish full articles with markdown',
        'Add tags and cover images',
        'API key authentication',
        'Draft and publish modes',
        'Community reach for developers'
      ],
      status: 'active'
    }
  ]

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Official APIs',
      description: 'Direct integration with official platform APIs for maximum reliability'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Authentication',
      description: 'OAuth 2.0 and encrypted credentials keep your accounts safe'
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Auto Token Refresh',
      description: 'Automatic token management ensures uninterrupted posting'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-20">
        <div className="text-center mb-16">
          <div className="badge-mint mb-6 inline-flex">
            <span className="w-2 h-2 rounded-full bg-mint-dark" />
            Integrations
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground mb-6 tracking-tight">
            Connect your
            <br />
            <span className="italic">favorite platforms</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Seamlessly integrate with the platforms you use every day. Official APIs, secure authentication, and automatic token management.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="card-soft p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-mint-soft flex items-center justify-center text-mint-dark mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-serif text-foreground mb-8 text-center">Available Integrations</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="card-soft p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${integration.bg} ${integration.name === 'LinkedIn' ? 'text-white' : 'text-primary-foreground'} flex items-center justify-center font-bold text-2xl`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{integration.name}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mint-dark">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {integration.description}
                </p>

                <div className="space-y-3 mb-6">
                  {integration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-mint-dark mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/connect-accounts">
                  <Button className="w-full">
                    Connect {integration.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft p-12 text-center">
          <h2 className="text-3xl font-serif text-foreground mb-4">More platforms coming soon</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly adding new integrations based on user feedback. Have a platform you'd like to see? Let us know!
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Request an Integration
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default IntegrationsPage

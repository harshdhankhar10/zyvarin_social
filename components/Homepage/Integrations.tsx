import React from 'react'
import { CheckCircle2, ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';



const Integrations = () => {
      const platforms = [
    { name: "LinkedIn", icon: "in", bg: "bg-[#0A66C2]", text: "text-white" },
    { name: "Twitter/X", icon: "𝕏", bg: "bg-foreground", text: "text-primary-foreground" },
    { name: "Dev.to", icon: "DEV", bg: "bg-foreground", text: "text-primary-foreground" },
  ];

    const features = [
    "Official OAuth 2.0 integrations—no browser extensions or workarounds",
    "Real-time connection monitoring with automatic token refresh",
    "Platform-specific content optimization and character limit handling",
    "Cross-posting with intelligent scheduling per platform",
    ];


  return (
    <>
      <section className="py-16">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="badge-mint mb-6">
              <span className="w-2 h-2 rounded-full bg-mint-dark" />
              Integrations
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 tracking-tight">
              Every platform,
              <br />
              <span className="italic">one command center.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Connect all your social accounts in minutes. We integrate directly with official APIs—no 
              sketchy workarounds or browser extensions that break every other week.
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-mint-dark mt-0.5 flex-shrink-0" />
                  <span className="text-foreground leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/integrations">
              <Button size="lg" className="group">
                View all integrations
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="aspect-square card-soft flex flex-col items-center justify-center gap-3 cursor-pointer group hover:shadow-lg transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-xl ${platform.bg} ${platform.text} flex items-center justify-center font-bold text-lg`}>
                    {platform.icon}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium text-center px-1">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              More integrations coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Integrations
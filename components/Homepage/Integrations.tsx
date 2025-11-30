import React from 'react'
import { CheckCircle2, ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";



const Integrations = () => {
      const platforms = [
    { name: "Twitter/X", icon: "𝕏", bg: "bg-foreground", text: "text-primary-foreground" },
    { name: "LinkedIn", icon: "in", bg: "bg-[#0A66C2]", text: "text-white" },
    { name: "Instagram", icon: "📷", bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]", text: "text-white" },
    { name: "Facebook", icon: "f", bg: "bg-[#1877F2]", text: "text-white" },
    { name: "TikTok", icon: "♪", bg: "bg-foreground", text: "text-primary-foreground" },
    { name: "YouTube", icon: "▶", bg: "bg-[#FF0000]", text: "text-white" },
    { name: "Pinterest", icon: "P", bg: "bg-[#E60023]", text: "text-white" },
    { name: "Medium", icon: "M", bg: "bg-foreground", text: "text-primary-foreground" },
    { name: "Threads", icon: "@", bg: "bg-foreground", text: "text-primary-foreground" },
    { name: "Mastodon", icon: "M", bg: "bg-[#6364FF]", text: "text-white" },
    { name: "Bluesky", icon: "☁", bg: "bg-[#1185FE]", text: "text-white" },
    { name: "Substack", icon: "S", bg: "bg-[#FF6719]", text: "text-white" },
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

            <Button size="lg" className="group">
              View all integrations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          <div>
            <div className="grid grid-cols-4 gap-4">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="aspect-square card-soft flex flex-col items-center justify-center gap-3 cursor-pointer group"
                >
                  <div className={`w-11 h-11 rounded-xl ${platform.bg} ${platform.text} flex items-center justify-center font-bold text-lg `}>
                    {platform.icon}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium text-center px-1">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              + 15 more platforms with new integrations added monthly
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Integrations
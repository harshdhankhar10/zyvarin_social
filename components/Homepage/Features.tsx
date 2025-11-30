import Image from 'next/image';
import React from 'react';
import { FileText, Send, Wand2, CheckCircle2 } from 'lucide-react';


const Features = () => {
      const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Create your content",
      description: "Write your message once in our intuitive editor. Add images, links, and hashtags. No platform-specific formatting needed.",
      details: ["Rich text editor", "Media library", "Template system"],
    },
    {
      icon: Wand2,
      step: "02",
      title: "AI optimizes for each platform",
      description: "Our AI automatically adapts your content. It adjusts length, tone, hashtags, and formatting for each platform's unique requirements.",
      details: ["Tone adjustment", "Character limits", "Hashtag optimization"],
    },
    {
      icon: Send,
      step: "03",
      title: "Review and publish",
      description: "Preview how your content will look on each platform. Make any final tweaks, then publish immediately or schedule for later.",
      details: ["Visual preview", "Smart scheduling", "Bulk publishing"],
    },
  ];

  return (
    <>
      <section id="features" className="py-24  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to ship.</h2>
            <p className="text-slate-500">Built by developers, for developers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            <div className="bento-card md:col-span-2 p-8 flex flex-col justify-between relative group bg-white rounded-2xl shadow-sm border border-slate-100">
              <Image
                width={1000}
                height={600}
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Neural Network" 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity rounded-2xl"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Context-Aware AI Models</h3>
                <p className="text-slate-500 max-w-md">We don't just summarize. Our prompt engineering ensures LinkedIn posts sound professional, Tweets stay within 280 chars, and Medium drafts are structured correctly.</p>
              </div>
              <div className="flex gap-2 relative z-10 mt-6">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium">Gemini 2.5 </span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium">GPT-4o</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium">Claude 3.5</span>
              </div>
            </div>

            <div className="bento-card p-8 flex flex-col justify-between bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 002 2zm6-9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V6a5 5 0 0110 0v2h1zm-6-5a3 3 0 00-3 3v2h6V6a3 3 0 00-3-3z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">OAuth 2.0 Security</h3>
                <p className="text-slate-500 text-sm">We never store your passwords. All connections use official API tokens, encrypted at rest.</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-green-600 text-xs font-bold uppercase">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                SOC2 Compliant
              </div>
            </div>

            <div className="bento-card p-0 flex flex-col relative group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 pb-0 z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Unified Analytics</h3>
                <p className="text-slate-500 text-sm">Track engagement across platforms in one dashboard.</p>
              </div>
              <div className="mt-auto h-40 bg-slate-50 w-full relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-8 pb-8 h-full gap-2">
                  <div className="w-full bg-purple-200 h-[40%] rounded-t-sm group-hover:h-[60%] transition-all duration-500"></div>
                  <div className="w-full bg-purple-300 h-[70%] rounded-t-sm group-hover:h-[85%] transition-all duration-500 delay-75"></div>
                  <div className="w-full bg-purple-500 h-[50%] rounded-t-sm group-hover:h-[90%] transition-all duration-500 delay-150"></div>
                  <div className="w-full bg-purple-400 h-[80%] rounded-t-sm group-hover:h-[95%] transition-all duration-500 delay-100"></div>
                </div>
              </div>
            </div>

            <div className="bento-card md:col-span-2 p-8 flex flex-col justify-center relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-purple-50 to-transparent"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.62 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Background Job Processing</h3>
                  <p className="text-slate-500">Our Node.js/Redis queue architecture handles API rate limits and retries automatically. Your UI stays snappy even when posting to 5 platforms simultaneously.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 w-full md:w-64">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                    <span className="text-xs font-mono text-slate-400">Queue Status</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[90%] animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>POST /api/publish</span>
                      <span>24ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

         <section className="">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-20">
         
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 tracking-tight">
            Three steps to effortless publishing.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've obsessed over every detail to make content distribution as simple as possible. 
            No learning curve, no complexity—just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">

              
              <div className="card-soft p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-lavender transition-colors">
                    <step.icon className="w-7 h-7 text-foreground/70 group-hover:text-lavender-dark transition-colors" />
                  </div>
                  <span className="text-5xl font-serif text-border group-hover:text-lavender-dark/30 transition-colors">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-mint-dark flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </>
  );
};

export default Features;
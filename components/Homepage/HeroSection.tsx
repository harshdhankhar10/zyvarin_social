

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
    <section className="relative pt-36 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender/40 via-background to-background" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-lavender-medium/30 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-mint-medium/20 rounded-full blur-3xl" />
      
      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="animate-fade-up-delay-1 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.08] tracking-tight mb-6">
            The smarter way to
            <br />
            <span className="italic">manage social media</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            Stop juggling multiple tools. Zyvarin brings scheduling, analytics, AI content generation, and team collaboration into one powerful platform trusted by over 50,000 businesses worldwide.
          </p>

          {/* <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"> */}
              {/* <Link href="/signup" prefetch = {true}>
                <Button size="xl" className="group w-full sm:w-auto shadow-lg hover-glow">
              Start your free trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
                </Link> */}
            {/* <Button variant="outline" size="xl" className="w-full sm:w-auto group">
              <Play className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
              Watch 2-min demo
            </Button> */}
          {/* </div> */}

          <p className="animate-fade-up-delay-4 -mt-4 text-sm text-muted-foreground">
            No credit card required • 100% free trial • Instant access
          </p>
        </div>

      
      </div>
    </section>
        <section id="problem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Content distribution is broken.</h2>
                <p className="text-lg text-slate-500">Why are you still copy-pasting and manually editing hashtags in {new Date().getFullYear()}?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 rounded-2xl p-8 border border-red-100 relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-red-200 text-9xl font-bold opacity-20 -rotate-12 select-none group-hover:scale-110 transition-transform">X</div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600"><i className="fas fa-times"></i></div>
                            <h3 className="text-xl font-bold text-slate-900">The Manual Grind</h3>
                        </div>
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex gap-3"><i className="fas fa-minus-circle text-red-400 mt-1"></i> Rewrite post 3 times for tone.</li>
                            <li className="flex gap-3"><i className="fas fa-minus-circle text-red-400 mt-1"></i> Log in/out of multiple tabs.</li>
                            <li className="flex gap-3"><i className="fas fa-minus-circle text-red-400 mt-1"></i> Forget to post on Medium entirely.</li>
                            <li className="flex gap-3"><i className="fas fa-minus-circle text-red-400 mt-1"></i> Inconsistent formatting and messaging.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100 relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-brand-200 text-9xl font-bold opacity-20 rotate-12 select-none group-hover:scale-110 transition-transform">✓</div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600"><i className="fas fa-check"></i></div>
                            <h3 className="text-xl font-bold text-slate-900">The Zyvarin Flow</h3>
                        </div>
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex gap-3"><i className="fas fa-check-circle text-brand-500 mt-1"></i> Write one "Source of Truth" draft.</li>
                            <li className="flex gap-3"><i className="fas fa-check-circle text-brand-500 mt-1"></i> AI generates native variants instantly.</li>
                            <li className="flex gap-3"><i className="fas fa-check-circle text-brand-500 mt-1"></i> One-click publish to all APIs.</li>
                            <li className="flex gap-3"><i className="fas fa-check-circle text-brand-500 mt-1"></i> Unified history and tracking.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  );
};

export default HeroSection;

import React from 'react';
import { User, Mail, Lock, ArrowRight, Github, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignUpPage = () => {
  return (
    <div className="min-h-screen w-full flex font-sans bg-white">
      
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" 
          style={{ backgroundImage: "url('https://images.pexels.com/photos/242616/pexels-photo-242616.jpeg?cs=srgb&dl=pexels-vedanti-66315-242616.jpg&fm=jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          <div>
            <Link href="/">
                <h1 className="text-4xl font-bold tracking-tight">Zyvarin.</h1>
              </Link>
          </div>
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Join the community of <br />
              <span className="text-indigo-400">high-leverage builders.</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed font-light">
              "Zyvarin transformed how we ship content. It's not just a tool, it's our entire distribution team in one dashboard."
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-slate-900" 
                    src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                    alt="User" 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-400">Trusted by 10,000+ creators</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
        
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Create an account
            </h2>
            <p className="text-slate-500">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <form className="space-y-5">
            
            <div className="relative group">
              <label className="sr-only">Full Name</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Input 
                type="text" 
                placeholder="Full Name" 
              />
            </div>

            <div className="relative group">
              <label className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Input 
                type="email" 
                placeholder="Email address" 
              />
            </div>

            <div className="relative group">
              <label className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Input
                type="password"
                placeholder="Password (8+ characters)"
              />
            </div>

            <div className="flex">
              <div className="flex  items-center h-5">
                <Input 
                  id="terms" 
                  type="checkbox" 
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-slate-500">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <Button 
                type="button"
              variant={"accent"} size={"lg"}
              className="w-full"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

 
          <div className="text-center mt-8">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/signin" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors ml-1">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
"use client";

import React, {useState} from 'react';
import { User, Mail, Lock, ArrowRight, Github, Check, Loader, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const router = useRouter();

  const saveEmailToLocalStorage = (email: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('signupEmail', email);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', {
        fullName,
        email,
        password,
      });
      if (response.status === 201) {
        setSuccess('Account created successfully! Redirecting...');
        saveEmailToLocalStorage(email);
        setTimeout(() => {
          router.push('/verify-email');
        }, 1500);
      }
    } catch (error:any) {
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

    const signInWithProvider = async (provider: string) => {
      setLoading(true);
      try {
        await signIn(provider, { callbackUrl: '/dashboard' });
      } catch (error:any) {
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
  

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
                  <Image
                    width={40}
                    height={40}
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

          <form className="space-y-5" onSubmit={handleSignUp}>
            {error && (
              <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
                {error} 
              </div>
            )}
            {success && (
              <div className="p-4 text-sm text-green-700 bg-green-100 rounded-md">
                {success}  
              </div>
            )}
            <div className="relative group">
              <label className="sr-only">Full Name</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex">
              <div className="flex  items-center h-5">
                <Input 
                  id="terms" 
                  type="checkbox" 
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)} 
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-slate-500">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <Button 
              
                type="submit"
              variant={"accent"} size={"lg"}
              className="w-full"
              disabled={loading || fullName.trim() === '' || email.trim() === '' || password.length < 8 || !isTermsAccepted}
            >
              {loading ? (<span className='flex items-center justify-center'>
                Creating Account <Loader className="w-4 h-4 animate-spin inline-block ml-2" />
              </span>) : (<span className="flex items-center justify-center gap-2">
                Create Account <ArrowRight className="w-4 h-4" /></span>)}
            </Button>
          </form>
           <div className="relative flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative z-10 bg-white px-3 text-sm text-slate-500">
              or continue with
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={() => signInWithProvider('google')}
             className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group">
            <svg height="24" width="24"
            viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
            </button>
            <button onClick={() => signInWithProvider('linkedin')}
             className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group ">
              <LinkedinIcon className="w-6 h-6 text-[#1DA1F2]" />
            </button>
            <button disabled onClick={() => signInWithProvider('github')} title="GitHub sign-in coming soon!"
            className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group hover:cursor-not-allowed opacity-50">
              <Github className="w-6 h-6 text-slate-900" />
            </button>
          </div>


 
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
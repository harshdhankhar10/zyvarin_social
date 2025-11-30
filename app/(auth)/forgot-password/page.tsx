"use client"
import React, {useState} from 'react';

import { Mail, Lock, ArrowRight, Twitter, Github, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="min-h-screen w-full flex">
      <div 
        className="hidden lg:flex w-1/2 bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
              <Link href="/">
                <h1 className="text-4xl font-bold tracking-tight">Zyvarin.</h1>
              </Link>
            <div className="max-w-md">
                <h2 className="text-3xl font-bold mb-2">
                  Forgot Your Password?
                </h2>
                <p className="text-lg text-slate-200 leading-relaxed font-medium mb-6">
                    Here are some tips for creating a strong password:
                </p>
                    <ul className="list-disc list-inside mt-2 text-slate-300 flex flex-col gap-1 font-semibold">
                      <li>Use a mix of uppercase and lowercase letters.</li>
                      <li>Include numbers and special characters.</li>
                      <li>
                        Password Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                      </li>
                      <li>Avoid using easily guessable information like birthdays or common words.</li>
                      <li>Make your password at least 8 characters long.</li>
                    </ul>
            </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                Reset Your Password
            </h2>
            <p className="text-slate-600">
                Enter your email address below and we'll send you an verification code to reset your password.
            </p>
          </div>

          <form className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
              />
            </div>

            <Button
              type="button" variant={"accent"} size={"lg"}
              className='w-full'
            >
                Send Verification OTP
               <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="relative flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative z-10 bg-white px-3 text-sm text-slate-500">
              or 
            </span>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-600">
              Want to try again?
              <Link href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors ml-1">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignInPage;
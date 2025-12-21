"use client"
import React, {useState} from 'react';

import { Mail, Lock, ArrowRight, Twitter, Github, Eye, EyeOff, Loader } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        const response =  await axios.post('/api/auth/forgot-password', { email });
        if (response.status === 200) {
        
          setSuccess('Verification OTP sent to your email.');
          setError('');
          setIsModalOpen(true);
        }
      } catch (error:any) {
        setError(error.response?.data?.error || 'An error occurred. Please try again.');
        setSuccess('');
      }finally {
        setLoading(false);
      }
    }

    const handleVerifyOtp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setSuccess('');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.patch('/api/auth/forgot-password', { email, otp, newPassword: password });
            if (response.status === 200) {
                setSuccess('OTP verified successfully. Redirecting to Sign In page...');
                setError('');
                setIsModalOpen(false);
                setTimeout(() => {
                  router.push('/signin');
                }, 3000);
            }
        } catch (error:any) {
            setError(error.response?.data?.error || 'An error occurred. Please try again.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    }


  return (
    <>
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
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 font-semibold rounded-lg" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
              {success}
            </div>
          )}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=""
                />
            </div>

            <Button
              type="submit" variant={"accent"} size={"lg"}
              className='w-full'
              onClick={handleSendOtp}
              disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send Verification OTP'}
               {loading ? <Loader className="ml-2 h-5 w-5 animate-spin" /> : <ArrowRight className="ml-2 h-5 w-5" />}
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

    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md">

        {error && ( 
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 font-semibold rounded-lg" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            {success}
          </div>
        )}

          <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
          <p className="mb-4">Enter the OTP sent to your email address.</p>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4"
          />
          <Input 
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <div className="relative mb-4">
            <Input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pr-10"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyOtp} disabled={loading || otp.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default SignInPage;
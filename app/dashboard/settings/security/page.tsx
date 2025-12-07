'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle2, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const SecurityPage = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await axios.post('/api/user/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      })  

      const data = response.data

      if (response.status === 200 && data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Password changed successfully' 
        })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Failed to change password' 
        })
      }
    } catch (error:any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'An error occurred. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const passwordLength = newPassword.length
  const isPasswordStrong = passwordLength >= 8

  return (
    <div className="space-y-6 p-6">
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            <div className="mt-2 space-y-2">
            
              <p className="text-xs text-gray-500">
                Minimum 8 characters recommended
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
            )}
            {confirmPassword && newPassword === confirmPassword && newPassword.length > 0 && (
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> Passwords match
              </p>
            )}
          </div>

          {message && (
            <div
              className={`rounded-lg p-4 text-sm flex items-start gap-2 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.type === 'error' ? (
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !currentPassword || !newPassword || !confirmPassword || newPassword.length < 8}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Account Status</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Email Verification</p>
              <p className="text-sm text-gray-600 mt-1">Your email address verification status</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 flex items-center gap-2">
              <CheckCircle2 size={14} /> Verified
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Account Status</p>
              <p className="text-sm text-gray-600 mt-1">Your current account status</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 flex items-center gap-2">
              <CheckCircle2 size={14} /> Active
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">Security Tips</h3>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li className="flex gap-2">
            <span>•</span>
            <span>Use a strong, unique password that you don't use elsewhere</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Include uppercase, lowercase, numbers, and symbols</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Never share your password with anyone</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Change your password regularly for better security</span>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default SecurityPage
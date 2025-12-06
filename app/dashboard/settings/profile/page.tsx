"use client"

import React, { useState } from 'react'
import { Edit2, User, Settings as SettingsIcon, CreditCard, Shield, Globe as WebIcon, Bell, Clock } from 'lucide-react'

interface ProfilePageProps {
  data: {
    user: {
      id: string
      name: string
      email: string
      avatarUrl: string
      timezone: string
      createdAt: Date
    }
    preferences: {
      emailNotifications: boolean
      timezone: string
      locale: string
    }
  }
}

export default function ProfilePage() {
  const data = {
    user: {
      id: 'user_123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: '',
      timezone: 'Asia/Kolkata',
      createdAt: new Date('2022-01-01T00:00:00Z'),
    },
    preferences: {
      emailNotifications: true,
      timezone: 'Asia/Kolkata',
      locale: 'en-IN',
    }
  }
  const [preferences, setPreferences] = useState(data.preferences)
  const [emailNotifications, setEmailNotifications] = useState(data.preferences.emailNotifications)
  const [isSaving, setIsSaving] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/settings/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences,
          emailNotifications,
        }),
      })

      if (response.ok) {
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-500">Update your personal information</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white overflow-hidden">
              <img 
                src={data.user.avatarUrl || `https://ui-avatars.com/api/?name=${data.user.name}&background=6366f1&color=fff`}
                alt={data.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{data.user.name}</h3>
            <p className="text-gray-600">{data.user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since {formatDate(data.user.createdAt)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={data.user.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={data.user.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed for OAuth accounts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Zone
            </label>
            <select 
              value={preferences.timezone}
              onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Asia/Kolkata">India (IST)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locale
            </label>
            <select 
              value={preferences.locale}
              onChange={(e) => setPreferences({...preferences, locale: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en-IN">English (India)</option>
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Upload, Loader2, X } from 'lucide-react'

interface ProfileFormProps {
  user: {
    id: string
    fullName: string
    email: string
    timezone: string | null
    role: string
    status: string
    profileImage?: any
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState(user.fullName)
  const [timezone, setTimezone] = useState(user.timezone || 'Asia/Kolkata')
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage || null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > 5) {
      setMessage({ type: 'error', text: 'Image too large. Maximum size is 5MB.' })
      return
    }

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' })
      return
    }

    setProfileImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setMessage(null)
  }

  const uploadProfileImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await axios.post('/api/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      })

      if (response.data.success) {
        return response.data.imageUrl
      }
      return null
    } catch (error: any) {
      console.error('Error uploading image:', error)
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to upload image'
      })
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      let uploadedImageUrl = profileImage

      if (profileImageFile) {
        setUploadLoading(true)
        uploadedImageUrl = await uploadProfileImage(profileImageFile)
        setUploadLoading(false)

        if (!uploadedImageUrl) {
          setIsLoading(false)
          return
        }
      }

      const response = await axios.put('/api/user/update-profile', {
        fullName,
        timezone,
        profileImage: uploadedImageUrl
      })

      const data = response.data

      if (response.status === 200 && data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
        setProfileImageFile(null)
        setProfileImagePreview('')
        setProfileImage(uploadedImageUrl)
        router.refresh()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Picture</h3>

        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            {profileImagePreview || profileImage ? (
              <div className="relative w-24 h-24">
                <img
                  src={profileImagePreview || profileImage || ''}
                  alt="Profile"
                  className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                />
                {(profileImagePreview || profileImageFile) && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileImageFile(null)
                      setProfileImagePreview('')
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="profile-image" className="block">
              <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer">
                {uploadLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Uploading...
                  </>
                ) : (
                  'Change Picture'
                )}
              </span>
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
              disabled={uploadLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG up to 5MB
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Zone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
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
              <option value="Australia/Sydney">Sydney (AEDT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Role
            </label>
            <input
              type="text"
              value={user.role}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Account Status</p>
          <p className="text-sm text-gray-500">{user.status}</p>
        </div>
        <Button
          type="submit"
          disabled={isLoading || uploadLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}

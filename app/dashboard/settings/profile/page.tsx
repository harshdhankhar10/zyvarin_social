import React from 'react'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/Dashboard/Settings/ProfileForm'

export default async function ProfilePage() {
  const session = await currentLoggedInUserInfo()
  
  if (!session) {
    redirect('/signin')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      timezone: true,
      createdAt: true,
      role: true,
      subscription_plan: true,
      status: true,
      isEmailVerified: true,
    }
  })

  if (!user) {
    redirect('/signin')
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-500">Update your personal information</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white overflow-hidden">
              <img 
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=6366f1&color=fff`}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since {formatDate(user.createdAt)}</p>
            <div className="flex gap-2 mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.isEmailVerified ? 'Verified' : 'Unverified'}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user.subscription_plan}
              </span>
            </div>
          </div>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  )
}
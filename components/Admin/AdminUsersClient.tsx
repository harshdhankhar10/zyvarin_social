'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import Image from 'next/image'

interface User {
  id: string
  fullName: string
  email: string
  avatarUrl?: string | null
  subscription_plan?: string | undefined | null
  status: string
  role: string
  createdAt: Date
  lastLogin?: Date | undefined | null
}

interface AdminUsersClientProps {
  users: User[]
  currentPage: number
  totalPages: number
  totalCount: number
  search: string
}

const AdminUsersClient = ({
  users,
  currentPage,
  totalPages,
  totalCount,
  search: initialSearch
}: AdminUsersClientProps) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(initialSearch)
  const [planFilter, setPlanFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  const filteredUsers = useMemo(() => {
    let result = users
    
    if (searchInput) {
      result = result.filter(user =>
        user.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
      )
    }
    
    if (planFilter) {
      result = result.filter(user => user.subscription_plan === planFilter)
    }
    
    if (statusFilter) {
      result = result.filter(user => user.status === statusFilter)
    }
    
    if (roleFilter) {
      result = result.filter(user => {
        if (roleFilter === 'ADMIN') return user.role === 'ADMIN'
        if (roleFilter === 'USER') return user.role === 'USER'
        return true
      })
    }
    
    return result
  }, [users, searchInput, planFilter, statusFilter, roleFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('page', '1')
    if (searchInput) params.set('search', searchInput)
    router.push(`/admin/users?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams()
    params.set('page', newPage.toString())
    if (initialSearch) params.set('search', initialSearch)
    router.push(`/admin/users?${params.toString()}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      case 'SUSPENDED': return 'bg-red-100 text-red-800'
      case 'DEACTIVATED': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan?: string) => {
    switch (plan) {
      case 'FREE': return 'bg-blue-100 text-blue-800'
      case 'CREATOR': return 'bg-purple-100 text-purple-800'
      case 'PREMIUM': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 text-sm mt-1">{totalCount} total users</p>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Plans</option>
            <option value="FREE">Free</option>
            <option value="CREATOR">Creator</option>
            <option value="PREMIUM">Premium</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="DEACTIVATED">Deactivated</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        
        </div>
      </form>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Plan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Joined</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 text-sm">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Image
                        width={32}
                        height={32}
                        src={user.avatarUrl || ''}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-900">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${getPlanColor(user.subscription_plan!)}`}>
                      {user.subscription_plan || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(new Date(user.createdAt))}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <p>Page {currentPage} of {totalPages}</p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminUsersClient

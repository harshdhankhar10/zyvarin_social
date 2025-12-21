'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface SocialProvider {
  id: string
  provider: string
  isConnected: boolean
  connectedAt: Date
}

interface Invoice {
  id: string
  invoiceNumber: string
  plan: string
  totalAmount: number
  paymentStatus: string
  issueDate: Date
}

interface Transaction {
  id: string
  type: string
  amount: number
  status: string
  createdAt: Date
}

interface Notification {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

interface AI_Usage {
  id: string
  type: string
  createdAt: Date
}

interface UserDetail {
  id: string
  fullName: string
  email: string
  avatarUrl?: string
  subscription_plan?: string
  subscription_status: string
  status: string
  role: string
  isEmailVerified: boolean
  createdAt: Date
  lastLogin?: Date
  timezone?: string
  next_billing_date?: Date
  socialProviders: SocialProvider[]
  invoices: Invoice[]
  transactions: Transaction[]
  notifications: Notification[]
  aiUsages: AI_Usage[]
}

interface UserDetailClientProps {
  user: UserDetail
}

const UserDetailClient = ({ user }: UserDetailClientProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const [statusDialog, setStatusDialog] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')

  const [planDialog, setPlanDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [notifyDialog, setNotifyDialog] = useState(false)

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const handleStatusChange = async () => {
    if (!selectedStatus) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${user.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus })
      })

      const data = await res.json()
      if (res.ok) {
        showMessage(`Status changed to ${selectedStatus}`, 'success')
        setStatusDialog(false)
        setSelectedStatus('')
        setTimeout(() => router.refresh(), 1000)
      } else {
        showMessage(data.error || 'Failed to update status', 'error')
      }
    } catch (error) {
      showMessage('Error updating status', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handlePlanChange = async () => {
    if (!selectedPlan) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${user.id}/plan`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan })
      })

      const data = await res.json()
      if (res.ok) {
        showMessage(`Plan changed to ${selectedPlan}`, 'success')
        setPlanDialog(false)
        setSelectedPlan('')
        setTimeout(() => router.refresh(), 1000)
      } else {
        showMessage(data.error || 'Failed to update plan', 'error')
      }
    } catch (error) {
      showMessage('Error updating plan', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        showMessage('User deleted successfully', 'success')
        setDeleteDialog(false)
        setTimeout(() => router.push('/admin/users'), 1500)
      } else {
        const data = await res.json()
        showMessage(data.error || 'Failed to delete user', 'error')
      }
    } catch (error) {
      showMessage('Error deleting user', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSendNotification = async () => {
    const title = (document.getElementById('notif-title') as HTMLInputElement)?.value
    const msg = (document.getElementById('notif-message') as HTMLInputElement)?.value

    if (!title || !msg) {
      showMessage('Please fill in title and message', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${user.id}/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message: msg })
      })

      if (res.ok) {
        showMessage('Notification sent successfully', 'success')
        setNotifyDialog(false)
        ;(document.getElementById('notif-title') as HTMLInputElement).value = ''
        ;(document.getElementById('notif-message') as HTMLInputElement).value = ''
      } else {
        const data = await res.json()
        showMessage(data.error || 'Failed to send notification', 'error')
      }
    } catch (error) {
      showMessage('Error sending notification', 'error')
    } finally {
      setLoading(false)
    }
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
      <Link href="/admin/users" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft className="w-4 h-4" />
        Back to Users
      </Link>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {messageType === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex gap-4 mb-6">
              <img
                src={user.avatarUrl || 'https://via.placeholder.com/80'}
                alt={user.fullName}
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${getPlanColor(user.subscription_plan)}`}>
                    {user.subscription_plan || '-'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-gray-500">Email Verified</p>
                <p className="font-medium">{user.isEmailVerified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-gray-500">Joined</p>
                <p className="font-medium">{formatDate(new Date(user.createdAt))}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Login</p>
                <p className="font-medium">{user.lastLogin ? formatDate(new Date(user.lastLogin)) : 'Never'}</p>
              </div>
              <div>
                <p className="text-gray-500">Subscription Status</p>
                <p className="font-medium">{user.subscription_status}</p>
              </div>
              <div>
                <p className="text-gray-500">Next Billing</p>
                <p className="font-medium">{user.next_billing_date ? formatDate(new Date(user.next_billing_date)) : '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Connected Accounts</h2>
            {user.socialProviders.length === 0 ? (
              <p className="text-gray-500 text-sm">No connected accounts</p>
            ) : (
              <div className="space-y-2">
                {user.socialProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between text-sm">
                    <span className="capitalize font-medium">{provider.provider}</span>
                    <span className={`px-2 py-1 rounded text-xs ${provider.isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {provider.isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
            {user.transactions.length === 0 ? (
              <p className="text-gray-500 text-sm">No transactions</p>
            ) : (
              <div className="space-y-2">
                {user.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between text-sm border-b pb-2">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-gray-500 text-xs">{formatDate(new Date(transaction.createdAt))}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{transaction.amount}</p>
                      <p className={`text-xs ${transaction.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Recent Invoices</h2>
            {user.invoices.length === 0 ? (
              <p className="text-gray-500 text-sm">No invoices</p>
            ) : (
              <div className="space-y-2">
                {user.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between text-sm border-b pb-2">
                    <div>
                      <p className="font-medium">{invoice.invoiceNumber}</p>
                      <p className="text-gray-500 text-xs">{invoice.plan} - {formatDate(new Date(invoice.issueDate))}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{invoice.totalAmount}</p>
                      <p className={`text-xs ${invoice.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {invoice.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">AI Usage</h2>
            <p className="text-sm text-gray-600 mb-3">Total AI requests: {user.aiUsages.length}</p>
            {user.aiUsages.length === 0 ? (
              <p className="text-gray-500 text-sm">No AI usage</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.aiUsages.map((usage, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {usage.type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Actions</h2>

            <div className="space-y-3">
              <button
                onClick={() => setStatusDialog(true)}
                disabled={loading}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Change Status
              </button>

              <button
                onClick={() => setPlanDialog(true)}
                disabled={loading}
                className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
              >
                Change Plan
              </button>

              <button
                onClick={() => setNotifyDialog(true)}
                disabled={loading}
                className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50"
              >
                Send Notification
              </button>

              <button
                onClick={() => setDeleteDialog(true)}
                disabled={loading}
                className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
              >
                Delete User
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Recent Notifications</h2>
            {user.notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications</p>
            ) : (
              <div className="space-y-2">
                {user.notifications.map((notif) => (
                  <div key={notif.id} className="text-sm border-b pb-2">
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-gray-600 text-xs">{notif.message}</p>
                    <p className="text-gray-400 text-xs">{formatDate(new Date(notif.createdAt))}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={statusDialog} onOpenChange={setStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Status</DialogTitle>
            <DialogDescription>
              Select a new status for {user.fullName}. The user will be notified of this change.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {['ACTIVE', 'INACTIVE', 'SUSPENDED', 'DEACTIVATED'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`w-full p-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                  selectedStatus === status
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <DialogFooter>
            <button
              onClick={() => {
                setStatusDialog(false)
                setSelectedStatus('')
              }}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleStatusChange}
              disabled={loading || !selectedStatus}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Confirm'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={planDialog} onOpenChange={setPlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Select a new plan for {user.fullName}. The user will be notified of this change.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {['FREE', 'CREATOR', 'PREMIUM'].map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full p-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                  selectedPlan === plan
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                }`}
              >
                {plan}
              </button>
            ))}
          </div>
          <DialogFooter>
            <button
              onClick={() => {
                setPlanDialog(false)
                setSelectedPlan('')
              }}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePlanChange}
              disabled={loading || !selectedPlan}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Confirm'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="text-red-600">
              Are you sure you want to permanently delete {user.fullName}? This action cannot be undone. All their data will be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleteDialog(false)}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={notifyDialog} onOpenChange={setNotifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send a notification to {user.fullName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <input
              type="text"
              id="notif-title"
              placeholder="Notification Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              id="notif-message"
              placeholder="Notification Message"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => setNotifyDialog(false)}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSendNotification}
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserDetailClient

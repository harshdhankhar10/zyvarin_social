'use client'

import { useState } from 'react'

const targetOptions = [
  { value: 'single', label: 'Single user' },
  { value: 'all-users', label: 'All users' },
  { value: 'all-admins', label: 'All admins' }
]

export default function AdminNotificationsPage() {
  const [targetType, setTargetType] = useState<'single' | 'all-users' | 'all-admins'>('single')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedEmail, setSelectedEmail] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSearch = async () => {
    if (searchEmail.trim().length < 3) {
      setStatus({ type: 'error', text: 'Enter at least 3 characters' })
      return
    }
    setSearching(true)
    setStatus(null)
    try {
      const res = await fetch(`/api/admin/users/search?email=${encodeURIComponent(searchEmail.trim())}`)
      const data = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', text: data.error || 'Search failed' })
        setSearchResults([])
        return
      }
      setSearchResults(data.users || [])
      if (data.users?.length === 1) {
        setSelectedEmail(data.users[0].email)
      }
    } catch (e) {
      setStatus({ type: 'error', text: 'Search failed' })
    } finally {
      setSearching(false)
    }
  }

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Title and message are required' })
      return
    }
    if (targetType === 'single' && !selectedEmail.trim()) {
      setStatus({ type: 'error', text: 'Select a user by email' })
      return
    }
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/admin/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType,
          email: targetType === 'single' ? selectedEmail.trim() : undefined,
          title: title.trim(),
          message: message.trim()
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', text: data.error || 'Failed to send' })
        return
      }
      setStatus({ type: 'success', text: `Sent to ${data.count || 1} recipient(s)` })
      setMessage('')
      setTitle('')
      if (targetType === 'single') {
        setSelectedEmail('')
        setSearchResults([])
        setSearchEmail('')
      }
    } catch (e) {
      setStatus({ type: 'error', text: 'Failed to send' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Send notifications to a single user, all users, or all admins.</p>
      </div>

      {status && (
        <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Target</label>
          <div className="flex flex-col gap-3">
            {targetOptions.map((opt) => (
              <label key={opt.value} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                targetType === opt.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="target"
                  value={opt.value}
                  checked={targetType === opt.value}
                  onChange={() => setTargetType(opt.value as any)}
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            ))}
          </div>

          {targetType === 'single' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search by email</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={searching}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50"
                  >
                    {searching ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="border border-gray-200 rounded-lg divide-y">
                  {searchResults.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setSelectedEmail(u.email)}
                      className={`w-full text-left px-4 py-3 flex justify-between items-center ${
                        selectedEmail === u.email ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-gray-900">{u.fullName || 'Unknown'}</div>
                        <div className="text-sm text-gray-600">{u.email}</div>
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{u.role}</div>
                    </button>
                  ))}
                </div>
              )}

              {selectedEmail && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  Selected: {selectedEmail}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Subject"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Write the notification message..."
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSend}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send notification'}
            </button>
            <div className="text-sm text-gray-500">
              {targetType === 'all-users' && 'This will send to every user.'}
              {targetType === 'all-admins' && 'This will send to every admin.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AccountSettings({ email }: { email: string }) {
  const supabase = createSupabaseBrowserClient()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setMessage('Password updated successfully.')
      setPassword('')
      setConfirm('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Account info */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-4 font-semibold text-white">Account</h2>
        <div>
          <label className="mb-1 block text-xs text-gray-500">Email</label>
          <p className="text-sm text-white">{email}</p>
        </div>
      </div>

      {/* Change password */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="mb-4 font-semibold text-white">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">New password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">Confirm password</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
          )}
          {message && (
            <p className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-glow rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}

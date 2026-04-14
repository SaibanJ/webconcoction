'use client'

import { useState } from 'react'

export default function CpanelLoginButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setLoading(true)
    setError('')

    const res = await fetch('/api/whm/cpanel-login', { method: 'POST' })
    const data = await res.json()
    setLoading(false)

    if (res.ok && data.url) {
      window.open(data.url, '_blank')
    } else {
      setError(data.error || 'Failed to open cPanel')
    }
  }

  return (
    <div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        {loading ? 'Opening...' : 'Open cPanel'}
      </button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  )
}

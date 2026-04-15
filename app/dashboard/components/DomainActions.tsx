'use client'

import { useState } from 'react'

export default function DomainActions({ domain }: { domain: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleRenew() {
    if (!confirm(`Renew ${domain} for 1 year?`)) return
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/domains/renew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setMessage(`Renewed! New expiry: ${data.expireDate}`)
    } else {
      setMessage(data.error || 'Renewal failed')
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <a
          href={`https://${domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:border-accent-purple"
        >
          Visit site →
        </a>
        <button
          onClick={handleRenew}
          disabled={loading}
          className="rounded-lg border border-accent-purple/30 bg-accent-purple/10 px-3 py-1.5 text-xs font-medium text-accent-purple hover:bg-accent-purple/20 disabled:opacity-50"
        >
          {loading ? 'Renewing...' : 'Renew'}
        </button>
      </div>
      {message && <p className="text-xs text-gray-400">{message}</p>}
    </div>
  )
}

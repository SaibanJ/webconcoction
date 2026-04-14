'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HostingActions({ currentPlan }: { currentPlan: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  async function handleCancel() {
    if (!confirm('Cancel your hosting plan? You will keep access until the end of the billing period.')) return
    setLoading('cancel')
    setMessage('')

    const res = await fetch('/api/subscription/cancel', { method: 'POST' })
    const data = await res.json()
    setLoading(null)

    if (res.ok) {
      setMessage('Subscription cancelled. You will keep access until the end of the billing period.')
      router.refresh()
    } else {
      setMessage(data.error || 'Failed to cancel')
    }
  }

  async function handleManagePlan() {
    setLoading('upgrade')
    setMessage('')

    const res = await fetch('/api/subscription/upgrade', { method: 'POST' })
    const data = await res.json()
    setLoading(null)

    if (res.ok && data.url) {
      window.location.href = data.url
    } else {
      setMessage(data.error || 'Failed to open billing portal')
    }
  }

  return (
    <div className="mt-6 border-t border-white/5 pt-6">
      {/* Manage plan via Stripe portal */}
      <button
        onClick={handleManagePlan}
        disabled={loading === 'upgrade'}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-accent-purple hover:bg-white/10 disabled:opacity-50"
      >
        {loading === 'upgrade' ? 'Opening...' : 'Upgrade / Change plan'}
      </button>

      {/* Cancel */}
      <div className="mt-6">
        <button
          onClick={handleCancel}
          disabled={loading === 'cancel'}
          className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
        >
          {loading === 'cancel' ? 'Cancelling...' : 'Cancel subscription'}
        </button>
      </div>

      {message && (
        <p className="mt-3 text-sm text-gray-400">{message}</p>
      )}
    </div>
  )
}

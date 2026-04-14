'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SUPPORTED_TLDS = ['.biz','.ca','.cc','.co','.com','.com.es','.com.pe','.es','.in','.info','.me','.mobi','.net','.net.pe','.nom.es','.org','.org.es','.org.pe','.pe','.tv','.us']

export default function TransferDomainModal() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [domain, setDomain] = useState('')
  const [eppCode, setEppCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function isSupportedTld(domain: string): boolean {
    return SUPPORTED_TLDS.some((tld) => domain.toLowerCase().endsWith(tld))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!isSupportedTld(domain)) {
      setError(`This TLD is not supported for API transfers. Supported: ${SUPPORTED_TLDS.join(', ')}`)
      return
    }

    setLoading(true)

    const res = await fetch('/api/domains/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, eppCode }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setSuccess(`Transfer initiated for ${domain}! It typically takes 5–7 days to complete.`)
      setDomain('')
      setEppCode('')
      router.refresh()
    } else {
      setError(data.error || 'Transfer failed')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-accent-purple hover:bg-white/10"
      >
        Transfer domain
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="glass-card w-full max-w-md rounded-2xl p-8">
            <h3 className="mb-1 text-xl font-semibold text-white">Transfer a domain</h3>
            <p className="mb-6 text-sm text-gray-400">
              Transfer an existing domain from another registrar to your account.
              You&apos;ll need the EPP/authorization code from your current registrar.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-300">Domain name</label>
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.trim().toLowerCase())}
                  placeholder="yourdomain.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-gray-300">
                  EPP / Authorization code
                </label>
                <input
                  type="text"
                  required
                  value={eppCode}
                  onChange={(e) => setEppCode(e.target.value)}
                  placeholder="Get this from your current registrar"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-purple"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Log in to your current registrar and look for &quot;Auth code&quot;, &quot;EPP code&quot;, or &quot;Transfer key&quot;.
                </p>
              </div>

              {error && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
              )}
              {success && (
                <p className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400">{success}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setOpen(false); setError(''); setSuccess('') }}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow flex-1 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Start transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

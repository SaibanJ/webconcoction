'use client'

import { useState, FormEvent } from 'react'
import HeroSceneLoader from './HeroSceneLoader'

interface DomainResult {
  domain: string
  available: boolean
  price: number
  premium: boolean
}

interface ContactInfo {
  firstName: string
  lastName: string
  address1: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  phone: string
  email: string
}

const TLDS = ['.com', '.io', '.dev', '.ai', '.co', '.net', '.app', '.xyz']

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DomainResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: 'US',
    phone: '',
  })

  async function handleSearch(e: FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    setShowRegisterForm(false)
    try {
      const res = await fetch('/api/domains/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: query.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to check domain')
        return
      }
      setResult(data)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister() {
    if (
      !result?.domain ||
      !contactInfo.email ||
      !contactInfo.firstName ||
      !contactInfo.lastName
    ) {
      setError('Please fill in all required contact information')
      return
    }
    setRegisterLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'domain',
          domain: result.domain,
          price: result.price,
          email: contactInfo.email,
          contactInfo,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to start checkout')
        return
      }
      if (data.url) window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <section
      id="domains"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-24 md:pt-0"
    >
      <HeroSceneLoader />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
          Now featuring client dashboards
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Your Web Journey
          <br />
          <span className="gradient-text">Starts Here</span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg text-gray-400">
          Find your perfect domain and get a custom website built on
          enterprise-grade hosting — all in one place.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-5">
          <div className="glass-card flex items-center gap-2 rounded-2xl p-2 transition-all duration-300 focus-within:border-accent-purple/50 focus-within:shadow-[0_0_50px_rgba(139,92,246,0.18)]">
            <div className="flex flex-1 items-center gap-3 px-3">
              <svg
                className="h-5 w-5 shrink-0 text-accent-purple"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your perfect domain..."
                className="w-full bg-transparent py-4 text-base text-white placeholder-gray-500 outline-none md:text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="btn-glow shrink-0 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-4 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 md:px-8"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span className="hidden md:inline">Checking...</span>
                </span>
              ) : (
                <>
                  <span className="hidden md:inline">Search</span>
                  <svg
                    className="h-5 w-5 md:hidden"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* TLD chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {TLDS.map((tld) => (
            <button
              key={tld}
              type="button"
              onClick={() => {
                const base = query.split('.')[0] || 'mysite'
                setQuery(`${base}${tld}`)
              }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400 transition-all hover:border-accent-purple/40 hover:bg-accent-purple/10 hover:text-white"
            >
              {tld}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Result card */}
        {result && (
          <div className="glass-card animate-fade-up rounded-2xl p-6 text-left md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`pulse-glow h-3 w-3 shrink-0 rounded-full ${
                    result.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {result.domain}
                  </h3>
                  <p
                    className={`text-sm ${
                      result.available ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {result.available
                      ? 'Available — grab it before someone else does'
                      : 'This domain is taken'}
                    {result.premium && ' (Premium)'}
                  </p>
                </div>
              </div>

              {result.available && (
                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-3xl font-bold text-white">
                    ${result.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-400">
                      /yr
                    </span>
                  </span>
                  <button
                    onClick={() => setShowRegisterForm(!showRegisterForm)}
                    className="btn-glow rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-6 py-3 font-semibold text-white transition-all hover:opacity-90"
                  >
                    {showRegisterForm ? 'Cancel' : 'Register'}
                  </button>
                </div>
              )}
            </div>

            {/* Registration form */}
            {showRegisterForm && result.available && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h4 className="mb-6 text-lg font-semibold text-white">
                  Registration Details
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={contactInfo.firstName}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, firstName: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={contactInfo.lastName}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, lastName: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (+1.5551234567)"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="text"
                    placeholder="Street Address *"
                    required
                    value={contactInfo.address1}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, address1: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={contactInfo.city}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, city: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="text"
                    placeholder="State / Province *"
                    required
                    value={contactInfo.stateProvince}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        stateProvince: e.target.value,
                      })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={contactInfo.postalCode}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        postalCode: e.target.value,
                      })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                  <input
                    type="text"
                    placeholder="Country Code (e.g., US)"
                    value={contactInfo.country}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, country: e.target.value })
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-purple"
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleRegister}
                    disabled={registerLoading || !contactInfo.email}
                    className="btn-glow rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {registerLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay $${result.price.toFixed(2)} & Register`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Trust stats — hidden once result appears */}
        {!result && (
          <div className="mt-4 grid grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-white md:text-3xl">
                Custom
              </div>
              <div className="text-sm text-gray-500">No Templates Ever</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white md:text-3xl">
                99.99%
              </div>
              <div className="text-sm text-gray-500">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white md:text-3xl">
                50ms
              </div>
              <div className="text-sm text-gray-500">Avg Response Time</div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {!result && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
    </section>
  )
}

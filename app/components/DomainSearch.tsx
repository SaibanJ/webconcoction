'use client'

import { useState, FormEvent } from 'react'

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

export default function DomainSearch() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DomainResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  // Registration form state
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
      // Option 1: Send directly to register endpoint (requires payment verification elsewhere)
      // Uncomment if you want direct registration without Stripe checkout
      /*
      const res = await fetch("/api/domains/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: result.domain,
          years: 1,
          registrantInfo,
          techInfo,
          adminInfo,
          auxInfo,
          addFreeWhoisguard: true,
          enableWhoisguard: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to register domain");
        return;
      }

      // Success
      alert(`Domain registered successfully! Order ID: ${data.data.orderId}`);
      setShowRegisterForm(false);
      */

      // Option 2: Send to Stripe checkout (current flow)
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

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <section id="domains" className="relative px-4 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Find Your Perfect <span className="gradient-text">Domain</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Search millions of domain names. Check availability instantly and
            register in seconds.
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="glass-card flex items-center gap-3 rounded-2xl p-2 md:p-3">
            <div className="flex flex-1 items-center gap-3 px-4">
              <svg
                className="text-accent-purple h-5 w-5 shrink-0"
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
                placeholder="Enter a domain name (e.g., mysite.com)"
                className="w-full bg-transparent py-3 text-lg text-white placeholder-gray-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="btn-glow bg-accent-purple shrink-0 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50 md:px-8"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
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
                  Checking...
                </span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`pulse-glow h-4 w-4 rounded-full ${
                    result.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {result.domain}
                  </h3>
                  <p
                    className={`text-sm ${
                      result.available ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {result.available
                      ? 'This domain is available!'
                      : 'This domain is taken'}
                    {result.premium && ' (Premium)'}
                  </p>
                </div>
              </div>

              {result.available && (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">
                    ${result.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-400">
                      /yr
                    </span>
                  </span>
                  <button
                    onClick={() => setShowRegisterForm(!showRegisterForm)}
                    className="btn-glow bg-accent-purple rounded-xl px-6 py-3 font-semibold text-white transition-all hover:bg-purple-500"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Registration form */}
            {showRegisterForm && result.available && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h4 className="mb-6 text-xl font-semibold text-white">
                  Registration Details
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={contactInfo.firstName}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        firstName: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={contactInfo.lastName}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        lastName: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        email: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (+1.5551234567)"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        phone: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Street Address *"
                    required
                    value={contactInfo.address1}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        address1: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple col-span-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={contactInfo.city}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        city: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
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
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
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
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Country Code (e.g., US)"
                    value={contactInfo.country}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        country: e.target.value,
                      })
                    }
                    className="focus:border-accent-purple rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-colors outline-none"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleRegister}
                    disabled={registerLoading || !contactInfo.email}
                    className="btn-glow from-accent-purple to-accent-blue rounded-xl bg-gradient-to-r px-8 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {registerLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 animate-spin"
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

        {/* Popular TLDs */}
        <div className="mt-10 text-center">
          <p className="mb-4 text-sm text-gray-500">Popular extensions</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['.com', '.io', '.dev', '.ai', '.co', '.net', '.app', '.xyz'].map(
              (tld) => (
                <button
                  key={tld}
                  onClick={() => {
                    const base = query.split('.')[0] || 'mysite'
                    setQuery(`${base}${tld}`)
                  }}
                  className="hover:border-accent-purple rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 transition-all hover:text-white"
                >
                  {tld}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

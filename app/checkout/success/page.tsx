'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const type = params.get('type') // 'hosting' or 'domain'
  const plan = params.get('plan')
  const domain = params.get('domain')

  const isHosting = type === 'hosting'

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/30">
          <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-white">
          {isHosting ? 'You\'re all set!' : 'Domain registered!'}
        </h1>

        {isHosting ? (
          <>
            <p className="mb-2 text-gray-400">
              Your <span className="capitalize text-white">{plan}</span> plan payment was received — setup fee and first month are paid.
            </p>
            <p className="mb-8 text-gray-400">
              We&apos;ll be in touch shortly to kick off your website build. In the meantime, check your inbox for an invite to set up your dashboard account.
            </p>
            <div className="glass-card rounded-2xl p-5 text-left text-sm text-gray-400 mb-8">
              <p className="mb-2 font-semibold text-white">What happens next:</p>
              <ol className="space-y-1.5 list-decimal list-inside">
                <li>Check your email and set your password</li>
                <li>We contact you to start your website</li>
                <li>Your site goes live on your domain</li>
                <li>Monthly billing begins after your first month</li>
              </ol>
            </div>
            <Link
              href="/login"
              className="btn-glow inline-block rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-3 font-semibold text-white hover:opacity-90"
            >
              Go to login
            </Link>
          </>
        ) : (
          <>
            <p className="mb-2 text-gray-400">
              <span className="text-white font-semibold">{domain}</span> is being registered and will be active within a few minutes.
            </p>
            <p className="mb-8 text-gray-400">
              To manage your domain, track its status, and access cPanel, you&apos;ll need a hosting plan. Pick one below to complete your setup.
            </p>
            <Link
              href="/#pricing"
              className="btn-glow inline-block rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-3 font-semibold text-white hover:opacity-90"
            >
              Choose a hosting plan
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Already have a plan?{' '}
              <Link href="/login" className="text-accent-purple hover:underline">
                Log in to your dashboard
              </Link>
            </p>
          </>
        )}

        <p className="mt-6 text-xs text-gray-600">
          Questions? Email us at{' '}
          <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:underline">
            support@webconcoction.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}

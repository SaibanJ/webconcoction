import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import HostingActions from '../components/HostingActions'
import CpanelLoginButton from '../components/CpanelLoginButton'

const PLAN_LABELS: Record<string, string> = {
  basic: 'Basic',
  pro: 'Pro',
  business: 'Business',
}

const PLAN_PRICES: Record<string, number> = {
  basic: 9,
  pro: 29,
  business: 99,
}

export default async function HostingPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('customer_email', user!.email)
    .order('created_at', { ascending: false })

  const activeSub = subscriptions?.find((s) => s.status === 'active')

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Hosting</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your hosting plan and access cPanel.</p>
      </div>

      {activeSub ? (
        <div className="space-y-6">
          {/* Plan card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {PLAN_LABELS[activeSub.plan] ?? activeSub.plan} Plan
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  ${PLAN_PRICES[activeSub.plan] ?? '?'}/mo
                </p>
                <div className="mt-3 space-y-1 text-xs text-gray-500">
                  <p>cPanel username: <span className="text-gray-300 font-mono">{activeSub.whm_username}</span></p>
                  <p>Status: <span className="text-green-400">Active</span></p>
                </div>
              </div>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20">
                Active
              </span>
            </div>

            <HostingActions currentPlan={activeSub.plan} />
          </div>

          {/* cPanel access */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-1 font-semibold text-white">cPanel Access</h3>
            <p className="mb-4 text-sm text-gray-400">
              Open your hosting control panel to manage files, databases, email accounts, and more.
            </p>
            <CpanelLoginButton />
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl px-6 py-16 text-center">
          <p className="text-gray-400">You don&apos;t have an active hosting plan.</p>
          <Link
            href="/#pricing"
            className="btn-glow mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Choose a plan
          </Link>
        </div>
      )}
    </div>
  )
}


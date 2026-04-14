import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const PLAN_LABELS: Record<string, string> = {
  basic: 'Basic',
  pro: 'Pro',
  business: 'Business',
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: domains }, { data: subscriptions }] = await Promise.all([
    supabase.from('domains').select('*').eq('owner_email', user!.email).order('registered_at', { ascending: false }),
    supabase.from('subscriptions').select('*').eq('customer_email', user!.email).order('created_at', { ascending: false }),
  ])

  const activeSub = subscriptions?.find((s) => s.status === 'active')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="mt-1 text-sm text-gray-400">Welcome back, {user!.email}</p>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-gray-400">Domains</p>
          <p className="mt-1 text-3xl font-bold text-white">{domains?.length ?? 0}</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-gray-400">Hosting Plan</p>
          <p className="mt-1 text-3xl font-bold text-white">
            {activeSub ? PLAN_LABELS[activeSub.plan] ?? activeSub.plan : '—'}
          </p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-gray-400">Account Status</p>
          <div className="mt-1 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${activeSub ? 'bg-green-400' : 'bg-gray-500'}`} />
            <p className="text-lg font-semibold text-white">{activeSub ? 'Active' : 'No plan'}</p>
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your Domains</h2>
          <Link href="/dashboard/domains" className="text-sm text-accent-purple hover:underline">View all →</Link>
        </div>
        {domains && domains.length > 0 ? (
          <div className="space-y-3">
            {domains.slice(0, 3).map((d) => (
              <div key={d.id} className="glass-card flex items-center justify-between rounded-xl px-5 py-4">
                <div>
                  <p className="font-medium text-white">{d.domain_name}</p>
                  <p className="text-xs text-gray-500">
                    Expires {d.expires_at ? new Date(d.expires_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
                <a
                  href={`https://${d.domain_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:border-accent-purple"
                >
                  Visit →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-xl px-5 py-8 text-center text-sm text-gray-500">
            No domains yet.{' '}
            <Link href="/#domains" className="text-accent-purple hover:underline">Register one →</Link>
          </div>
        )}
      </div>

      {/* Hosting */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Hosting</h2>
          <Link href="/dashboard/hosting" className="text-sm text-accent-purple hover:underline">Manage →</Link>
        </div>
        {activeSub ? (
          <div className="glass-card rounded-xl px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{PLAN_LABELS[activeSub.plan] ?? activeSub.plan} Plan</p>
                <p className="text-xs text-gray-500">cPanel user: {activeSub.whm_username}</p>
              </div>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20">
                Active
              </span>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl px-5 py-8 text-center text-sm text-gray-500">
            No hosting plan.{' '}
            <Link href="/#pricing" className="text-accent-purple hover:underline">Choose a plan →</Link>
          </div>
        )}
      </div>
    </div>
  )
}

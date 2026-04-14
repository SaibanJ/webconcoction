import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import DomainActions from '../components/DomainActions'
import TransferDomainModal from '../components/TransferDomainModal'

export default async function DomainsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: domains } = await supabase
    .from('domains')
    .select('*')
    .eq('owner_email', user!.email)
    .order('registered_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Domains</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your registered domains.</p>
      </div>

      {domains && domains.length > 0 ? (
        <>
          {/* Actions row when domains exist */}
          <div className="mb-6 flex gap-3">
            <TransferDomainModal />
            <Link
              href="/#domains"
              className="btn-glow rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Register domain
            </Link>
          </div>

          <div className="space-y-4">
            {domains.map((d) => {
              const expiresAt = d.expires_at ? new Date(d.expires_at) : null
              const daysUntilExpiry = expiresAt
                ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : null
              const expiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 30

              return (
                <div key={d.id} className="glass-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{d.domain_name}</h3>
                        {expiringSoon && (
                          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs text-yellow-400">
                            Expiring soon
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Registered {new Date(d.registered_at).toLocaleDateString()}</span>
                        {expiresAt && (
                          <span>
                            Expires {expiresAt.toLocaleDateString()}
                            {daysUntilExpiry !== null && ` (${daysUntilExpiry} days)`}
                          </span>
                        )}
                        {d.namecheap_order_id && <span>Order #{d.namecheap_order_id}</span>}
                      </div>
                    </div>
                    <DomainActions domain={d.domain_name} />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="glass-card rounded-2xl px-6 py-16 text-center">
          <p className="mb-6 text-gray-400">You haven&apos;t registered any domains yet.</p>
          <div className="flex items-center justify-center gap-3">
            <TransferDomainModal />
            <Link
              href="/#domains"
              className="btn-glow rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Register domain
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

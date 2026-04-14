import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountSettings from '../components/AccountSettings'

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ set_password?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const params = await searchParams
  const isNewAccount = params.set_password === 'true'

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your account.</p>
      </div>

      {isNewAccount && (
        <div className="mb-6 max-w-lg rounded-xl border border-accent-purple/30 bg-accent-purple/10 px-5 py-4 text-sm text-accent-purple">
          Welcome! Please set a password for your account below.
        </div>
      )}

      <div className="max-w-lg">
        <AccountSettings email={user!.email ?? ''} />
      </div>
    </div>
  )
}

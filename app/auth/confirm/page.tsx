'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AuthConfirmPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing your invite...')

  useEffect(() => {
    async function handleInvite() {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)

      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const type = params.get('type')

      if (!accessToken || !refreshToken) {
        setStatus('Invalid or expired invite link.')
        return
      }

      const supabase = createSupabaseBrowserClient()

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (error) {
        setStatus('Failed to process invite: ' + error.message)
        return
      }

      if (type === 'invite' || type === 'recovery') {
        // Send them to settings to set their password
        router.replace('/dashboard/settings?set_password=true')
      } else {
        router.replace('/dashboard')
      }
    }

    handleInvite()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
        <p className="text-sm text-gray-400">{status}</p>
      </div>
    </div>
  )
}

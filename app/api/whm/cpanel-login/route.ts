import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import axios from 'axios'

export async function POST() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('whm_username')
    .eq('customer_email', user.email)
    .eq('status', 'active')
    .single()

  if (!subscription?.whm_username) {
    return NextResponse.json({ error: 'No active hosting account found' }, { status: 404 })
  }

  const proxyUrl = process.env.WHM_PROXY_URL
  const proxySecret = process.env.WHM_PROXY_SECRET

  if (!proxyUrl || !proxySecret) {
    return NextResponse.json({ error: 'Proxy not configured' }, { status: 500 })
  }

  try {
    const response = await axios.post(
      `${proxyUrl}/cpanel-session`,
      { username: subscription.whm_username },
      { headers: { 'x-proxy-secret': proxySecret } }
    )

    return NextResponse.json({ url: response.data.url })
  } catch (error) {
    console.error('cPanel SSO error:', error)
    return NextResponse.json({ error: 'Failed to create cPanel session' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import axios from 'axios'
import https from 'https'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export async function POST() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Look up the user's WHM username from their subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('whm_username')
    .eq('customer_email', user.email)
    .eq('status', 'active')
    .single()

  if (!subscription?.whm_username) {
    return NextResponse.json({ error: 'No active hosting account found' }, { status: 404 })
  }

  const host = process.env.WHM_HOST
  const username = process.env.WHM_USERNAME
  const token = process.env.WHM_API_TOKEN

  if (!host || !username || !token) {
    return NextResponse.json({ error: 'WHM not configured' }, { status: 500 })
  }

  try {
    const response = await axios.get(
      `https://${host}:2087/json-api/create_user_session`,
      {
        params: {
          'api.version': '1',
          user: subscription.whm_username,
        },
        headers: {
          Authorization: `whm ${username}:${token}`,
        },
        httpsAgent,
      },
    )

    const url = response.data?.data?.url
    if (!url) {
      return NextResponse.json({ error: 'Failed to generate cPanel session' }, { status: 500 })
    }

    return NextResponse.json({ url })
  } catch (error) {
    console.error('cPanel SSO error:', error)
    return NextResponse.json({ error: 'Failed to create cPanel session' }, { status: 500 })
  }
}

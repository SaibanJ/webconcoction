import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { transferDomain } from '@/lib/namecheap'

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { domain, eppCode } = await request.json()

  if (!domain || !eppCode) {
    return NextResponse.json(
      { error: 'Domain name and EPP code are required' },
      { status: 400 },
    )
  }

  // Check user has an active hosting subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('customer_email', user.email)
    .eq('status', 'active')
    .single()

  if (!subscription) {
    return NextResponse.json(
      { error: 'An active hosting plan is required to transfer domains' },
      { status: 403 },
    )
  }

  // Check domain isn't already in their account
  const { data: existing } = await supabase
    .from('domains')
    .select('id')
    .eq('domain_name', domain)
    .single()

  if (existing) {
    return NextResponse.json(
      { error: 'This domain is already in your account' },
      { status: 409 },
    )
  }

  try {
    const result = await transferDomain(domain, eppCode)

    if (!result.transfer) {
      return NextResponse.json(
        { error: 'Transfer request was not accepted by Namecheap' },
        { status: 400 },
      )
    }

    // Record the transfer in Supabase — expires_at unknown until transfer completes
    const { error: dbError } = await supabase.from('domains').insert({
      owner_email: user.email,
      domain_name: domain,
      registered_at: new Date().toISOString(),
      namecheap_order_id: result.orderId || '',
    })

    if (dbError) console.error('Supabase insert error (domain transfer):', dbError)

    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('Domain transfer error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Transfer failed' },
      { status: 500 },
    )
  }
}

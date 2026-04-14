import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { renewDomain } from '@/lib/namecheap'

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { domain } = await request.json()
  if (!domain) {
    return NextResponse.json({ error: 'Missing domain' }, { status: 400 })
  }

  // Verify the domain belongs to this user
  const { data: domainRecord } = await supabase
    .from('domains')
    .select('domain_name')
    .eq('owner_email', user.email)
    .eq('domain_name', domain)
    .single()

  if (!domainRecord) {
    return NextResponse.json({ error: 'Domain not found' }, { status: 404 })
  }

  try {
    const result = await renewDomain(domain, 1)

    if (result.renewed) {
      await supabase
        .from('domains')
        .update({
          expires_at: new Date(result.expireDate || Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq('domain_name', domain)
    }

    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('Domain renew error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to renew domain',
    }, { status: 500 })
  }
}

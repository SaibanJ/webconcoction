import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { registerDomain } from '@/lib/namecheap'
import { createWhmAccount, WHM_PLAN_MAP } from '@/lib/whm'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendFailureAlert } from '@/lib/alerts'
import Stripe from 'stripe'

interface ContactInfo {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  stateProvince?: string
  postalCode?: string
  country?: string
  phone?: string
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 },
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 },
    )
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const metadata = session.metadata || {}

        if (metadata.type === 'domain') {
          const domain = metadata.domain
          const email = metadata.email || session.customer_email || ''
          const sessionId = session.id

          after(async () => {
            try {
              let contactInfo: ContactInfo = {}

              if (metadata.contactInfo) {
                try {
                  contactInfo = JSON.parse(metadata.contactInfo)
                } catch (e) {
                  console.error('Failed to parse contactInfo from metadata:', e)
                }
              }

              const metadataContactInfo: ContactInfo = {
                firstName: metadata.firstName,
                lastName: metadata.lastName,
                email: metadata.emailAddress || metadata.email,
                address1: metadata.address1,
                city: metadata.city,
                stateProvince: metadata.stateProvince,
                postalCode: metadata.postalCode,
                country: metadata.country,
                phone: metadata.phone,
              }

              contactInfo = { ...metadataContactInfo, ...contactInfo }

              const hasAddress = contactInfo.address1 || contactInfo.address
              if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.phone || !hasAddress) {
                console.warn(
                  `Domain registration for ${domain} using partial/default contact info. Provided: ${JSON.stringify(contactInfo)}`,
                )
              }

              if (!domain) {
                throw new Error('Missing domain metadata in Stripe webhook')
              }

              const contactData = {
                firstName: contactInfo.firstName || 'Domain',
                lastName: contactInfo.lastName || 'Owner',
                address1: contactInfo.address1 || contactInfo.address || '123 Main St',
                city: contactInfo.city || 'San Francisco',
                stateProvince: contactInfo.stateProvince || contactInfo.state || 'CA',
                postalCode: contactInfo.postalCode || '94102',
                country: contactInfo.country || 'US',
                phone: contactInfo.phone || '+1.5555555555',
                email: email,
              }

              const result = await registerDomain(
                domain,
                1,
                contactData,
                contactData,
                contactData,
                contactData,
                undefined,
                true,
                true,
              )

              console.log(`Namecheap registration result for ${domain}:`, result)

              if (!result.registered) {
                throw new Error(
                  `Namecheap registration failed for ${domain}: ${JSON.stringify(result)}`,
                )
              }

              const { error: dbError } = await supabase.from('domains').insert({
                owner_email: email,
                domain_name: domain,
                registered_at: new Date().toISOString(),
                expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                namecheap_order_id: result.orderId || '',
              })
              if (dbError) console.error('Supabase insert error (domains):', dbError)

            } catch (domainError) {
              const errMsg = domainError instanceof Error ? domainError.message : String(domainError)
              console.error(`[Webhook] Domain registration failed for ${domain}:`, errMsg)

              await supabase.from('failed_jobs').insert({
                type: 'domain_registration',
                customer_email: email,
                payload: { domain, metadata },
                error: errMsg,
                stripe_session_id: sessionId,
              })

              await sendFailureAlert({
                type: 'domain_registration',
                customerEmail: email,
                subject: `Domain registration failed — ${domain}`,
                details: { Customer: email, Domain: domain },
                error: errMsg,
                stripeSessionId: sessionId,
              })
            }
          })

        } else if (metadata.type === 'hosting') {
          const plan = metadata.plan || 'basic'
          const email = metadata.email || session.customer_email || ''
          const whmUsername = metadata.whmUsername
          const whmDomain = metadata.whmDomain
          const sessionId = session.id
          const customerId = typeof session.customer === 'string' ? session.customer : null
          const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null

          // Recurring Stripe Price IDs — create these in Stripe dashboard and add to env.
          // Prices should be monthly recurring at $19.99 / $49.99 / $99.99.
          const PLAN_PRICE_IDS: Record<string, string> = {
            basic:    process.env.STRIPE_PRICE_ID_BASIC    || '',
            pro:      process.env.STRIPE_PRICE_ID_PRO      || '',
            business: process.env.STRIPE_PRICE_ID_BUSINESS || '',
          }

          after(async () => {
            let subscriptionId = ''
            try {
              const stripe = getStripe()
              const whmPlan = WHM_PLAN_MAP[plan] || 'webcrtae_basic'

              console.log(`[WHM] Creating account: plan=${whmPlan}, domain=${whmDomain}, username=${whmUsername}`)

              const whmResult = await createWhmAccount(whmDomain || email, email, whmPlan, whmUsername)
              console.log(`[WHM] Account created: ${whmResult.username}`)

              // Create the recurring subscription using the saved card.
              // trial_end = 30 days so the customer isn't double-charged
              // (they already paid first month in the upfront checkout).
              const priceId = PLAN_PRICE_IDS[plan]
              if (customerId && paymentIntentId && priceId) {
                const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
                const pmId = typeof pi.payment_method === 'string' ? pi.payment_method : null
                if (pmId) {
                  const subscription = await stripe.subscriptions.create({
                    customer: customerId,
                    default_payment_method: pmId,
                    trial_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
                    items: [{ price: priceId }],
                  })
                  subscriptionId = subscription.id
                  console.log(`[Stripe] Subscription created: ${subscriptionId}`)
                }
              } else {
                console.warn(`[Stripe] Skipping subscription creation — missing customerId, paymentIntentId, or priceId for plan=${plan}`)
              }

              const { error: dbError } = await supabase.from('subscriptions').insert({
                customer_email: email,
                plan,
                stripe_subscription_id: subscriptionId,
                status: 'active',
                whm_username: whmResult.username,
                created_at: new Date().toISOString(),
              })
              if (dbError) console.error('Supabase insert error (subscriptions):', dbError)

              // Invite user to create their dashboard account
              const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
              console.log(`[Supabase] Inviting user: ${email}`)
              const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
                data: { plan, whm_username: whmResult.username },
                redirectTo: `${appUrl}/auth/confirm`,
              })
              if (inviteError) {
                console.error('Supabase invite error:', inviteError.message, inviteError)
              } else {
                console.log(`[Supabase] Invite sent successfully to ${email}`, inviteData?.user?.id)
              }

            } catch (hostingError) {
              const errMsg = hostingError instanceof Error ? hostingError.message : String(hostingError)
              console.error(`[Webhook] Hosting setup failed for ${email}:`, errMsg)

              await supabase.from('failed_jobs').insert({
                type: 'hosting_setup',
                customer_email: email,
                payload: { plan, whmDomain, whmUsername, stripe_subscription_id: subscriptionId, metadata },
                error: errMsg,
                stripe_session_id: sessionId,
              })

              await sendFailureAlert({
                type: 'hosting_setup',
                customerEmail: email,
                subject: `Hosting setup failed — ${email}`,
                details: { Customer: email, Plan: plan, Domain: whmDomain || '(none)', 'Stripe sub': subscriptionId },
                error: errMsg,
                stripeSessionId: sessionId,
              })
            }
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await supabase
          .from('subscriptions')
          .update({ status: subscription.status })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
    }
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({ received: true })
}

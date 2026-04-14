import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

const HOSTING_PLANS: Record<
  string,
  { name: string; priceInCents: number; stripePriceId?: string }
> = {
  basic: { name: 'Basic Hosting', priceInCents: 900 },
  pro: { name: 'Pro Hosting', priceInCents: 2900 },
  business: { name: 'Business Hosting', priceInCents: 9900 },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, domain, plan, email, contactInfo, whmUsername, whmDomain } = body

    if (!type || (type !== 'domain' && type !== 'hosting')) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "domain" or "hosting"' },
        { status: 400 },
      )
    }

    const stripe = getStripe()
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    if (type === 'domain') {
      if (!domain || !email) {
        return NextResponse.json(
          { error: 'Domain and email are required for domain registration' },
          { status: 400 },
        )
      }

      const price = body.price || 12.98

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Domain Registration: ${domain}`,
                description: `1 year registration for ${domain}`,
              },
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: 'domain',
          domain,
          email,
          firstName: contactInfo?.firstName || '',
          lastName: contactInfo?.lastName || '',
          address1: contactInfo?.address1 || '',
          city: contactInfo?.city || '',
          stateProvince: contactInfo?.stateProvince || '',
          postalCode: contactInfo?.postalCode || '',
          country: contactInfo?.country || '',
          phone: contactInfo?.phone || '',
          emailAddress: contactInfo?.email || '',
          contactInfo: contactInfo ? JSON.stringify(contactInfo) : '',
        },
        success_url: `${origin}/checkout/success?type=domain&domain=${encodeURIComponent(domain)}`,
        cancel_url: `${origin}`,
      })

      return NextResponse.json({ url: session.url })
    }

    // Hosting subscription
    if (!plan || !HOSTING_PLANS[plan]) {
      return NextResponse.json(
        { error: 'Invalid hosting plan' },
        { status: 400 },
      )
    }

    const selectedPlan = HOSTING_PLANS[plan]

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPlan.name,
              description: `Monthly ${selectedPlan.name} subscription`,
            },
            unit_amount: selectedPlan.priceInCents,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'hosting',
        plan,
        email: email || '',
        whmUsername: whmUsername || '',
        whmDomain: whmDomain || '',
      },
      success_url: `${origin}/checkout/success?type=hosting&plan=${plan}`,
      cancel_url: `${origin}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create checkout session',
      },
      { status: 500 },
    )
  }
}

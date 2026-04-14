import { NextRequest, NextResponse } from 'next/server'
import { registerDomain } from '@/lib/namecheap'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      domain,
      years = 1,
      registrantInfo,
      techInfo,
      adminInfo,
      auxInfo,
      nameservers,
      addFreeWhoisguard = true,
      enableWhoisguard = true,
    } = body

    if (!domain || !registrantInfo) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: domain and registrantInfo',
        },
        { status: 400 },
      )
    }

    type ContactInput = {
      firstName?: string
      lastName?: string
      email?: string
      emailAddress?: string
      address?: string
      address1?: string
      address2?: string
      city?: string
      state?: string
      stateProvince?: string
      postalCode?: string
      country?: string
      phone?: string
      organizationName?: string
      jobTitle?: string
      fax?: string
    }

    const normalizeContact = (contact: ContactInput): ContactInput => ({
      ...contact,
      email: contact.email || contact.emailAddress || '',
      address1: contact.address1 || contact.address || '',
      stateProvince: contact.stateProvince || contact.state || '',
    })

    const registrant = normalizeContact(registrantInfo as ContactInput)
    const tech = normalizeContact((techInfo as ContactInput) || registrant)
    const admin = normalizeContact((adminInfo as ContactInput) || registrant)
    const aux = normalizeContact((auxInfo as ContactInput) || registrant)

    const result = await registerDomain(
      domain,
      years,
      registrant,
      tech,
      admin,
      aux,
      nameservers,
      addFreeWhoisguard,
      enableWhoisguard,
    )

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error registering domain:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    )
  }
}

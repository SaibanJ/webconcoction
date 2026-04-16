import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
})

function getProxyUrl(): string {
  return `${process.env.WHM_PROXY_URL}/namecheap`
}

function getProxyHeaders(): Record<string, string> {
  return { 'x-proxy-secret': process.env.WHM_PROXY_SECRET || '' }
}

// Base params no longer include credentials — proxy injects those server-side
function getBaseParams(): Record<string, string> {
  return {}
}

async function namecheapGet(params: Record<string, string>): Promise<string> {
  const response = await axios.post(
    getProxyUrl(),
    { ...params, _method: 'GET' },
    { headers: getProxyHeaders() }
  )
  return response.data
}

async function namecheapPost(params: Record<string, string>): Promise<string> {
  const response = await axios.post(
    getProxyUrl(),
    params,
    { headers: getProxyHeaders() }
  )
  return response.data
}

export interface DomainCheckResult {
  domain: string
  available: boolean
  price: number
  premium: boolean
}

export async function checkDomainAvailability(
  domain: string,
): Promise<DomainCheckResult> {
  const params = {
    ...getBaseParams(),
    Command: 'namecheap.domains.check',
    DomainList: domain,
  }

  const data = await namecheapGet(params)
  const parsed = parser.parse(data)

  const apiResponse = parsed.ApiResponse
  if (apiResponse['@_Status'] === 'ERROR') {
    const errors = apiResponse.Errors?.Error
    const message = Array.isArray(errors)
      ? errors.map((e: { '#text': string }) => e['#text']).join(', ')
      : errors?.['#text'] || 'Unknown Namecheap API error'
    throw new Error(message)
  }

  const result = apiResponse.CommandResponse?.DomainCheckResult

  const available = result?.['@_Available'] === 'true'
  const isPremium = result?.['@_IsPremiumName'] === 'true'

  // Fetch pricing if available
  let price = 0
  if (available) {
    price = await getDomainPrice(domain)
  }

  return {
    domain,
    available,
    price,
    premium: isPremium,
  }
}

async function getDomainPrice(domain: string): Promise<number> {
  const tld = domain.split('.').slice(1).join('.')

  const params = {
    ...getBaseParams(),
    Command: 'namecheap.users.getPricing',
    ProductType: 'DOMAIN',
    ProductCategory: 'REGISTER',
    ProductName: tld || 'com',
  }

  try {
    const data = await namecheapGet(params)
    const parsed = parser.parse(data)

    const apiResponse = parsed.ApiResponse
    if (apiResponse['@_Status'] === 'ERROR') {
      // Fall back to default pricing if API fails
      return getDefaultPrice(tld)
    }

    const productType =
      apiResponse.CommandResponse?.UserGetPricingResult?.ProductType
    const productCategory = productType?.ProductCategory

    // Navigate the pricing structure
    const product = Array.isArray(productCategory?.Product)
      ? productCategory.Product.find(
          (p: { '@_Name': string }) => p['@_Name'] === (tld || 'com'),
        )
      : productCategory?.Product

    const priceEntry = product?.Price
    const priceValue = Array.isArray(priceEntry)
      ? priceEntry[0]?.['@_YourPrice']
      : priceEntry?.['@_YourPrice']

    return priceValue ? parseFloat(priceValue) : getDefaultPrice(tld)
  } catch {
    return getDefaultPrice(tld)
  }
}

function getDefaultPrice(tld: string): number {
  const prices: Record<string, number> = {
    com: 12.98,
    net: 13.98,
    org: 12.98,
    io: 39.98,
    dev: 15.98,
    app: 17.98,
    co: 29.98,
    xyz: 2.98,
    tech: 9.98,
    ai: 79.98,
  }
  return prices[tld] || 14.98
}

export interface DomainRegistrationParams {
  domain: string
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  years?: number
}

export interface ContactInfo {
  firstName?: string
  lastName?: string
  address1?: string
  address2?: string
  city?: string
  stateProvince?: string
  postalCode?: string
  country?: string
  phone?: string
  email?: string
  organizationName?: string
  jobTitle?: string
  fax?: string
}

/**
 * Get extended attributes required for specific TLDs
 * Per Namecheap API: Extended attributes are required for .us, .eu, .ca, .co.uk, .org.uk, .me.uk, .nu, .com.au, .net.au, .org.au, .es, .nom.es, .com.es, .org.es, .de, .fr
 */
function getExtendedAttributesForTld(domain: string): Record<string, string> {
  const tld = domain.split('.').pop()?.toLowerCase() || ''
  const attributes: Record<string, Record<string, string>> = {
    us: { 'x-registrant-nexus-category': 'C31' }, // Default US nexus category
    eu: { 'x-eu-registrant-lang': 'en' }, // Default language
    ca: { 'x-registrant-lang': 'en' }, // Default language
    // Add more TLDs as needed
  }
  return attributes[tld] || {}
}

export interface NamecheapDomainCreateResult {
  domain: string
  registered: boolean
  chargedAmount?: string
  domainId?: string
  orderId?: string
  transactionId?: string
  whoisguardEnable: boolean
  nonRealTimeDomain: boolean
}

type NormalizedContactInfo = {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  phone: string
  email: string
  organizationName?: string
  jobTitle?: string
  fax?: string
}

/**
 * Normalize phone to Namecheap format: +CountryCode.LocalNumber
 * e.g. "+15551234567" or "5551234567" → "+1.5551234567"
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return phone

  // 10 digits = US number without country code
  if (digits.length === 10) return `+1.${digits}`
  // 11 digits starting with 1 = US number with country code
  if (digits.length === 11 && digits.startsWith('1'))
    return `+1.${digits.slice(1)}`
  // Already has country code prefix — assume first 1-3 digits are CC
  // Try to split: 1-digit CC (length 11), 2-digit CC (length 12), 3-digit CC (length 13)
  if (digits.length >= 11 && digits.length <= 13) {
    const ccLen = digits.length - 10
    return `+${digits.slice(0, ccLen)}.${digits.slice(ccLen)}`
  }

  return phone // Return as-is if we can't parse it
}

function normalizeContactInfo(contact: ContactInfo): NormalizedContactInfo {
  return {
    firstName: contact.firstName || '',
    lastName: contact.lastName || '',
    address1: contact.address1 || '',
    address2: contact.address2,
    city: contact.city || '',
    stateProvince: contact.stateProvince || '',
    postalCode: contact.postalCode || '',
    country: contact.country || '',
    phone: contact.phone ? normalizePhone(contact.phone) : '',
    email: contact.email || '',
    organizationName: contact.organizationName,
    jobTitle: contact.jobTitle,
    fax: contact.fax,
  }
}

export async function registerDomain(
  domain: string,
  years: number,
  registrantInfo: ContactInfo,
  techInfo: ContactInfo,
  adminInfo: ContactInfo,
  auxInfo: ContactInfo,
  nameservers?: string[],
  addFreeWhoisguard: boolean = true,
  enableWhoisguard: boolean = true,
): Promise<NamecheapDomainCreateResult> {
  const registrant = normalizeContactInfo(registrantInfo)
  const tech = normalizeContactInfo(techInfo)
  const admin = normalizeContactInfo(adminInfo)
  const aux = normalizeContactInfo(auxInfo)

  console.log(
    `[Namecheap] Registering domain: ${domain} in ${
      process.env.NAMECHEAP_SANDBOX === 'true' ? 'SANDBOX' : 'PRODUCTION'
    } mode`,
  )
  console.log('[Namecheap] Contact Info:', {
    registrant,
    tech,
    admin,
    auxBilling: aux,
  })

  // Build request parameters per Namecheap API specification
  const baseParams = getBaseParams()
  const requestData: Record<string, string> = {
    ...baseParams,
    Command: 'namecheap.domains.create',
    DomainName: domain,
    Years: String(years || 1),
    // Registrant contact (REQUIRED)
    RegistrantFirstName: registrant.firstName,
    RegistrantLastName: registrant.lastName,
    RegistrantAddress1: registrant.address1,
    ...(registrant.address2 && {
      RegistrantAddress2: registrant.address2,
    }),
    RegistrantCity: registrant.city,
    RegistrantStateProvince: registrant.stateProvince,
    RegistrantPostalCode: registrant.postalCode,
    RegistrantCountry: registrant.country,
    RegistrantPhone: registrant.phone,
    RegistrantEmailAddress: registrant.email,
    ...(registrant.organizationName && {
      RegistrantOrganizationName: registrant.organizationName,
    }),
    ...(registrant.jobTitle && {
      RegistrantJobTitle: registrant.jobTitle,
    }),
    ...(registrant.fax && { RegistrantFax: registrant.fax }),
    // Tech contact (REQUIRED)
    TechFirstName: tech.firstName,
    TechLastName: tech.lastName,
    TechAddress1: tech.address1,
    ...(tech.address2 && { TechAddress2: tech.address2 }),
    TechCity: tech.city,
    TechStateProvince: tech.stateProvince,
    TechPostalCode: tech.postalCode,
    TechCountry: tech.country,
    TechPhone: tech.phone,
    TechEmailAddress: tech.email,
    ...(tech.organizationName && {
      TechOrganizationName: tech.organizationName,
    }),
    ...(tech.jobTitle && { TechJobTitle: tech.jobTitle }),
    ...(tech.fax && { TechFax: tech.fax }),
    // Admin contact (REQUIRED)
    AdminFirstName: admin.firstName,
    AdminLastName: admin.lastName,
    AdminAddress1: admin.address1,
    ...(admin.address2 && { AdminAddress2: admin.address2 }),
    AdminCity: admin.city,
    AdminStateProvince: admin.stateProvince,
    AdminPostalCode: admin.postalCode,
    AdminCountry: admin.country,
    AdminPhone: admin.phone,
    AdminEmailAddress: admin.email,
    ...(admin.organizationName && {
      AdminOrganizationName: admin.organizationName,
    }),
    ...(admin.jobTitle && { AdminJobTitle: admin.jobTitle }),
    ...(admin.fax && { AdminFax: admin.fax }),
    // AuxBilling contact (REQUIRED)
    AuxBillingFirstName: aux.firstName,
    AuxBillingLastName: aux.lastName,
    AuxBillingAddress1: aux.address1,
    ...(aux.address2 && { AuxBillingAddress2: aux.address2 }),
    AuxBillingCity: aux.city,
    AuxBillingStateProvince: aux.stateProvince,
    AuxBillingPostalCode: aux.postalCode,
    AuxBillingCountry: aux.country,
    AuxBillingPhone: aux.phone,
    AuxBillingEmailAddress: aux.email,
    ...(aux.organizationName && {
      AuxBillingOrganizationName: aux.organizationName,
    }),
    ...(aux.jobTitle && { AuxBillingJobTitle: aux.jobTitle }),
    ...(aux.fax && { AuxBillingFax: aux.fax }),
    // Whoisguard options
    AddFreeWhoisguard: addFreeWhoisguard ? 'yes' : 'no',
    WGEnabled: enableWhoisguard ? 'yes' : 'no',
  }

  // Add nameservers if provided
  if (nameservers && nameservers.length > 0) {
    requestData.Nameservers = nameservers.join(',')
  }

  // Add extended attributes for TLDs that require them
  const extendedAttrs = getExtendedAttributesForTld(domain)
  Object.entries(extendedAttrs).forEach(([key, value], index) => {
    requestData[`${key}${index + 1}`] = value
  })

  try {
    const data = await namecheapPost(requestData)
    const parsed = parser.parse(data)

    const apiResponse = parsed.ApiResponse
    if (apiResponse['@_Status'] === 'ERROR') {
      const errors = apiResponse.Errors?.Error
      const message = Array.isArray(errors)
        ? errors.map((e: { '#text': string }) => e['#text']).join(', ')
        : errors?.['#text'] || 'Domain registration failed'
      console.error(`[Namecheap] Registration failed for ${domain}:`, message)
      throw new Error(message)
    }

    const result = apiResponse.CommandResponse?.DomainCreateResult

    // Extract response fields as per Namecheap API
    const orderId =
      result?.['@_OrderID'] ||
      result?.['@_OrderId'] ||
      result?.['@_TransactionId']

    const responseData = {
      domain: result?.['@_Domain'] || domain,
      registered: result?.['@_Registered'] === 'true',
      chargedAmount: result?.['@_ChargedAmount'],
      domainId: result?.['@_DomainID'],
      orderId: orderId,
      transactionId: result?.['@_TransactionId'],
      whoisguardEnable: result?.['@_WhoisguardEnable'] === 'true',
      nonRealTimeDomain: result?.['@_NonRealTimeDomain'] === 'true',
    }

    console.log(
      `[Namecheap] Registration successful for ${domain}. Order ID: ${orderId}, Registered: ${responseData.registered}`,
    )

    return responseData
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'Registration failed'
    console.error(
      `[Namecheap] Exception during registration for ${domain}:`,
      errorMsg,
    )
    throw error
  }
}

export interface DomainTransferResult {
  domain: string
  transfer: boolean
  transferId?: string
  orderId?: string
  transactionId?: string
  chargedAmount?: string
  statusCode?: string
}

export async function transferDomain(
  domain: string,
  eppCode: string,
  addWhoisguard: boolean = true,
): Promise<DomainTransferResult> {
  // Base64-encode EPP code if it contains special characters
  const hasSpecialChars = /[^a-zA-Z0-9]/.test(eppCode)
  const encodedEpp = hasSpecialChars
    ? `base64:${Buffer.from(eppCode).toString('base64')}`
    : eppCode

  const params = {
    ...getBaseParams(),
    Command: 'namecheap.domains.transfer.create',
    DomainName: domain,
    Years: '1',
    EPPCode: encodedEpp,
    AddFreeWhoisguard: addWhoisguard ? 'yes' : 'no',
    WGenable: addWhoisguard ? 'yes' : 'no',
  }

  const data = await namecheapGet(params)
  const parsed = parser.parse(data)

  const apiResponse = parsed.ApiResponse
  if (apiResponse['@_Status'] === 'ERROR') {
    const errors = apiResponse.Errors?.Error
    const message = Array.isArray(errors)
      ? errors.map((e: { '#text': string }) => e['#text']).join(', ')
      : errors?.['#text'] || 'Unknown Namecheap API error'
    throw new Error(message)
  }

  const result = apiResponse.CommandResponse?.DomainTransferCreateResult

  return {
    domain: result?.['@_Domainname'] || domain,
    transfer: result?.['@_Transfer'] === 'true',
    transferId: result?.['@_TransferID'],
    orderId: result?.['@_OrderID'],
    transactionId: result?.['@_TransactionID'],
    chargedAmount: result?.['@_ChargedAmount'],
    statusCode: result?.['@_StatusCode'],
  }
}

export interface DomainInfo {
  domain: string
  created: string
  expires: string
  isExpired: boolean
  isLocked: boolean
  autoRenew: boolean
}

export async function getDomainInfo(domain: string): Promise<DomainInfo> {
  const params = {
    ...getBaseParams(),
    Command: 'namecheap.domains.getInfo',
    DomainName: domain,
  }

  const data = await namecheapGet(params)
  const parsed = parser.parse(data)

  const apiResponse = parsed.ApiResponse
  if (apiResponse['@_Status'] === 'ERROR') {
    const errors = apiResponse.Errors?.Error
    const message = Array.isArray(errors)
      ? errors.map((e: { '#text': string }) => e['#text']).join(', ')
      : errors?.['#text'] || 'Unknown Namecheap API error'
    throw new Error(message)
  }

  const info = apiResponse.CommandResponse?.DomainGetInfoResult
  const details = info?.DomainDetails

  return {
    domain,
    created: details?.CreatedDate || '',
    expires: details?.ExpiredDate || '',
    isExpired: info?.['@_IsExpired'] === 'true',
    isLocked: info?.['@_IsLocked'] === 'true',
    autoRenew: info?.['@_AutoRenew'] === 'true',
  }
}

export async function renewDomain(
  domain: string,
  years: number = 1,
): Promise<{ renewed: boolean; expireDate: string; chargedAmount: string }> {
  const params = {
    ...getBaseParams(),
    Command: 'namecheap.domains.renew',
    DomainName: domain,
    Years: String(years),
  }

  const data = await namecheapGet(params)
  const parsed = parser.parse(data)

  const apiResponse = parsed.ApiResponse
  if (apiResponse['@_Status'] === 'ERROR') {
    const errors = apiResponse.Errors?.Error
    const message = Array.isArray(errors)
      ? errors.map((e: { '#text': string }) => e['#text']).join(', ')
      : errors?.['#text'] || 'Unknown Namecheap API error'
    throw new Error(message)
  }

  const result = apiResponse.CommandResponse?.DomainRenewResult
  return {
    renewed: result?.['@_Renewed'] === 'true',
    expireDate: result?.['@_ExpireDate'] || '',
    chargedAmount: result?.['@_ChargedAmount'] || '',
  }
}

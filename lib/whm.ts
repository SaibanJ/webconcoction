import axios from 'axios'
import https from 'https'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const WHM_PLAN_MAP: Record<string, string> = {
  basic: 'webcrtae_basic',
  pro: 'webcrtae_pro',
  business: 'webcrtae_elite',
}

function getWhmClient() {
  const host = process.env.WHM_HOST
  const username = process.env.WHM_USERNAME
  const token = process.env.WHM_API_TOKEN

  if (!host || !username || !token) {
    throw new Error('Missing WHM environment variables (WHM_HOST, WHM_USERNAME, WHM_API_TOKEN)')
  }

  console.log(`[WHM] Using host=${host} username=${username} token=${token.slice(0, 6)}...`)

  const client = axios.create({
    baseURL: `https://${host}:2087/json-api`,
    headers: {
      Authorization: `whm ${username}:${token}`,
    },
    httpsAgent,
  })

  return client
}

export interface WhmAccountResult {
  username: string
  domain: string
  password: string
  success: boolean
  rawResult?: unknown
}

/**
 * Derive a valid cPanel username from a domain name.
 * Rules: max 8 chars, lowercase alphanumeric, must start with a letter.
 */
function deriveUsername(domain: string): string {
  const base = domain
    .split('.')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 8)

  // Ensure it starts with a letter
  return /^[a-z]/.test(base) ? base : `u${base}`.slice(0, 8)
}

function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*'
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function createWhmAccount(
  domain: string,
  email: string,
  plan = 'default',
  preferredUsername?: string,
): Promise<WhmAccountResult> {
  const client = getWhmClient()
  const username = preferredUsername
    ? preferredUsername.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8)
    : deriveUsername(domain)
  const password = generatePassword()

  console.log(`[WHM] Creating account for domain: ${domain}, username: ${username}`)

  const params = new URLSearchParams({
    username,
    domain,
    password,
    contactemail: email,
    plan,
    featurelist: 'default',
    quota: '0', // unlimited
    ip: 'n', // shared IP
    cgi: '1',
    frontpage: '0',
    hasshell: '0',
    reseller: '0',
  })

  let response
  try {
    response = await client.post(`/createacct?${params.toString()}`)
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response: { status: number; data: unknown } }
      console.error(`[WHM] HTTP ${axiosErr.response.status} response body:`, JSON.stringify(axiosErr.response.data))
    }
    throw err
  }
  const data = response.data

  const success = data?.result?.[0]?.status === 1
  if (!success) {
    const reason = data?.result?.[0]?.statusmsg || 'Unknown WHM error'
    console.error(`[WHM] Account creation failed for ${domain}: ${reason}`)
    throw new Error(`WHM account creation failed: ${reason}`)
  }

  console.log(`[WHM] Account created successfully for ${domain} (user: ${username})`)

  return {
    username,
    domain,
    password,
    success: true,
    rawResult: data?.result?.[0],
  }
}

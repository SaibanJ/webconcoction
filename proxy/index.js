require('dotenv').config()
const express = require('express')
const axios = require('axios')
const https = require('https')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const WHM_HOST = process.env.WHM_HOST
const WHM_USERNAME = process.env.WHM_USERNAME
const WHM_API_TOKEN = process.env.WHM_API_TOKEN
const NAMECHEAP_USERNAME = process.env.NAMECHEAP_USERNAME
const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY
const NAMECHEAP_SANDBOX = process.env.NAMECHEAP_SANDBOX === 'true'
const PROXY_SECRET = process.env.PROXY_SECRET
const PORT = process.env.PORT || 3001

function verifySecret(req, res) {
  const secret = req.headers['x-proxy-secret']
  if (!secret || secret !== PROXY_SECRET) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}

// WHM: create cPanel session
app.post('/cpanel-session', async (req, res) => {
  if (!verifySecret(req, res)) return

  const { username } = req.body
  if (!username) return res.status(400).json({ error: 'Missing username' })

  try {
    const response = await axios.get(
      `https://${WHM_HOST}:2087/json-api/create_user_session`,
      {
        params: { 'api.version': '1', user: username, service: 'cpaneld' },
        headers: { Authorization: `whm ${WHM_USERNAME}:${WHM_API_TOKEN}` },
        httpsAgent,
      }
    )

    const url = response.data?.data?.url
    if (!url) return res.status(500).json({ error: 'No session URL returned from WHM' })

    return res.json({ url })
  } catch (err) {
    console.error('WHM error:', err?.response?.data || err.message)
    return res.status(500).json({ error: 'WHM request failed' })
  }
})

// Namecheap: forward any API call with whitelisted IP injected
app.post('/namecheap', async (req, res) => {
  if (!verifySecret(req, res)) return

  const baseUrl = NAMECHEAP_SANDBOX
    ? 'https://api.sandbox.namecheap.com/xml.response'
    : 'https://api.namecheap.com/xml.response'

  // Merge incoming params but override credentials and ClientIp with server values
  const params = new URLSearchParams({
    ...req.body,
    ApiUser: NAMECHEAP_USERNAME,
    ApiKey: NAMECHEAP_API_KEY,
    UserName: NAMECHEAP_USERNAME,
    ClientIp: '157.230.219.85', // this droplet's whitelisted IP
  })

  try {
    const method = req.body._method === 'GET' ? 'get' : 'post'
    let response

    if (method === 'get') {
      response = await axios.get(`${baseUrl}?${params.toString()}`)
    } else {
      response = await axios.post(baseUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
    }

    return res.send(response.data)
  } catch (err) {
    console.error('Namecheap error:', err?.response?.data || err.message)
    return res.status(500).json({ error: 'Namecheap request failed' })
  }
})

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`))

const express = require('express')
const axios = require('axios')
const https = require('https')

const app = express()
app.use(express.json())

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const WHM_HOST = process.env.WHM_HOST
const WHM_USERNAME = process.env.WHM_USERNAME
const WHM_API_TOKEN = process.env.WHM_API_TOKEN
const PROXY_SECRET = process.env.PROXY_SECRET
const PORT = process.env.PORT || 3001

app.post('/cpanel-session', async (req, res) => {
  // Verify shared secret
  const secret = req.headers['x-proxy-secret']
  if (!secret || secret !== PROXY_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { username } = req.body
  if (!username) {
    return res.status(400).json({ error: 'Missing username' })
  }

  try {
    const response = await axios.get(
      `https://${WHM_HOST}:2087/json-api/create_user_session`,
      {
        params: { 'api.version': '1', user: username },
        headers: { Authorization: `whm ${WHM_USERNAME}:${WHM_API_TOKEN}` },
        httpsAgent,
      }
    )

    const url = response.data?.data?.url
    if (!url) {
      return res.status(500).json({ error: 'No session URL returned from WHM' })
    }

    return res.json({ url })
  } catch (err) {
    console.error('WHM error:', err?.response?.data || err.message)
    return res.status(500).json({ error: 'WHM request failed' })
  }
})

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`))

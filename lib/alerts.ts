interface FailureAlertParams {
  type: 'domain_registration' | 'hosting_setup' | 'domain_transfer'
  customerEmail: string
  subject: string
  details: Record<string, string>
  error: string
  stripeSessionId?: string
}

export async function sendFailureAlert(params: FailureAlertParams) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[Alert] RESEND_API_KEY not set — skipping email alert')
    return
  }

  const fromEmail = process.env.ALERT_FROM_EMAIL
  const toEmail = process.env.ALERT_TO_EMAIL

  if (!fromEmail || !toEmail) {
    console.error('[Alert] ALERT_FROM_EMAIL or ALERT_TO_EMAIL not set — skipping email alert')
    return
  }

  const detailRows = Object.entries(params.details)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#888;white-space:nowrap">${k}</td><td style="padding:4px 0;color:#fff">${v}</td></tr>`)
    .join('')

  const html = `
    <div style="font-family:monospace;background:#0d0d0d;color:#fff;padding:24px;border-radius:8px;max-width:560px">
      <div style="color:#f87171;font-size:18px;font-weight:bold;margin-bottom:16px">
        ⚠ ${params.subject}
      </div>
      <table style="border-collapse:collapse;margin-bottom:16px">
        ${detailRows}
        ${params.stripeSessionId ? `<tr><td style="padding:4px 12px 4px 0;color:#888">Stripe session</td><td style="padding:4px 0;color:#fff">${params.stripeSessionId}</td></tr>` : ''}
      </table>
      <div style="background:#1a0000;border:1px solid #7f1d1d;border-radius:6px;padding:12px;color:#fca5a5;font-size:13px;word-break:break-all">
        ${params.error}
      </div>
      <div style="margin-top:16px;color:#666;font-size:12px">
        Check your <strong style="color:#aaa">failed_jobs</strong> table in Supabase to retry.
      </div>
    </div>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `[WebConcoction] FAILED: ${params.subject}`,
        html,
        text: `FAILED: ${params.subject}\n\nCustomer: ${params.customerEmail}\nError: ${params.error}\n${params.stripeSessionId ? `Stripe session: ${params.stripeSessionId}` : ''}\n\nCheck failed_jobs table in Supabase to retry.`,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[Alert] Resend API error:', res.status, body)
    } else {
      console.log(`[Alert] Failure alert sent for ${params.type} — ${params.customerEmail}`)
    }
  } catch (err) {
    console.error('[Alert] Failed to send alert email:', err)
  }
}

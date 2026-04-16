import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.ALERT_TO_EMAIL

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      )
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WebConcoction <support@webconcoction.com>',
        to: toEmail,
        reply_to: email,
        subject: `New message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;background:#0d0d0d;color:#fff;padding:24px;border-radius:8px">
            <div style="margin-bottom:20px">
              <span style="background:#8b5cf6;color:#fff;font-size:12px;font-weight:600;padding:4px 10px;border-radius:20px">
                New Contact Message
              </span>
            </div>
            <table style="border-collapse:collapse;margin-bottom:20px;width:100%">
              <tr>
                <td style="padding:6px 16px 6px 0;color:#9ca3af;white-space:nowrap;font-size:13px">Name</td>
                <td style="padding:6px 0;color:#fff;font-size:13px">${name}</td>
              </tr>
              <tr>
                <td style="padding:6px 16px 6px 0;color:#9ca3af;white-space:nowrap;font-size:13px">Email</td>
                <td style="padding:6px 0;font-size:13px">
                  <a href="mailto:${email}" style="color:#8b5cf6">${email}</a>
                </td>
              </tr>
            </table>
            <div style="background:#111;border:1px solid #1f1f1f;border-radius:6px;padding:16px;color:#d1d5db;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</div>
            <div style="margin-top:20px;color:#4b5563;font-size:12px">
              Reply to this email to respond directly to ${name}.
            </div>
          </div>
        `,
        text: `New message from ${name} (${email}):\n\n${message}`,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[Contact] Resend error:', res.status, body)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

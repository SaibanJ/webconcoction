import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#050510',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow blob */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            top: -100,
            left: 250,
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            WebConcoction
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 12,
            letterSpacing: '-2px',
          }}
        >
          Your Web Journey
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#8b5cf6',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 32,
            letterSpacing: '-2px',
          }}
        >
          Starts Here
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: '#6b7280',
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
        >
          Custom Websites · Premium Domains · Enterprise Hosting
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}

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
            <svg fill="white" width="34" height="34" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M26,19.72a10,10,0,0,0-6-8.88V8h1a1,1,0,0,0,0-2H11a1,1,0,0,0,0,2h1v2.84a10,10,0,0,0-5.84,7.44A9,9,0,0,0,6,20a2.62,2.62,0,0,0,0,.28,10,10,0,0,0,19.84,1.44A9.74,9.74,0,0,0,26,20,2.62,2.62,0,0,0,26,19.72Zm-2.16,1.93A8,8,0,0,1,8,20.36c0-.12,0-.24,0-.36a7.43,7.43,0,0,1,.18-1.64,8,8,0,0,1,5.15-5.89,1,1,0,0,0,.67-1V8h4v3.52a1,1,0,0,0,.67,1A8,8,0,0,1,24,19.64,2.17,2.17,0,0,1,24,20,8.17,8.17,0,0,1,23.83,21.65Z"/>
              <path d="M22,20a6,6,0,0,1-12,0,5.29,5.29,0,0,1,.1-1.06l.33.16a5.12,5.12,0,0,0,2.57.62,5.12,5.12,0,0,0,2.57-.62A6.84,6.84,0,0,1,19,18.28a6.75,6.75,0,0,1,2.89.57A6.23,6.23,0,0,1,22,20Z"/>
              <path d="M8,8a.76.76,0,0,1-.75.75,1.51,1.51,0,0,0-1.5,1.5.75.75,0,0,1-1.5,0,1.5,1.5,0,0,0-1.5-1.5.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,1.51,1.51,0,0,0,1.5,1.5A.76.76,0,0,1,8,8Z"/>
              <path d="M30,5a.76.76,0,0,1-.75.75,1.51,1.51,0,0,0-1.5,1.5.75.75,0,0,1-1.5,0,1.5,1.5,0,0,0-1.5-1.5.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,1.51,1.51,0,0,0,1.5,1.5A.76.76,0,0,1,30,5Z"/>
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

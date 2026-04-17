import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="110" height="110" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 2h6v6l3.5 7A2 2 0 0 1 14.7 18H5.3a2 2 0 0 1-1.8-3L7 8V2z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M5.8 14.5c.5-.3 1.2-.5 2-.5s1.8.3 2.6.5c.7.2 1.4.3 2 .1L14 17a2 2 0 0 1-1.8 1H7.8A2 2 0 0 1 6 16.7l-.2-.4z"
            fill="#a78bfa"
          />
          <rect x="8" y="2" width="2" height="6" rx="0.5" fill="white" fillOpacity="0.3" />
        </svg>
      </div>
    ),
    { ...size },
  )
}

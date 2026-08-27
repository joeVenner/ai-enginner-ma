import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b', // zinc-950
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo / Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            padding: '32px',
            borderRadius: '32px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6" // blue-500
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        </div>

        {/* Site Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontFamily: 'sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          {siteConfig.name}
        </div>

        {/* Site Description */}
        <div
          style={{
            display: 'flex',
            fontSize: 42,
            fontFamily: 'sans-serif',
            fontWeight: 500,
            color: '#a1a1aa', // zinc-400
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </div>

        {/* URL Banner */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '40px',
            fontSize: 28,
            fontWeight: 600,
            color: '#3b82f6', // blue-500
            letterSpacing: '0.05em',
          }}
        >
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
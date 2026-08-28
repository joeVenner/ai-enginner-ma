import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

// Route segment config


// Image metadata
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(to bottom right, #020617, #0F172A)', // Slate 950 to Slate 900
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '100px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(to bottom right, #10B981, #047857)', // Emerald
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 40,
              fontWeight: 800,
              boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)',
            }}
          >
            AE
          </div>
          <h2 style={{ color: '#10B981', fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
            aiengineer.ma
          </h2>
        </div>

        <h1
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {siteConfig.name}
        </h1>

        <p
          style={{
            fontSize: 42,
            color: '#94A3B8', // Slate 400
            maxWidth: '850px',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </p>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

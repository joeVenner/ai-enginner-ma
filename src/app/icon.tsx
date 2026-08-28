import { ImageResponse } from 'next/og';

// Route segment config


// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(to bottom right, #10B981, #047857)', // Emerald 500 to Emerald 700
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        AE
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

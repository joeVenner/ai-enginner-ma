import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/content';
import { siteConfig } from '@/config/site';

export const alt = 'Article Cover';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const title = article?.frontmatter.title || siteConfig.name;
  const category = article?.frontmatter.category || siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#09090b', // zinc-950
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo / Site Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 'auto',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6" // blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '16px' }}
          >
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#f4f4f5' }}>
            {siteConfig.name}
          </span>
        </div>

        {/* Category Tag */}
        {category && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 24px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500 with opacity
              color: '#60a5fa', // blue-400
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            {category}
          </div>
        )}

        {/* Article Title */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 50 ? 64 : 84,
            fontFamily: 'sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '40px',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {/* Website URL Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            fontSize: 28,
            color: '#a1a1aa', // zinc-400
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
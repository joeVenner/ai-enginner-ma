import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/content';
import { siteConfig } from '@/config/site';



export const alt = 'Article Open Graph Image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // Fetch article data
  const article = await getArticleBySlug(params.slug);

  // Fallback to default if article not found
  if (!article) {
    return new ImageResponse(
      (
        <div style={{ background: '#0F172A', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', fontSize: 60 }}>{siteConfig.name}</h1>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #020617, #0F172A)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: 60,
              height: 60,
              background: '#10B981',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            AE
          </div>
          <h2 style={{ color: '#10B981', fontSize: 32, fontWeight: 700, margin: 0 }}>
            {siteConfig.name}
          </h2>
        </div>

        {/* Article Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: 'auto', marginBottom: 'auto' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {article.frontmatter.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} style={{
                color: '#10B981',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: 24,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: '1000px',
              margin: 0,
            }}
          >
            {article.frontmatter.title}
          </h1>
        </div>

        {/* Footer info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             {/* Text representing avatar and author */}
             <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span style={{ color: 'white', fontSize: 32, fontWeight: 600 }}>{article.frontmatter.author || siteConfig.author.name}</span>
               <span style={{ color: '#94A3B8', fontSize: 24 }}>{article.frontmatter.date}</span>
             </div>
          </div>
          <div style={{ color: '#94A3B8', fontSize: 28, fontWeight: 500 }}>
            Read on aiengineer.ma
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

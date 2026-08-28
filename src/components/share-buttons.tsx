'use client';

import { siteConfig } from '@/config/site';
import { CopyLinkButton } from './copy-link-button';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `${siteConfig.url}/articles/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const trackShare = () => {
    try {
      const metricsStr = localStorage.getItem('reader-metrics-v1');
      if (metricsStr) {
         const metrics = JSON.parse(metricsStr);
         if (!metrics.shares) metrics.shares = {};
         metrics.shares[slug] = (metrics.shares[slug] || 0) + 1;
         localStorage.setItem('reader-metrics-v1', JSON.stringify(metrics));
      } else {
         localStorage.setItem('reader-metrics-v1', JSON.stringify({
           pageViews: 0,
           articleViews: {},
           timeOnSite: 0,
           lastVisited: null,
           bookmarks: {},
           claps: {},
           shares: { [slug]: 1 }
         }));
      }
    } catch (e) {
      console.error('Error tracking share', e);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackShare}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/30 text-muted-foreground transition-all hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
        aria-label="Share on Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      </a>
      
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackShare}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/30 text-muted-foreground transition-all hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]"
        aria-label="Share on LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </a>

      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackShare}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/30 text-muted-foreground transition-all hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
        aria-label="Share on Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      </a>

      <div className="h-4 w-px bg-border/50 mx-1 hidden sm:block"></div>
      
      <CopyLinkButton slug={slug} className="ml-1" />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Share, MessageSquare, Link2, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  // Create URL handling SSR correctly
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/articles/${slug}` 
    : `${siteConfig.url}/articles/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`I'm reading "${title}" on AI Engineer\n\n`);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 text-sm font-medium text-muted-foreground">Share:</span>
      
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        title="Share on Twitter"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="sr-only">Share on Twitter</span>
      </a>
      
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        title="Share on LinkedIn"
      >
        <Share className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </a>
      
      <button
        onClick={handleCopyLink}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        title="Copy link"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        <span className="sr-only">Copy link</span>
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface CopyLinkButtonProps {
  slug: string;
  className?: string;
}

export function CopyLinkButton({ slug, className = '' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = typeof window !== 'undefined' 
        ? window.location.href 
        : `${siteConfig.url}/articles/${slug}`;
        
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      aria-label="Copy link to clipboard"
      title="Copy link"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-green-500" />
          <span className="text-green-500">Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
}

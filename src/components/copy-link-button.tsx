
'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

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
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
            aria-label="Copy link to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Link2 className="h-4 w-4 transition-transform hover:scale-110" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Copied!' : 'Copy Link'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

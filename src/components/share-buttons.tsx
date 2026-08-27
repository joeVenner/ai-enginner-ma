'use client';

import { useState, useEffect } from 'react';
import { Share, MessageSquare, Link2, Check, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
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

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="mr-2 text-sm font-medium text-muted-foreground">Share:</span>
        <div className="h-9 w-9 rounded-full bg-secondary"></div>
        <div className="h-9 w-9 rounded-full bg-secondary"></div>
        <div className="h-9 w-9 rounded-full bg-secondary"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 text-sm font-medium text-muted-foreground">Share:</span>
      
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#comments-section"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Jump to comments</span>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Jump to comments</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Twitter</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Share className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on LinkedIn</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopyLink}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
              <span className="sr-only">Copy link</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? 'Copied!' : 'Copy link'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

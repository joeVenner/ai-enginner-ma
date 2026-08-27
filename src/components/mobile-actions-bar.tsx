'use client';

import { useEffect, useState } from 'react';
import { ClapButton } from '@/components/clap-button';
import { BookmarkButton } from '@/components/bookmark-button';
import { MessageSquare, Share } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { CopyLinkButton } from './copy-link-button';

interface MobileActionsBarProps {
  title: string;
  slug: string;
}

export function MobileActionsBar({ title, slug }: MobileActionsBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setCanNativeShare(true);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide bar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Always show at the very bottom
      if ((window.innerHeight + currentScrollY) >= document.body.offsetHeight - 50) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: `Read "${title}" on ${siteConfig.name}`,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-between border-t border-border/50 bg-background/80 backdrop-blur-md px-6 py-3 pb-safe shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] transition-transform duration-300 xl:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-[120%]'
      }`}
    >
      <div className="flex items-center gap-6 [&>div]:scale-75 origin-left">
        <ClapButton slug={slug} className="mb-0 [&>span]:hidden" />
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={scrollToComments}
          className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
          aria-label="Go to comments"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
        
        <div className="scale-110 origin-center">
          <BookmarkButton slug={slug} />
        </div>
        
        {canNativeShare ? (
          <button
            onClick={handleNativeShare}
            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
            aria-label="Share article"
          >
            <Share className="h-5 w-5" />
          </button>
        ) : (
          <CopyLinkButton slug={slug} className="border-none bg-transparent hover:bg-transparent [&>span]:hidden p-0" />
        )}
      </div>
    </div>
  );
}

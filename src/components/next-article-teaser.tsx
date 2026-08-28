'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { Article } from '@/lib/content';

interface NextArticleTeaserProps {
  nextArticle: Article | null;
}

export function NextArticleTeaser({ nextArticle }: NextArticleTeaserProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!nextArticle || dismissed) return;

    const handleScroll = () => {
      // Calculate how far we are down the page
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
      
      // Show teaser when user has scrolled past 65% of the page, but not at the very bottom
      if (scrollPercentage > 65 && scrollPercentage < 90) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextArticle, dismissed]);

  if (!nextArticle || dismissed) return null;

  return (
    <div 
      className={`fixed bottom-24 right-6 z-50 w-72 md:w-80 overflow-hidden rounded-xl border border-border/50 bg-card/95 p-4 shadow-xl backdrop-blur-md transition-all duration-500 ease-out hidden md:block transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <button 
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Dismiss recommendation"
      >
        <X className="h-4 w-4" />
      </button>
      
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Up Next
      </p>
      
      <Link 
        href={`/articles/${nextArticle.slug}`}
        className="group block"
      >
        <h4 className="mb-2 line-clamp-2 text-sm font-bold leading-tight group-hover:text-primary transition-colors">
          {nextArticle.frontmatter.title}
        </h4>
        
        <div className="flex items-center text-xs font-medium text-primary">
          Read article
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
}

'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ListTree } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Extract headings directly during render
  const headings = React.useMemo(() => {
    if (!content) return [];
    
    // We only care about h2 and h3 for the TOC (## and ###)
    const lines = content.split('\n');
    const items: TocItem[] = [];
    
    // We also want to extract headings from HTML tags if present
    const headingRegex = /^(#{2,3})\s+(.+)$|^\s*<h([23])[^>]*>(.*?)<\/h[23]>/gm;

    // Reset regex state since it's global
    headingRegex.lastIndex = 0;
    
    // Simple line by line parsing
    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      
      if (h2Match || h3Match) {
        let text = h2Match ? h2Match[1] : (h3Match ? h3Match[1] : '');
        const level = h2Match ? 2 : 3;
        
        // Strip markdown links if present [Text](url)
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        // Strip HTML tags if present
        text = text.replace(/<[^>]*>?/gm, '');
        
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/^-+|-+$/g, '');
          
        items.push({ id, text, level });
      }
    }
    
    return items;
  }, [content]);

  // Set up intersection observer for active heading and scroll progress
  useEffect(() => {
    if (headings.length === 0) return;

    // Track which headings are currently visible
    const visibleHeadings = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.add(entry.target.id);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        // If multiple are visible, pick the first one (top-most)
        if (visibleHeadings.size > 0) {
          // Find the first visible heading that appears in our ordered list
          const firstVisible = headings.find(h => visibleHeadings.has(h.id));
          if (firstVisible) {
            setActiveId(firstVisible.id);
          }
        }
      },
      { rootMargin: '-10% 0px -40% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Track overall reading progress for the TOC line
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;
      
      const rect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on the article's position relative to viewport
      const totalScrollableDistance = rect.height - viewportHeight;
      const amountScrolled = -rect.top;
      
      // Clamp between 0 and 100
      const progress = Math.max(0, Math.min(100, (amountScrolled / totalScrollableDistance) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once to set initial state
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-32 hidden lg:block xl:w-64 max-h-[calc(100vh-10rem)] pr-4">
      <div className="flex items-center gap-2 mb-6">
        <ListTree className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
          Table of Contents
        </h3>
      </div>
      
      <div className="relative">
        {/* Progress track background */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/40" />
        
        {/* Progress track active indicator */}
        <motion.div 
          className="absolute left-[7px] top-2 w-px bg-primary origin-top"
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress}%` }}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />

        <ul className="space-y-4 text-sm relative z-10">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            
            return (
              <li
                key={heading.id}
                className={cn(
                  'relative transition-colors duration-200',
                  heading.level === 3 ? 'ml-6' : 'ml-0'
                )}
              >
                {/* Custom dot indicator */}
                <div 
                  className={cn(
                    "absolute top-1.5 h-1.5 w-1.5 rounded-full transition-all duration-300",
                    heading.level === 3 ? "-left-[18.5px]" : "-left-[22.5px]",
                    isActive 
                      ? "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] scale-150" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50 scale-100"
                  )} 
                />
                
                <a 
                  href={`#${heading.id}`}
                  className={cn(
                    "block line-clamp-2 pr-2 ml-4 transition-all duration-200",
                    isActive
                      ? 'font-medium text-foreground translate-x-1'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                    // Remove the hash from URL to keep it clean, but update history
                    window.history.pushState(null, '', `#${heading.id}`);
                    setActiveId(heading.id);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

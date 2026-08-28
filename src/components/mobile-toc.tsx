'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface MobileTocProps {
  content: string;
  className?: string;
}

export function MobileToc({ content, className }: MobileTocProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  const headings = React.useMemo(() => {
    if (!content) return [];
    
    const lines = content.split('\n');
    const items: TocItem[] = [];
    
    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      
      if (h2Match || h3Match) {
        const text = h2Match ? h2Match[1] : (h3Match ? h3Match[1] : '');
        const level = h2Match ? 2 : 3;
        
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

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn("lg:hidden mb-8 w-full", className)}>
      <div
        className="flex items-center justify-between rounded-lg border border-border bg-card p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 font-medium">
          <List className="h-5 w-5" />
          <span>Table of Contents</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>
      
      {isOpen && (
        <div className="mt-2 rounded-lg border border-border bg-card p-4 animate-in slide-in-from-top-2 duration-200">
          <ul className="space-y-3 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  'line-clamp-2 transition-colors',
                  heading.level === 3 ? 'ml-4' : '',
                  activeId === heading.id
                    ? 'font-medium text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <a 
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

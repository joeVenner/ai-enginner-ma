'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
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

  // Extract headings directly during render instead of in effect
  // to avoid cascading renders (React warning)
  const headings = React.useMemo(() => {
if (!content) return [];
    
    // We only care about h2 and h3 for the TOC (## and ###)
    // We need to parse markdown headers: ## Header Text
    // Note: MDX/remark-slug generates IDs by lowercasing and replacing spaces with hyphens
    const lines = content.split('\n');
    const items: TocItem[] = [];
    
    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      
      if (h2Match || h3Match) {
        const text = h2Match ? h2Match[1] : (h3Match ? h3Match[1] : '');
        const level = h2Match ? 2 : 3;
        
        // This is a simplified version of what github-slugger/rehype-slug does
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

  // Set up intersection observer for active heading
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
    <nav className="sticky top-24 hidden lg:block xl:w-64 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h3>
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
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

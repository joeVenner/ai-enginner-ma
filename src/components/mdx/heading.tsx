'use client';

import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ level, children, id, className, ...props }: HeadingProps) {
  const [copied, setCopied] = useState(false);
  
  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) return;
    
    const url = new URL(window.location.href);
    url.hash = id;
    
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const innerContent = (
    <>
      {/* Anchor icon that appears on hover, positioned to the left of the heading */}
      {id && (
        <a
          href={`#${id}`}
          onClick={copyLink}
          className="absolute -left-6 md:-left-8 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 hover:bg-muted text-muted-foreground"
          aria-label={`Link to ${children}`}
        >
          {copied ? (
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
          ) : (
            <Link2 className="h-3 w-3 md:h-4 md:w-4" />
          )}
        </a>
      )}
      <span>{children}</span>
    </>
  );

  const combinedClassName = cn("group relative flex items-center scroll-mt-24", className);

  switch (level) {
    case 1: return <h1 id={id} className={combinedClassName} {...props}>{innerContent}</h1>;
    case 2: return <h2 id={id} className={combinedClassName} {...props}>{innerContent}</h2>;
    case 3: return <h3 id={id} className={combinedClassName} {...props}>{innerContent}</h3>;
    case 4: return <h4 id={id} className={combinedClassName} {...props}>{innerContent}</h4>;
    case 5: return <h5 id={id} className={combinedClassName} {...props}>{innerContent}</h5>;
    case 6: return <h6 id={id} className={combinedClassName} {...props}>{innerContent}</h6>;
    default: return <h2 id={id} className={combinedClassName} {...props}>{innerContent}</h2>;
  }
}

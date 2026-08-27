'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ArticleImageClientProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ArticleImageClient({ src, alt, className, fallbackSrc = '/images/og.jpg', ...props }: ArticleImageClientProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
      {...props}
    />
  );
}

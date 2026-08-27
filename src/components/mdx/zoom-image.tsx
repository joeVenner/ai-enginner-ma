'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, ZoomIn } from 'lucide-react';

type ZoomImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ZoomImage({ src, alt, className, ...props }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle escape key to close zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };
    
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);

  if (!src) return null;

  return (
    <>
      {/* Thumbnail inline image container */}
      <div 
        className={cn("group relative my-8 overflow-hidden rounded-xl bg-muted border border-border/50 transition-all duration-300 hover:border-primary/30", className)}
      >
        <img
          src={src}
          alt={alt || ''}
          className="cursor-zoom-in w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
          onClick={() => setIsZoomed(true)}
          loading="lazy"
          decoding="async"
          {...props}
        />
        
        {/* Hover overlay hint */}
        <div 
          className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/10 pointer-events-none flex items-center justify-center"
        >
          <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full text-foreground opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-sm border border-border/50">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Full screen overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-zoom-out p-4 md:p-12 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsZoomed(false);
          }}
          role="dialog"
          tabIndex={-1}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-[101]"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative max-h-full max-w-full">
            <img
              src={src}
              alt={alt || ''}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200 border border-border/50"
              loading="lazy"
              decoding="async"
            />
            {alt && (
              <div className="absolute -bottom-10 left-0 right-0 text-center text-sm font-medium text-muted-foreground px-4 truncate">
                {alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

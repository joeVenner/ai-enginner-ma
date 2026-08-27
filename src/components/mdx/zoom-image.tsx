'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

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
      {/* Thumbnail inline image */}
      <img
        src={src}
        alt={alt || ''}
        className={cn(
          "cursor-zoom-in transition-transform duration-300 hover:scale-[1.02] rounded-xl my-8",
          className
        )}
        onClick={() => setIsZoomed(true)}
        loading="lazy"
        {...props}
      />

      {/* Full screen overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-zoom-out p-4 md:p-12 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
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
          
          <img
            src={src}
            alt={alt || ''}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
          />
          
          {alt && (
            <div className="absolute bottom-8 left-0 right-0 text-center text-sm font-medium text-muted-foreground px-4">
              {alt}
            </div>
          )}
        </div>
      )}
    </>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X, ZoomIn, Download, ExternalLink, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ZoomImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ZoomImage({ src, alt, className, ...props }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Reset transform state when closing
  const handleClose = () => {
    setIsZoomed(false);
    setTimeout(() => {
      setScale(1);
      setPan({ x: 0, y: 0 });
    }, 300);
  };

  // Handle escape key to close zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        handleClose();
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
  }, [isZoomed]); // intentionally not adding handleClose to dependencies

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return; // Only allow drag if zoomed in
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!isZoomed) return;
    
    // Zoom in/out via mouse wheel
    const zoomFactor = 0.05;
    const direction = e.deltaY < 0 ? 1 : -1;
    
    setScale(prev => {
      const newScale = prev + (direction * zoomFactor);
      return Math.min(Math.max(1, newScale), 5); // Clamp between 1x and 5x
    });
  };

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
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-12"
            onWheel={handleWheel}
            role="dialog"
            tabIndex={-1}
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-[102] bg-gradient-to-b from-background/80 to-transparent">
              <div className="text-sm font-medium text-muted-foreground truncate max-w-[60vw]">
                {alt}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground mr-2">
                  {Math.round(scale * 100)}%
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setScale(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                  title="Reset Zoom"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
                <a 
                  href={typeof src === 'string' ? src : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                  title="Open original"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={typeof src === 'string' ? src : undefined}
                  download
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                  title="Download"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="h-4 w-4" />
                </a>
                <div className="w-px h-6 bg-border mx-1"></div>
                <button 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Click-to-close background layer */}
            <div 
              className="absolute inset-0 z-[100]" 
              onClick={handleClose}
            />

            {/* Draggable/Zoomable Image container */}
            <div 
              className={cn(
                "relative max-h-full max-w-full z-[101]",
                scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              )}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onClick={(e) => {
                e.stopPropagation();
                if (scale === 1) {
                  setScale(2);
                }
              }}
            >
              <motion.img
                src={src}
                alt={alt || ''}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ 
                  scale: scale, 
                  x: pan.x, 
                  y: pan.y,
                  opacity: 1 
                }}
                transition={isDragging ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.4 }}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl border border-border/50 select-none"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const isOpen = selectedIndex !== null;
  const currentImage = isOpen ? images[selectedIndex] : null;

  // Handle escape key and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          setSelectedIndex(null);
        }
      } else if (e.key === 'ArrowRight' && !isZoomed) {
        setSelectedIndex((prev) => (prev! + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && !isZoomed) {
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsZoomed(false); // Reset zoom state when closing
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isZoomed, images.length]);

  return (
    <>
      {/* Grid of thumbnails */}
      <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4 my-8", className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-xl bg-muted border border-border/50 cursor-zoom-in transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100">
              <div className="self-end bg-black/60 backdrop-blur-sm p-2 rounded-full text-white">
                <ZoomIn className="w-4 h-4" />
              </div>

              {image.caption && (
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs truncate">
                  {image.caption}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full screen lightbox overlay */}
      <AnimatePresence>
        {isOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-[102] bg-gradient-to-b from-background/80 to-transparent">
              <div className="text-sm font-medium text-muted-foreground">
                {selectedIndex! + 1} / {images.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    isZoomed
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                  )}
                  title={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <a
                  href={currentImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                  title="Open original"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={currentImage.src}
                  download
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </a>
                <div className="w-px h-6 bg-border mx-1"></div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedIndex(null)}
                  title="Close (Esc)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation buttons */}
            {!isZoomed && images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[102] flex h-12 w-12 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-all hover:scale-110 shadow-lg border border-border/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
                  }}
                  title="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 pr-1" />
                </button>

                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[102] flex h-12 w-12 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-all hover:scale-110 shadow-lg border border-border/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev! + 1) % images.length);
                  }}
                  title="Next image"
                >
                  <ChevronRight className="h-6 w-6 pl-1" />
                </button>
              </>
            )}

            {/* Image container */}
            <div
              className={cn(
                "relative flex-1 w-full flex items-center justify-center p-4 md:p-12 z-[101] overflow-hidden",
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              )}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <motion.img
                key={selectedIndex}
                src={currentImage.src}
                alt={currentImage.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: isZoomed ? 1.5 : 1
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className={cn(
                  "max-h-full max-w-full rounded-lg shadow-2xl border border-border/50 select-none",
                  isZoomed ? "object-cover" : "object-contain"
                )}
                draggable={false}
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-[102] bg-gradient-to-t from-background/90 via-background/60 to-transparent flex flex-col items-center">
              <h3 className="text-lg font-medium text-foreground mb-1">
                {currentImage.alt}
              </h3>
              {currentImage.caption && (
                <p className="text-sm text-muted-foreground text-center max-w-2xl">
                  {currentImage.caption}
                </p>
              )}
            </div>

            {/* Click-to-close background layer */}
            <div
              className="absolute inset-0 z-[100]"
              onClick={() => setSelectedIndex(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
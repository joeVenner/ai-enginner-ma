'use client';

import { useEffect } from 'react';

export function setupImageZoom() {
  const articleContent = document.querySelector('.prose');
  if (!articleContent) return;

  // Find all images in the article content (excluding any hero image outside .prose)
  const images = articleContent.querySelectorAll('img');

  images.forEach((img) => {
    // Skip if already processed
    if (img.classList.contains('zoom-enabled')) return;
    
    img.classList.add('zoom-enabled', 'cursor-zoom-in', 'transition-transform', 'duration-300', 'hover:scale-[1.02]');
    
    img.addEventListener('click', () => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-zoom-out opacity-0 transition-opacity duration-300';
      
      // Create zoomed image clone
      const zoomedImg = document.createElement('img');
      zoomedImg.src = img.src;
      zoomedImg.alt = img.alt;
      zoomedImg.className = 'max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl scale-95 transition-transform duration-300';
      
      // Add caption if present in alt
      if (img.alt) {
        const caption = document.createElement('div');
        caption.className = 'absolute bottom-8 left-0 right-0 text-center text-sm font-medium text-muted-foreground';
        caption.innerText = img.alt;
        overlay.appendChild(caption);
      }
      
      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Trigger animation
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        zoomedImg.classList.remove('scale-95');
      });
      
      // Close on click
      overlay.addEventListener('click', () => {
        overlay.classList.add('opacity-0');
        zoomedImg.classList.add('scale-95');
        
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.style.overflow = '';
        }, 300);
      });
      
      // Close on Escape key
      const escListener = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          overlay.click();
          document.removeEventListener('keydown', escListener);
        }
      };
      document.addEventListener('keydown', escListener);
    });
  });
}

export function ImageZoomManager() {
  useEffect(() => {
    // Delay ensures content is rendered
    const timeoutId = setTimeout(() => {
      setupImageZoom();
    }, 150);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return null;
}

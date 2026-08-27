'use client';

import { useEffect, useState } from 'react';

/**
 * Hook that returns the scroll progress as a percentage from 0 to 100
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      // Get the scroll position
      const currentScrollY = window.scrollY;
      
      // Get the total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        // Calculate percentage (0 to 100)
        const percent = (currentScrollY / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, percent)));
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    // Call once initially to set the correct progress if already scrolled
    updateScroll();

    // Clean up
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return progress;
}

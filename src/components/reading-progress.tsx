'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far we've scrolled
      const totalScroll = document.documentElement.scrollTop;
      
      // Calculate total scrollable area
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate percentage
      if (windowHeight === 0) {
        setProgress(0);
      } else {
        const currentProgress = (totalScroll / windowHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-[64px] z-40 h-1 bg-border/40">
      <div 
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

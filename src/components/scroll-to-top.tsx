'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReadingProgress } from '@/hooks/use-reading-progress';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const progress = useReadingProgress();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button when scrolled down more than 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    // Initial check
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'
      )}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 rounded-full" style={{
        background: `conic-gradient(var(--border) ${progress}%, transparent ${progress}%)`,
        opacity: 0.2
      }} />
      <ArrowUp className="relative z-10 h-5 w-5" />
    </button>
  );
}

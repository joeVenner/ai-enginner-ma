'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

export function ScrollPositionMemory() {
  const pathname = usePathname();

  useEffect(() => {
    // Only apply to articles
    if (!pathname.startsWith('/articles/')) return;

    const storageKey = `scroll-position-${pathname}`;

    // Restore scroll position on mount
    const savedPosition = localStorage.getItem(storageKey);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      if (position > 0) {
        // Small delay to ensure content is rendered before scrolling
        setTimeout(() => {
          window.scrollTo({
            top: position,
            behavior: 'smooth'
          });
        }, 300);
      }
    }

    // Save scroll position
    const handleScroll = () => {
      // Don't save if we're at the very top (they might be reading from start)
      if (window.scrollY > 100) {
        localStorage.setItem(storageKey, window.scrollY.toString());
      } else {
        localStorage.removeItem(storageKey);
      }
    };

    // Use a simple debounce for the scroll event
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 500);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null; // This component has no UI
}
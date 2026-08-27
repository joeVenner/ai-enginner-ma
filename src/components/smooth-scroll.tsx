'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      // Only handle internal hash links
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
          // Adjust scroll position considering sticky header
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
          // Update URL without jumping
          history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // When pathname changes (navigation occurs), scroll to top smoothly
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

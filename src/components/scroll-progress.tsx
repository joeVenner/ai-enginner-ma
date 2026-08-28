'use client';

import { useReadingProgress } from '@/hooks/use-reading-progress';
import { usePathname } from 'next/navigation';

export function GlobalScrollProgress() {
  const progress = useReadingProgress();
  const pathname = usePathname();

  // Only show the scroll progress bar on article pages
  if (!pathname?.startsWith('/articles/')) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent overflow-hidden">
      <div 
        className="h-full bg-primary origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

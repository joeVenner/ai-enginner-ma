'use client';

import { useEffect } from 'react';
import { useReadingHistory } from '@/hooks/use-reading-history';

export function HistoryTracker({ slug }: { slug: string }) {
  const { addToHistory } = useReadingHistory();

  useEffect(() => {
    // Slight delay to ensure it's a real read, not just a bounce
    const timer = setTimeout(() => {
      addToHistory(slug);
    }, 2000);

    return () => clearTimeout(timer);
  }, [slug, addToHistory]);

  return null;
}

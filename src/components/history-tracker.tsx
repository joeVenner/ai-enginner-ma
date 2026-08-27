'use client';

import { useEffect } from 'react';
import { useReadingHistory } from '@/hooks/use-reading-history';

interface HistoryTrackerProps {
  slug: string;
}

export function HistoryTracker({ slug }: HistoryTrackerProps) {
  const { addToHistory } = useReadingHistory();

  useEffect(() => {
    // Add to history after a short delay to ensure it's a real read
    const timer = setTimeout(() => {
      addToHistory(slug);
    }, 5000);

    return () => clearTimeout(timer);
  }, [slug, addToHistory]);

  return null;
}

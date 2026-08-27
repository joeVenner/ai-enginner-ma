'use client';

import { useReadingProgress } from '@/hooks/use-reading-progress';

export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

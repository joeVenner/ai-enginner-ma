'use client';

import { useEffect, useState } from 'react';
import { useReadingProgress } from '@/hooks/use-reading-progress';

interface EstimatedReadProps {
  readingTime: number;
}

export function EstimatedRead({ readingTime }: EstimatedReadProps) {
  const [timeLeft, setTimeLeft] = useState(readingTime);
  const progress = useReadingProgress();

  useEffect(() => {
    // We only update if progress is meaningful (>5%) and less than complete (<95%)
    // to avoid flashing times at the start/end
    if (progress > 5 && progress < 95) {
      // Calculate remaining time based on progress percentage
      // For instance: 10 min read, 50% done = 5 min left
      const percentDone = progress / 100;
      const timeRemaining = Math.max(1, Math.ceil(readingTime * (1 - percentDone)));
      
      if (timeRemaining !== timeLeft) {
        setTimeLeft(timeRemaining);
      }
    } else if (progress <= 5) {
      setTimeLeft(readingTime);
    } else if (progress >= 95) {
      setTimeLeft(0);
    }
  }, [progress, readingTime, timeLeft]);

  // Don't show anything if less than 1 min left or just starting
  if (timeLeft < 1 || progress < 5) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500 hidden md:flex">
      <div className="rounded-full border border-border/50 bg-secondary/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm">
        {timeLeft} min{timeLeft > 1 ? 's' : ''} left
      </div>
    </div>
  );
}

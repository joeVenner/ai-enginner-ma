'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface EstimatedReadProps {
  readingTime: number;
}

export function EstimatedRead({ readingTime }: EstimatedReadProps) {
  const [timeLeft, setTimeLeft] = useState(readingTime);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / scrollHeight));
        const timeRemaining = Math.max(1, Math.ceil(readingTime * (1 - progress)));
        setTimeLeft(timeRemaining);
      }
    };

    window.addEventListener('scroll', calculateTimeLeft, { passive: true });
    // Initial calculation
    calculateTimeLeft();

    return () => window.removeEventListener('scroll', calculateTimeLeft);
  }, [readingTime]);

  if (timeLeft === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card">
      <Clock className="h-3.5 w-3.5 text-primary" />
      <span>{timeLeft} min left</span>
    </div>
  );
}

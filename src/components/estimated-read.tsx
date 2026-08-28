'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useReadingProgress } from '@/hooks/use-reading-progress';

interface EstimatedReadProps {
  readingTime: number;
}

export function EstimatedRead({ readingTime }: EstimatedReadProps) {
  const [timeLeft, setTimeLeft] = useState(readingTime);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progress = useReadingProgress();

  useEffect(() => {
    setMounted(true);

    // Check if on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // We only update if progress is meaningful (>5%) and less than complete (<95%)
    // to avoid flashing times at the start/end
    if (progress > 5 && progress < 95) {
      // Apply a ~1.5x multiplier for mobile reading speed estimation
      const baseTime = isMobile ? readingTime * 1.5 : readingTime;

      const percentDone = progress / 100;
      const timeRemaining = Math.max(1, Math.ceil(baseTime * (1 - percentDone)));

      if (timeRemaining !== timeLeft) {
        setTimeLeft(timeRemaining);
      }
    } else if (progress <= 5) {
      setTimeLeft(isMobile ? Math.ceil(readingTime * 1.5) : readingTime);
    } else if (progress >= 95) {
      setTimeLeft(0);
    }
  }, [progress, readingTime, timeLeft, isMobile]);

  if (!mounted) return null;

  // Don't show if they haven't started reading or if they're basically done
  if (timeLeft < 1 || progress < 5 || progress > 95) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500 flex md:flex">
      <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-foreground shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all hover:bg-background/95">
        <Clock className="h-3.5 w-3.5 text-primary animate-pulse" />
        <span>{timeLeft} min{timeLeft > 1 ? 's' : ''} left {isMobile && <span className="opacity-50 text-[10px] ml-1">(mobile pace)</span>}</span>
      </div>
    </div>
  );
}

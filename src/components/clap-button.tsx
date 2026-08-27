'use client';

import { useState, useEffect, useRef } from 'react';
import { ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

interface ClapButtonProps {
  slug: string;
  className?: string;
}

const MAX_CLAPS = 50;

export function ClapButton({ slug, className }: ClapButtonProps) {
  const [claps, setClaps] = useState(0);
  const [totalClaps, setTotalClaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    // Load local user claps
    try {
      const savedClaps = localStorage.getItem('aiengineer_claps');
      if (savedClaps) {
        const parsed = JSON.parse(savedClaps);
        if (parsed[slug]) {
          setClaps(parsed[slug]);
        }
      }

      // We simulate a total clap count by adding some random number to the local claps
      // In a real app, this would come from a database API.
      const seed = Array.from(slug).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const fakeRemoteClaps = (seed % 300) + 42;
      let initialClaps = 0;
      if (savedClaps) {
        initialClaps = JSON.parse(savedClaps)?.[slug] || 0;
      }
      setTotalClaps(fakeRemoteClaps + initialClaps);
    } catch (e) {
      console.error('Error loading claps', e);
    }
  }, [slug]);

  const handleClap = () => {
    if (claps >= MAX_CLAPS) return;

    const newClaps = claps + 1;
    setClaps(newClaps);
    setTotalClaps(prev => prev + 1);

    // Animation trigger
    setIsAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAnimating(false), 300);

    // Save locally
    try {
      const saved = localStorage.getItem('aiengineer_claps');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[slug] = newClaps;
      localStorage.setItem('aiengineer_claps', JSON.stringify(parsed));
    } catch (e) {
      console.error('Error saving claps', e);
    }
  };

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex h-10 items-center justify-center rounded-full bg-secondary px-4 text-secondary-foreground transition-colors hover:bg-secondary/80">
          <ThumbsUp className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">Like</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClap}
              disabled={claps >= MAX_CLAPS}
              className={cn(
                "relative flex h-16 w-16 select-none items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-border shadow-sm",
                claps > 0
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground",
                isAnimating && "scale-110",
                claps >= MAX_CLAPS && "opacity-80 cursor-default hover:bg-primary"
              )}
            >
              <ThumbsUp className={cn("h-6 w-6", claps > 0 && "fill-primary-foreground/20")} />
              
              {/* Floating +1 animation */}
              {isAnimating && (
                <span className="absolute -top-8 text-primary font-bold text-lg animate-out fade-out slide-out-to-top-8 duration-500">
                  +{claps}
                </span>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{claps >= MAX_CLAPS ? "Maximum claps reached!" : "Give this article a like"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-sm font-medium text-muted-foreground">{totalClaps} Likes</span>
    </div>
  );
}

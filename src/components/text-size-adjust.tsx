'use client';

import { useState, useEffect } from 'react';
import { Type, Minus, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

export function TextSizeAdjust() {
  const [size, setSize] = useState(100);

  useEffect(() => {
    const savedSize = localStorage.getItem('preferred-text-size');
    if (savedSize) {
      const parsed = parseInt(savedSize, 10);
      setSize(parsed);
      document.documentElement.style.fontSize = `${parsed}%`;
    }
  }, []);

  const handleSizeChange = (newSize: number) => {
    // Keep between 80% and 150%
    const boundedSize = Math.max(80, Math.min(150, newSize));
    setSize(boundedSize);
    document.documentElement.style.fontSize = `${boundedSize}%`;
    localStorage.setItem('preferred-text-size', boundedSize.toString());
  };

  return (
    <Popover>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Type className="h-4 w-4" />
              <span className="sr-only">Adjust Text Size</span>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            <p>Adjust Text Size</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-56 p-3" align="end">
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Typography Scale
          </span>
          <div className="flex items-center justify-between rounded-md border border-border/50 bg-secondary/30 p-1">
            <button
              onClick={() => handleSizeChange(size - 10)}
              disabled={size <= 80}
              className="flex h-8 w-8 items-center justify-center rounded bg-background shadow-sm hover:bg-secondary/80 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
              aria-label="Decrease text size"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-sm font-semibold tabular-nums w-12 text-center">{size}%</span>
            <button
              onClick={() => handleSizeChange(size + 10)}
              disabled={size >= 150}
              className="flex h-8 w-8 items-center justify-center rounded bg-background shadow-sm hover:bg-secondary/80 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
              aria-label="Increase text size"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          
          <button
            onClick={() => handleSizeChange(100)}
            className="rounded-md bg-secondary/50 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Reset to default
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

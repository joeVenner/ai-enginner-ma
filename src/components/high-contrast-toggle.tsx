'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

export function HighContrastToggle() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('high-contrast-mode');
    if (storedValue === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('high-contrast');
        localStorage.setItem('high-contrast-mode', 'true');
      } else {
        document.documentElement.classList.remove('high-contrast');
        localStorage.setItem('high-contrast-mode', 'false');
      }
      return newValue;
    });
  };

  return (
    <Popover>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {isHighContrast ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">Accessibility settings</span>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            <p>Accessibility settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-56 p-3" align="end">
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Visual Settings
          </span>
          
          <button
            onClick={toggleHighContrast}
            className="flex items-center justify-between rounded-md border border-border/50 bg-secondary/50 p-2 text-sm transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            <span className="font-medium">High Contrast</span>
            <div className={`flex h-5 w-9 items-center rounded-full px-1 transition-colors ${isHighContrast ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
              <div className={`h-3.5 w-3.5 rounded-full bg-background transition-transform ${isHighContrast ? 'translate-x-3.5' : 'translate-x-0'}`} />
            </div>
          </button>
          
          <p className="text-[10px] text-muted-foreground">
            Enhances text contrast and replaces colored borders with solid stark colors for improved readability.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Settings2, Minus, Plus, Type, Moon, Sun, Laptop } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';
import { useTheme } from 'next-themes';

export function ReaderSettings() {
  const { theme, setTheme } = useTheme();
  const [size, setSize] = useState(100);
  const [fontFamily, setFontFamily] = useState('sans');

  useEffect(() => {
    // Load text size
    const savedSize = localStorage.getItem('preferred-text-size');
    if (savedSize) {
      const parsed = parseInt(savedSize, 10);
      setSize(parsed);
      document.documentElement.style.fontSize = `${parsed}%`;
    }

    // Load font family
    const savedFont = localStorage.getItem('preferred-font-family');
    if (savedFont) {
      setFontFamily(savedFont);
      applyFontFamily(savedFont);
    }
  }, []);

  const handleSizeChange = (newSize: number) => {
    const boundedSize = Math.max(80, Math.min(150, newSize));
    setSize(boundedSize);
    document.documentElement.style.fontSize = `${boundedSize}%`;
    localStorage.setItem('preferred-text-size', boundedSize.toString());
  };

  const applyFontFamily = (family: string) => {
    // Remove existing font classes from body
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    
    // Add new font class
    document.body.classList.add(`font-${family}`);
  };

  const handleFontChange = (family: string) => {
    setFontFamily(family);
    applyFontFamily(family);
    localStorage.setItem('preferred-font-family', family);
  };

  return (
    <Popover>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Settings2 className="h-4 w-4" />
              <span className="sr-only">Display Settings</span>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            <p>Display Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-72 p-4" align="end">
        <div className="flex flex-col space-y-5">
          
          {/* Theme Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Theme
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-md border p-2 transition-colors ${
                  theme === 'light' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-background hover:bg-secondary'
                }`}
              >
                <Sun className="h-4 w-4" />
                <span className="text-[10px] font-medium">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-md border p-2 transition-colors ${
                  theme === 'dark' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-background hover:bg-secondary'
                }`}
              >
                <Moon className="h-4 w-4" />
                <span className="text-[10px] font-medium">Dark</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-md border p-2 transition-colors ${
                  theme === 'system' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-background hover:bg-secondary'
                }`}
              >
                <Laptop className="h-4 w-4" />
                <span className="text-[10px] font-medium">Auto</span>
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-border/50"></div>

          {/* Typography Scale Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Text Size
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
          </div>
          
          <div className="h-px w-full bg-border/50"></div>

          {/* Font Family Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Font Style
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleFontChange('sans')}
                className={`flex items-center justify-center rounded-md border p-2 transition-colors font-sans ${
                  fontFamily === 'sans' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-background hover:bg-secondary'
                }`}
              >
                <span className="text-sm font-medium">Sans</span>
              </button>
              <button
                onClick={() => handleFontChange('serif')}
                className={`flex items-center justify-center rounded-md border p-2 transition-colors font-serif ${
                  fontFamily === 'serif' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-background hover:bg-secondary'
                }`}
              >
                <span className="text-sm font-medium">Serif</span>
              </button>
              <button
                onClick={() => handleFontChange('mono')}
                className={`flex items-center justify-center rounded-md border p-2 transition-colors font-mono ${
                  fontFamily === 'mono' ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-background hover:bg-secondary'
                }`}
              >
                <span className="text-sm font-medium">Mono</span>
              </button>
            </div>
          </div>
          
        </div>
      </PopoverContent>
    </Popover>
  );
}

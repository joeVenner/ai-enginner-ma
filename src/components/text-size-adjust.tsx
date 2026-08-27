'use client';

import { useState, useEffect } from 'react';
import { Type, Minus, Plus, RotateCcw } from 'lucide-react';

export function TextSizeAdjust() {
  const [size, setSize] = useState<number>(100);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedSize = localStorage.getItem('aiengineer_text_size');
    if (savedSize) {
      const parsedSize = parseInt(savedSize, 10);
      if (!isNaN(parsedSize)) {
        setSize(parsedSize);
        document.documentElement.style.setProperty('--base-font-size', `${parsedSize}%`);
        document.documentElement.style.fontSize = `${parsedSize}%`;
      }
    }
  }, []);

  const adjustSize = (newSize: number) => {
    // Clamp between 80% and 150%
    const clampedSize = Math.max(80, Math.min(150, newSize));
    setSize(clampedSize);
    localStorage.setItem('aiengineer_text_size', clampedSize.toString());
    document.documentElement.style.setProperty('--base-font-size', `${clampedSize}%`);
    document.documentElement.style.fontSize = `${clampedSize}%`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Adjust text size"
        title="Text Size"
      >
        <Type className="h-[1.2rem] w-[1.2rem]" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-border bg-popover p-2 shadow-md animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between gap-2 p-2">
              <button
                onClick={() => adjustSize(size - 10)}
                disabled={size <= 80}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-colors"
                aria-label="Decrease text size"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="text-sm font-medium text-popover-foreground tabular-nums">
                {size}%
              </span>
              
              <button
                onClick={() => adjustSize(size + 10)}
                disabled={size >= 150}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-colors"
                aria-label="Increase text size"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={() => adjustSize(100)}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset to default
            </button>
          </div>
        </>
      )}
    </div>
  );
}

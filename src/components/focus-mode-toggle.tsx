'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FocusModeToggle() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    // Check saved preference on mount
    const saved = localStorage.getItem('focus-mode');
    if (saved === 'true') {
      setIsFocusMode(true);
      document.documentElement.classList.add('focus-mode');
    }
  }, []);

  const toggleFocusMode = () => {
    const newValue = !isFocusMode;
    setIsFocusMode(newValue);

    if (newValue) {
      document.documentElement.classList.add('focus-mode');
      localStorage.setItem('focus-mode', 'true');
    } else {
      document.documentElement.classList.remove('focus-mode');
      localStorage.setItem('focus-mode', 'false');
    }
  };

  return (
    <button
      onClick={toggleFocusMode}
      className={cn(
        "flex h-8 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
        isFocusMode
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-border/50"
      )}
      aria-label={isFocusMode ? "Disable focus mode" : "Enable focus mode"}
      title="Toggle distraction-free reading"
    >
      {isFocusMode ? (
        <>
          <EyeOff className="h-4 w-4" />
          <span className="hidden sm:inline-block">Exit Focus</span>
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline-block">Focus Mode</span>
        </>
      )}
    </button>
  );
}
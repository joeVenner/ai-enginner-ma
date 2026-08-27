'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SearchShortcut() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
      className="group flex w-full max-w-sm items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Search className="h-4 w-4" />
      <span>Search articles...</span>
      <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-foreground">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}

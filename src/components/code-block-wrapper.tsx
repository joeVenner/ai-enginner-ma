'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CodeBlockWrapperProps {
  children: React.ReactNode;
  expandButtonTitle?: string;
}

export function CodeBlockWrapper({ children, expandButtonTitle = "View Code" }: CodeBlockWrapperProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={cn("relative overflow-hidden rounded-xl", isOpened ? "" : "max-h-64")}>
      <div className={cn("[&_pre]:my-0 [&_pre]:max-h-[600px]", !isOpened && "[&_pre]:max-h-64")}>
        {children}
      </div>
      
      {!isOpened && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent flex items-end justify-center pb-2">
          <button
            onClick={() => setIsOpened(true)}
            className="flex items-center gap-1.5 rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm backdrop-blur transition-all hover:bg-secondary"
          >
            {expandButtonTitle}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      
      {isOpened && (
        <div className="absolute top-10 right-4">
           <button
            onClick={() => setIsOpened(false)}
            className="flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all hover:bg-secondary hover:text-foreground bg-background/50 backdrop-blur border border-border text-xs text-muted-foreground"
          >
            Collapse
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

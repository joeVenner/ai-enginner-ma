'use client';

import { Printer } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handlePrint}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Print article"
          >
            <Printer className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Print article</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

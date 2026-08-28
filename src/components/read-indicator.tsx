'use client';

import { CheckCircle2 } from 'lucide-react';
import { useReadingHistory } from '@/hooks/use-reading-history';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';
import { cn } from '@/lib/utils';

interface ReadIndicatorProps {
  slug: string;
  className?: string;
}

export function ReadIndicator({ slug, className }: ReadIndicatorProps) {
  const { history, mounted } = useReadingHistory();

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const hasRead = history.includes(slug);

  if (!hasRead) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("inline-flex items-center text-primary/80", className)}>
            <CheckCircle2 className="h-4 w-4" aria-label="Already read" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>You've read this article</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

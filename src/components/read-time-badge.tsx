'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadTimeBadgeProps {
  minutes: number;
  className?: string;
}

export function ReadTimeBadge({ minutes, className }: ReadTimeBadgeProps) {
  // Determine color based on length
  let colorClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50";
  if (minutes > 5) {
    colorClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50";
  }
  if (minutes > 15) {
    colorClass = "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800/50";
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", colorClass, className)}>
      <Clock className="h-3 w-3" />
      <span>{minutes} min read</span>
    </div>
  );
}

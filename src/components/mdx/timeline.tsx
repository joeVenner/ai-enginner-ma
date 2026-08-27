import React from 'react';
import { cn } from '@/lib/utils';

export function Timeline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("my-8 ml-4 border-l-2 border-border/70 pl-8", className)}>
      {children}
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  date?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function TimelineItem({ title, date, icon, children }: TimelineItemProps) {
  return (
    <div className="relative mb-10 last:mb-0">
      <div className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary/50 bg-card text-primary shadow-sm">
        {icon || <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
        <h3 className="text-xl font-bold tracking-tight m-0">{title}</h3>
        {date && (
          <time className="text-sm font-medium text-muted-foreground mt-1 sm:mt-0">
            {date}
          </time>
        )}
      </div>
      <div className="prose-sm dark:prose-invert max-w-none text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

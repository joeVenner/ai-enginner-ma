import React from 'react';
import { cn } from '@/lib/utils';

export function MathBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("my-6 overflow-x-auto rounded-xl bg-card border border-border p-6 shadow-sm", className)}>
      <div className="flex w-full items-center justify-center min-w-max">
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

interface AxiomProps {
  children: React.ReactNode;
  className?: string;
}

export function Axiom({ children, className }: AxiomProps) {
  return (
    <div
      className={cn(
        "my-8 rounded-xl border-2 border-primary/50 bg-primary/5 p-6 shadow-sm",
        "font-semibold text-lg leading-relaxed text-foreground",
        className
      )}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <meta itemProp="isAccessibleForFree" content="True" />
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary">
        Key Insight
      </span>
      <blockquote itemProp="text" className="m-0">
        {children}
      </blockquote>
    </div>
  );
}
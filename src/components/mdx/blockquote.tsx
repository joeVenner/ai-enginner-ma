import React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Blockquote({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "relative my-8 overflow-hidden rounded-r-xl border-l-4 border-primary bg-muted/50 p-6 pl-12 pr-8 italic text-muted-foreground",
        className
      )}
      {...props}
    >
      <Quote className="absolute left-4 top-6 h-6 w-6 text-primary/20 rotate-180" />
      <div className="relative z-10">{children}</div>
    </blockquote>
  );
}
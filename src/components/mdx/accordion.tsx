'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("my-6 space-y-4 divide-y divide-border rounded-xl border border-border bg-card", className)}>
      {children}
    </div>
  );
}

export function AccordionItem({ title, children, defaultOpen = false }: { title: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200", 
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4 pt-0 prose-sm dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

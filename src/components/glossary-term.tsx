'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover';
import { glossaryData } from '@/lib/data/glossary';

interface GlossaryTermProps {
  term: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const normalizedTerm = term.toLowerCase();
  const glossaryEntry = glossaryData[normalizedTerm];

  if (!glossaryEntry) {
    return <span className="font-medium text-foreground">{children}</span>;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="inline-flex items-center border-b border-primary/40 text-foreground transition-colors hover:border-primary hover:text-primary hover:bg-primary/5 px-0.5 rounded-sm"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-4 shadow-xl z-[100]" 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        side="top"
        align="center"
        sideOffset={6}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm leading-none tracking-tight capitalize">
              {term}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {glossaryEntry.definition}
            </p>
            {glossaryEntry.link && (
              <a 
                href={glossaryEntry.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block pt-1 text-xs font-medium text-primary hover:underline"
              >
                Learn more &rarr;
              </a>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

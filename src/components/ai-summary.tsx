'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiSummaryProps {
  summaryPoints: string[];
}

export function AiSummary({ summaryPoints }: AiSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!summaryPoints || summaryPoints.length === 0) return null;

  return (
    <div className="my-8 w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "group flex w-full items-center justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300",
          isExpanded 
            ? "border-primary/50 bg-primary/5 shadow-md" 
            : "border-border/60 bg-card hover:border-primary/40 hover:bg-muted/50 hover:shadow-sm"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-foreground tracking-tight">AI Summary</span>
            <span className="text-xs text-muted-foreground">Click to {isExpanded ? 'collapse' : 'reveal TL;DR'}</span>
          </div>
        </div>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
          isExpanded ? "bg-primary/10 text-primary rotate-180" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-6 shadow-inner">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Key Takeaways
              </h4>
              <ul className="space-y-4">
                {summaryPoints.map((point, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.2, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" />
                    <span className="text-base leading-relaxed text-foreground/90">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

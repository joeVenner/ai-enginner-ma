'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArticleFeedback() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (type: 'up' | 'down') => {
    if (submitted) return;
    setFeedback(type);

    // Simulate sending feedback to API
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground animate-in fade-in zoom-in duration-300">
        <Check className="h-4 w-4 text-green-500" />
        <span>Thank you for your feedback!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 rounded-lg border border-border bg-card px-6 py-4">
      <span className="text-sm font-medium">Was this article helpful?</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleFeedback('up')}
          disabled={feedback !== null}
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            feedback === 'up'
              ? "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400"
              : "border-border hover:bg-muted"
          )}
          aria-label="Helpful"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Yes</span>
        </button>
        <button
          onClick={() => handleFeedback('down')}
          disabled={feedback !== null}
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            feedback === 'down'
              ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
              : "border-border hover:bg-muted"
          )}
          aria-label="Not helpful"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>No</span>
        </button>
      </div>
    </div>
  );
}
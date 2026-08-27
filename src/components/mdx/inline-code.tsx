'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InlineCode({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [copied, setCopied] = useState(false);
  
  // If we are inside a <pre> block, we don't want to render the interactive inline code
  // The CodeBlock component handles <pre> blocks.
  // We can detect this roughly by checking if the class name includes language-*
  // which is typically added to <code> inside <pre>.
  const isBlockCode = className && className.includes('language-');
  
  if (isBlockCode) {
    return <code className={className} {...props}>{children}</code>;
  }

  const text = React.Children.toArray(children).join('');
  
  // Only make it interactive if it looks like a command or is somewhat long,
  // or just make all inline code interactive. Let's make all inline code click-to-copy!
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <code
      className={cn(
        "relative group inline-flex items-center gap-1 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium transition-colors hover:bg-muted/80 cursor-pointer",
        className
      )}
      onClick={handleCopy}
      title="Click to copy"
      {...props}
    >
      <span>{children}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center -mr-0.5 w-3 h-3 text-muted-foreground">
        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
      </span>
    </code>
  );
}

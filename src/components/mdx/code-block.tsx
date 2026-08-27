'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text content from the children tree for the copy button
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node)) return extractText((node.props as {children?: React.ReactNode}).children);
    return '';
  };

  const handleCopy = async () => {
    const textToCopy = extractText(children);
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-secondary/80 text-secondary-foreground backdrop-blur opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary border border-border shadow-sm z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre className={cn("relative overflow-x-auto m-0 !mt-0", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}

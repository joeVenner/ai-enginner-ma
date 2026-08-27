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

  // Try to find the language class from the child code element
  let language = '';
  if (React.isValidElement(children)) {
    const childProps = children.props as { className?: string };
    if (childProps.className) {
      const classNameMatch = childProps.className.match(/language-(\w+)/);
      if (classNameMatch && classNameMatch[1]) {
        language = classNameMatch[1];
      }
    }
  }

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
    <div className="relative group my-6 overflow-hidden rounded-xl border border-border">
      {/* Code Block Header (Language Badge + Copy Button container) */}
      <div className="flex items-center justify-between bg-muted/80 px-4 py-2 border-b border-border text-xs text-muted-foreground">
        <span className="font-mono uppercase">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex h-6 w-6 items-center justify-center rounded-md transition-all hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <pre className={cn("relative overflow-x-auto p-4 m-0 !mt-0", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}

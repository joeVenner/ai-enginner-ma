'use client';

import React, { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
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

  const handleDownload = () => {
    const textToDownload = extractText(children);
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snippet.${language || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    <div className="relative group my-6 overflow-hidden rounded-xl border border-border bg-card">
      {/* Code Block Header (Language Badge + Copy Button container) */}
      <div className="flex items-center justify-between bg-muted/80 px-4 py-2 border-b border-border text-xs text-muted-foreground transition-colors group-hover:bg-muted">
        <div className="flex items-center gap-2">
          {language && (
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary/70"></span>
              <span className="font-mono font-medium lowercase">{language}</span>
            </div>
          )}
          {!language && <span className="font-mono lowercase text-muted-foreground/70">text</span>}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            className="flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-muted-foreground"
            aria-label="Download code"
            title="Download code"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline-block text-xs font-medium">Download</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-muted-foreground"
            aria-label="Copy code"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs font-medium text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <pre className={cn("relative overflow-x-auto p-4 m-0 !mt-0 text-[13px] leading-relaxed", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}

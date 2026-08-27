'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, Play, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

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

  const codeString = extractText(children);

  const handleDownload = () => {
    const blob = new Blob([codeString], { type: 'text/plain' });
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
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  // Simulate code execution for JS/TS
  const handleRunCode = () => {
    if (language !== 'js' && language !== 'javascript' && language !== 'ts' && language !== 'typescript') {
      return;
    }
    
    setViewMode('preview');
    setIsRunning(true);
    setOutput([]);
    
    // Simulate compilation/startup delay
    setTimeout(() => {
      try {
        const logs: string[] = [];
        // Safely override console.log for the eval scope
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        
        // Very basic safe eval wrapper (Note: real apps should use WebWorkers or sandboxed iframes)
        // We only allow this for demonstration purposes in a controlled client component
        // Create a safe execution environment for the code block
        const executeCode = new Function(codeString);
        executeCode();

        console.log = originalLog;

        if (logs.length === 0) {
          logs.push("/* Program exited with no output */");
        }

        setOutput(logs);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setOutput([`Error: ${error.message}`]);
        } else {
          setOutput([`Error: ${String(error)}`]);
        }
      } finally {
        setIsRunning(false);
      }
    }, 600);
  };

  const isRunnable = ['js', 'javascript', 'ts', 'typescript'].includes(language.toLowerCase());

  return (
    <div className="relative group my-6 overflow-hidden rounded-xl border border-border bg-[#282c34]">
      {/* Code Block Header (Tabs + Actions container) */}
      <div className="flex items-center justify-between bg-black/40 px-3 py-2 border-b border-white/10 text-xs text-muted-foreground transition-colors group-hover:bg-black/50">
        <div className="flex items-center gap-1">
          {/* Tabs */}
          <button
            onClick={() => setViewMode('code')}
            className={cn(
              "px-3 py-1.5 rounded-md font-medium transition-colors",
              viewMode === 'code' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            {language ? language.toUpperCase() : 'TEXT'}
          </button>
          
          {isRunnable && (
            <button
              onClick={() => setViewMode('preview')}
              className={cn(
                "px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5",
                viewMode === 'preview' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Terminal className="h-3 w-3" />
              Console
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {isRunnable && viewMode === 'code' && (
            <button
              onClick={handleRunCode}
              className="flex h-7 px-3 items-center justify-center gap-1.5 rounded-md bg-green-500/20 text-green-400 transition-all hover:bg-green-500/30 focus-visible:outline-none mr-2 font-medium"
              aria-label="Run code"
              title="Run code"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Run
            </button>
          )}
          <button
            onClick={handleDownload}
            className="flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all hover:bg-white/10 text-white/70 hover:text-white focus-visible:outline-none"
            aria-label="Download code"
            title="Download code"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all hover:bg-white/10 text-white/70 hover:text-white focus-visible:outline-none"
            aria-label="Copy code"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {viewMode === 'code' ? (
          <SyntaxHighlighter
            language={language || 'text'}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              fontSize: '14px',
              background: 'transparent',
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineNumberStyle={{ opacity: 0.3, minWidth: '2.5em', paddingRight: '1em' }}
          >
            {codeString}
          </SyntaxHighlighter>
        ) : (
          <div className="p-5 font-mono text-sm min-h-[150px] bg-[#1e1e1e] text-zinc-300">
            {isRunning ? (
              <div className="flex items-center gap-3 text-zinc-500 animate-pulse">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                Compiling and executing...
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {output.map((line, i) => (
                  <div key={i} className={cn(
                    "flex items-start gap-3",
                    line.startsWith('Error:') ? 'text-red-400' : 'text-zinc-300'
                  )}>
                    <span className="text-zinc-600 select-none">&gt;</span>
                    <span className="whitespace-pre-wrap font-mono">{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

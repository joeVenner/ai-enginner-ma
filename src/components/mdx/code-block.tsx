'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, Play, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Mermaid } from './mermaid';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Handle hydration mismatch for theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  // If this is a Mermaid diagram block, intercept it entirely and render the diagram!
  if (language === 'mermaid') {
    return <Mermaid chart={codeString} />;
  }

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
  const isLight = mounted && resolvedTheme === 'light';

  return (
    <div className={cn(
      "relative group my-6 overflow-hidden rounded-xl border border-border",
      isLight ? "bg-[#fafafa]" : "bg-[#282c34]"
    )}>
      {/* Code Block Header (Tabs + Actions container) */}
      <div className={cn(
        "flex items-center justify-between px-3 py-2 border-b text-xs transition-colors",
        isLight ? "bg-black/5 border-black/10 text-zinc-600 group-hover:bg-black/10" : "bg-black/40 border-white/10 text-muted-foreground group-hover:bg-black/50"
      )}>
        <div className="flex items-center gap-1">
          {/* Tabs */}
          <button
            onClick={() => setViewMode('code')}
            className={cn(
              "px-3 py-1.5 rounded-md font-medium transition-colors",
              viewMode === 'code'
                ? (isLight ? "bg-black/10 text-black" : "bg-white/10 text-white")
                : (isLight ? "text-zinc-600 hover:text-black hover:bg-black/5" : "text-white/60 hover:text-white hover:bg-white/5")
            )}
          >
            {language ? language.toUpperCase() : 'TEXT'}
          </button>

          {isRunnable && (
            <button
              onClick={() => setViewMode('preview')}
              className={cn(
                "px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5",
                viewMode === 'preview'
                  ? (isLight ? "bg-black/10 text-black" : "bg-white/10 text-white")
                  : (isLight ? "text-zinc-600 hover:text-black hover:bg-black/5" : "text-white/60 hover:text-white hover:bg-white/5")
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
              className={cn(
                "flex h-7 px-3 items-center justify-center gap-1.5 rounded-md transition-all focus-visible:outline-none mr-2 font-medium",
                isLight ? "bg-green-600/10 text-green-600 hover:bg-green-600/20" : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
              )}
              aria-label="Run code"
              title="Run code"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Run
            </button>
          )}
          <button
            onClick={handleDownload}
            className={cn(
              "flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all focus-visible:outline-none",
              isLight ? "hover:bg-black/10 text-zinc-500 hover:text-black" : "hover:bg-white/10 text-white/70 hover:text-white"
            )}
            aria-label="Download code"
            title="Download code"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className={cn(
              "flex h-7 px-2 items-center justify-center gap-1.5 rounded-md transition-all focus-visible:outline-none",
              isLight ? "hover:bg-black/10 text-zinc-500 hover:text-black" : "hover:bg-white/10 text-white/70 hover:text-white"
            )}
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
      </div>

      {/* Content Area */}
      <div className="relative">
        {viewMode === 'code' ? (
          <SyntaxHighlighter
            language={language || 'text'}
            style={isLight ? oneLight : oneDark}
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
          <div className={cn(
            "p-5 font-mono text-sm min-h-[150px]",
            isLight ? "bg-[#f5f5f5] text-zinc-800" : "bg-[#1e1e1e] text-zinc-300"
          )}>
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
                    line.startsWith('Error:') ? 'text-red-500' : (isLight ? 'text-zinc-800' : 'text-zinc-300')
                  )}>
                    <span className="text-zinc-500 select-none">&gt;</span>
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

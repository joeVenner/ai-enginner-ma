'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { Skeleton } from '../loading-skeleton';

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  
  // Use a unique ID for each instance to prevent rendering conflicts
  const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'var(--font-sans)',
    });

    const renderMermaid = async () => {
      if (!chart || !containerRef.current) return;

      try {
        setError(false);
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Failed to render Mermaid chart', err);
        setError(true);
      }
    };

    renderMermaid();
  }, [chart, resolvedTheme, id]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-200">
        <p className="font-semibold">Failed to render diagram</p>
        <pre className="mt-2 overflow-auto text-xs">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return <Skeleton className="my-6 h-64 w-full rounded-xl" />;
  }

  return (
    <div className="my-8 flex justify-center overflow-x-auto rounded-xl border border-border bg-card p-6 shadow-sm">
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svg }} 
        className="mermaid-container [&>svg]:max-w-full [&>svg]:h-auto"
      />
    </div>
  );
}

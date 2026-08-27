'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="mt-16 border-t border-border pt-10 min-h-[300px] flex items-center justify-center">
       <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div id="comments-section" className="mt-16 border-t border-border pt-10">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">Discussion</h2>
      <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
        <Giscus
          id="comments"
          repo="joeVenner/ai-enginner-ma"
          repoId="R_kgDONnFwaw" 
          category="General"
          categoryId="DIC_kwDONnFwa84CmCQQ"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={resolvedTheme === 'dark' ? 'transparent_dark' : 'light'}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
}

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

  if (!mounted) return null;

  return (
    <div className="mt-16 border-t border-border pt-10">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">Comments</h2>
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
        inputPosition="bottom"
        theme={resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

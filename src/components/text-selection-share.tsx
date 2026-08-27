'use client';

import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function TextSelectionShare() {
  const [selection, setSelection] = useState<{
    text: string;
    x: number;
    y: number;
    show: boolean;
  }>({ text: '', x: 0, y: 0, show: false });

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeSelection = window.getSelection();
      
      if (!activeSelection || activeSelection.isCollapsed) {
        setSelection((prev) => ({ ...prev, show: false }));
        return;
      }

      const text = activeSelection.toString().trim();
      
      // Only show if the selection is long enough and we are inside an article
      // We check if the selection is inside a .prose container
      let isInsideArticle = false;
      let node = activeSelection.anchorNode;
      while (node && node.nodeName !== 'BODY') {
        if (node.nodeType === 1 && (node as Element).classList?.contains('prose')) {
          isInsideArticle = true;
          break;
        }
        node = node.parentNode;
      }

      if (text.length > 5 && isInsideArticle) {
        const range = activeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelection({
          text,
          x: rect.left + rect.width / 2,
          y: rect.top - 10, // 10px above the selection
          show: true,
        });
      } else {
        setSelection((prev) => ({ ...prev, show: false }));
      }
    };

    const handleScroll = () => {
      setSelection((prev) => ({ ...prev, show: false }));
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!selection.show) return null;

  const url = typeof window !== 'undefined' ? window.location.href : siteConfig.url;
  const shareText = encodeURIComponent(`"${selection.text}"\n\n`);
  const shareUrl = encodeURIComponent(url);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  return (
    <div
      className="fixed z-[9999] -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 duration-200"
      style={{
        left: `${selection.x}px`,
        top: `${selection.y}px`,
      }}
    >
      <div className="flex items-center rounded-lg border border-border bg-foreground px-1 py-1 shadow-xl">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-background/20"
          onMouseDown={(e) => e.preventDefault()} // Prevent losing selection when clicking
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </a>
        <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-foreground"></div>
      </div>
    </div>
  );
}

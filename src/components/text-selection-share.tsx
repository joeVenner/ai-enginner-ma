'use client';

import { useEffect, useState } from 'react';
import { Quote, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function TextSelectionShare() {
  const [selection, setSelection] = useState<{
    text: string;
    x: number;
    y: number;
    show: boolean;
  }>({ text: '', x: 0, y: 0, show: false });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      // Small timeout to allow selection to finish updating
      setTimeout(() => {
        const activeSelection = window.getSelection();
        
        if (!activeSelection || activeSelection.isCollapsed) {
          if (selection.show) setSelection((prev) => ({ ...prev, show: false }));
          return;
        }

        const text = activeSelection.toString().trim();
        
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
          try {
            const range = activeSelection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setSelection({
              text,
              x: rect.left + rect.width / 2,
              y: rect.top - 15,
              show: true,
            });
          } catch {
            // Ignore range errors
          }
        } else {
          setSelection((prev) => ({ ...prev, show: false }));
        }
      }, 50);
    };

    const handleScroll = () => {
      if (selection.show) {
        setSelection((prev) => ({ ...prev, show: false }));
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [selection.show]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(`"${selection.text}" — ${siteConfig.name} (${window.location.href})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  if (!selection.show) return null;

  const url = typeof window !== 'undefined' ? window.location.href : siteConfig.url;
  const shareText = encodeURIComponent(`"${selection.text}"\n\n`);
  const shareUrl = encodeURIComponent(url);
  // Using X (Twitter) intent URL
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  return (
    <div
      className="fixed z-[9999] -translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 duration-200 ease-out pointer-events-auto"
      style={{
        left: `${selection.x}px`,
        top: `${selection.y}px`,
      }}
    >
      <div className="relative flex items-center rounded-xl border border-white/10 bg-[#1e1e1e] p-1 shadow-2xl before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#1e1e1e]">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 text-white/80 transition-all hover:bg-white/10 hover:text-white group"
          onMouseDown={(e) => e.preventDefault()} 
        >
          {/* X (Twitter) raw SVG since lucide doesn't have the new X logo */}
          <svg className="h-4 w-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
          <span className="text-[10px] font-semibold tracking-wider">Tweet</span>
        </a>
        
        <div className="h-8 w-px bg-white/10 mx-1"></div>
        
        <button
          onClick={handleCopy}
          className="flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 text-white/80 transition-all hover:bg-white/10 hover:text-white group"
          onMouseDown={(e) => e.preventDefault()}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400 transition-transform scale-110" />
          ) : (
            <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
          )}
          <span className="text-[10px] font-semibold tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
        </button>

        <div className="h-8 w-px bg-white/10 mx-1"></div>
        
        <a
          href={`mailto:?subject=Read this from ${siteConfig.name}&body=${shareText}%0A%0A${shareUrl}`}
          className="flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 text-white/80 transition-all hover:bg-white/10 hover:text-white group"
          onMouseDown={(e) => e.preventDefault()}
        >
          <Quote className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="text-[10px] font-semibold tracking-wider">Email</span>
        </a>
      </div>
    </div>
  );
}

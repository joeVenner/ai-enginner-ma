'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/content';

interface ArticleNavProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

export function ArticleNav({ prevArticle, nextArticle }: ArticleNavProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if the user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.hasAttribute('contenteditable')
      ) {
        return;
      }

      if (e.key === 'ArrowLeft' && prevArticle) {
        router.push(`/articles/${prevArticle.slug}`);
      } else if (e.key === 'ArrowRight' && nextArticle) {
        router.push(`/articles/${nextArticle.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevArticle, nextArticle, router]);

  if (!prevArticle && !nextArticle) return null;

  return (
    <div className="my-12 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2 sm:gap-8">
      {prevArticle ? (
        <Link 
          href={`/articles/${prevArticle.slug}`}
          className="group flex flex-col items-start justify-center rounded-xl border border-transparent p-4 transition-colors hover:bg-secondary hover:border-border"
          title="Press Left Arrow to go to previous article"
        >
          <span className="mb-2 flex items-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="line-clamp-2 text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {prevArticle.frontmatter.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      
      {nextArticle ? (
        <Link 
          href={`/articles/${nextArticle.slug}`}
          className="group flex flex-col items-end justify-center rounded-xl border border-transparent p-4 text-right transition-colors hover:bg-secondary hover:border-border"
          title="Press Right Arrow to go to next article"
        >
          <span className="mb-2 flex items-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Next
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="line-clamp-2 text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {nextArticle.frontmatter.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

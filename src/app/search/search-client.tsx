'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { useDebounce } from '@/hooks/use-debounce';
import type { Article } from '@/lib/content';

export function SearchClient({ initialArticles }: { initialArticles: Article[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize query from URL if it exists
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Debounce the query to prevent lag on every keystroke
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync debounced query to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    // Use replace to avoid filling history with every keystroke
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, pathname, router, searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus input on Cmd+K or Ctrl+K if already on search page
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredArticles = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const lowerQuery = debouncedQuery.toLowerCase();

    return initialArticles.filter((article) => {
      const { title, description, category, tags } = article.frontmatter;
      const content = article.content;

      return (
        title.toLowerCase().includes(lowerQuery) ||
        description.toLowerCase().includes(lowerQuery) ||
        (category && category.toLowerCase().includes(lowerQuery)) ||
        (tags && tags.some(tag => tag.toLowerCase().includes(lowerQuery))) ||
        content.toLowerCase().includes(lowerQuery)
      );
    });
  }, [debouncedQuery, initialArticles]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Search</h1>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="block w-full rounded-xl border border-input bg-card p-4 pl-10 pr-24 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-lg"
            placeholder="Search articles, topics, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="pointer-events-auto rounded-full bg-muted/80 p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden rounded border border-border bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div>
        {debouncedQuery.trim() === '' ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-muted-foreground">
            <SearchIcon className="mb-2 h-8 w-8 opacity-50" />
            <p>Start typing to search across all articles</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-muted-foreground">
                Found {filteredArticles.length} result{filteredArticles.length === 1 ? '' : 's'}
              </h2>
              <span className="text-sm text-muted-foreground/80">
                ~{filteredArticles.reduce((acc, article) => acc + article.readingTime, 0)} mins total reading time
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-muted-foreground">
            <p className="mb-2 text-lg font-medium">No results found</p>
            <p>We couldn&apos;t find anything matching &quot;{debouncedQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}

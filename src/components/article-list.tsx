'use client';

import { useState, useMemo } from 'react';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/content';
import { ChevronDown, RefreshCw, LayoutGrid, List } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'shortest' | 'longest';
type ViewMode = 'grid' | 'list';

interface ArticleListProps {
  initialArticles: Article[];
}

const ARTICLES_PER_PAGE = 6;

export function ArticleList({ initialArticles }: ArticleListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const sortedArticles = useMemo(() => {
    const articles = [...initialArticles];

    switch (sortBy) {
      case 'newest':
        return articles.sort((a, b) =>
          new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        );
      case 'oldest':
        return articles.sort((a, b) =>
          new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime()
        );
      case 'shortest':
        return articles.sort((a, b) => a.readingTime - b.readingTime);
      case 'longest':
        return articles.sort((a, b) => b.readingTime - a.readingTime);
      default:
        return articles;
    }
  }, [initialArticles, sortBy]);

  // Reset pagination when sorting changes
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + ARTICLES_PER_PAGE);
  };

  const visibleArticles = sortedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < sortedArticles.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-medium">
          Showing {Math.min(visibleCount, sortedArticles.length)} of {sortedArticles.length} articles
        </p>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="hidden sm:flex items-center rounded-md border border-border/50 bg-secondary/30 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex h-7 w-8 items-center justify-center rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-background shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex h-7 w-8 items-center justify-center rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-background shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none bg-background border border-input rounded-md py-1.5 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer shadow-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="shortest">Shortest read</option>
              <option value="longest">Longest read</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {sortedArticles.length > 0 ? (
        <>
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2" 
              : "flex flex-col gap-6"
          }>
            {visibleArticles.map((article) => (
              <div key={article.slug} className={viewMode === 'list' ? 'w-full' : ''}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-sm font-medium transition-all hover:bg-muted hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
              >
                <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
                Load More Articles
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground bg-secondary/10">
          No articles found.
        </div>
      )}
    </div>
  );
}

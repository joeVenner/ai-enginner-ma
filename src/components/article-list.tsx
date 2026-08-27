'use client';

import { useState, useMemo } from 'react';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/content';
import { ChevronDown } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'shortest' | 'longest';

interface ArticleListProps {
  initialArticles: Article[];
}

export function ArticleList({ initialArticles }: ArticleListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">
          Showing {sortedArticles.length} articles
        </p>
        
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-background border border-input rounded-md py-1.5 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
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

      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground">
          No articles found.
        </div>
      )}
    </div>
  );
}

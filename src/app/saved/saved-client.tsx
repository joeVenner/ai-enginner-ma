'use client';

import { Bookmark } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { useBookmarks } from '@/hooks/use-bookmarks';
import type { Article } from '@/lib/content';

export function SavedArticlesClient({ allArticles }: { allArticles: Article[] }) {
  const { bookmarks, mounted } = useBookmarks();

  if (!mounted) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Saved Articles</h1>
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  const savedArticles = allArticles.filter((article) => bookmarks.includes(article.slug));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Saved Articles</h1>
        <p className="text-muted-foreground text-lg">
          You have {bookmarks.length} saved article{bookmarks.length === 1 ? '' : 's'}.
        </p>
      </div>

      {savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {savedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-muted-foreground">
          <Bookmark className="mb-4 h-12 w-12 opacity-50" />
          <p className="mb-2 text-xl font-medium">No saved articles yet</p>
          <p>Click the bookmark icon on any article to save it for later.</p>
        </div>
      )}
    </div>
  );
}

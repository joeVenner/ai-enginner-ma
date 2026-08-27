'use client';

import { History, Trash2 } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { useReadingHistory } from '@/hooks/use-reading-history';
import type { Article } from '@/lib/content';

export function HistoryClient({ allArticles }: { allArticles: Article[] }) {
  const { history, clearHistory, mounted } = useReadingHistory();

  if (!mounted) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Reading History</h1>
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  // Preserve the order from the history array
  const historyArticles = history
    .map(slug => allArticles.find(a => a.slug === slug))
    .filter((article): article is Article => article !== undefined);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight">Reading History</h1>
          <p className="text-muted-foreground text-lg">
            Your {history.length} most recently viewed article{history.length === 1 ? '' : 's'}.
          </p>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </button>
        )}
      </div>

      {historyArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {historyArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-muted-foreground text-center px-4">
          <History className="mb-4 h-12 w-12 opacity-50" />
          <p className="mb-2 text-xl font-medium">No history yet</p>
          <p>Articles you read will automatically appear here.</p>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { Article } from '@/lib/content';
import { BookOpen } from 'lucide-react';

interface ArticleSeriesProps {
  currentArticle: Article;
  allArticles: Article[];
}

export function ArticleSeries({ currentArticle, allArticles }: ArticleSeriesProps) {
  const { series, seriesOrder } = currentArticle.frontmatter;

  if (!series) {
    return null;
  }

  // Find all articles in the same series, sorted by order
  const seriesArticles = allArticles
    .filter((a) => a.frontmatter.series === series)
    .sort((a, b) => {
      const orderA = a.frontmatter.seriesOrder || 999;
      const orderB = b.frontmatter.seriesOrder || 999;
      return orderA - orderB;
    });

  if (seriesArticles.length <= 1) {
    return null;
  }

  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-primary">
        <BookOpen className="h-5 w-5" />
        <h3 className="text-lg font-bold tracking-tight">
          Series: {series}
        </h3>
      </div>
      
      <p className="mb-4 text-sm text-muted-foreground">
        This article is part {seriesOrder || '?'} of a {seriesArticles.length}-part series.
      </p>

      <div className="space-y-3">
        {seriesArticles.map((article, index) => {
          const isCurrent = article.slug === currentArticle.slug;
          const order = article.frontmatter.seriesOrder || index + 1;
          
          return (
            <div 
              key={article.slug}
              className={`flex items-start gap-3 rounded-lg px-3 py-2 transition-colors ${
                isCurrent ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted'
              }`}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-xs font-bold border border-border">
                {order}
              </div>
              <div className="flex-1">
                {isCurrent ? (
                  <span>{article.frontmatter.title} (You are here)</span>
                ) : (
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="hover:underline hover:text-primary"
                  >
                    {article.frontmatter.title}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

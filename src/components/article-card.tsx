import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { BookmarkButton } from './bookmark-button';
import { ReadTimeBadge } from './read-time-badge';
import type { Article } from '@/lib/content';
import Balancer from 'react-wrap-balancer';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { title, description, date, category, tags } = article.frontmatter;

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg hover:border-primary/50">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {category && (
              <Link
                href={`/categories/${category.toLowerCase()}`}
                className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary hover:bg-primary/20 transition-colors z-10 relative"
              >
                {category}
              </Link>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={date}>{format(parseISO(date), 'MMMM d, yyyy')}</time>
            </div>
            <ReadTimeBadge minutes={article.readingTime} />
            <div className="z-10 relative ml-auto">
              <BookmarkButton slug={article.slug} />
            </div>
          </div>

          <h2 className="mb-4 text-2xl md:text-3xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
              <Balancer>{title}</Balancer>
            </Link>
          </h2>

          <p className="mb-6 line-clamp-3 text-muted-foreground">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2 z-10 relative">
              {tags.slice(0, 3).map(tag => (
                <Link 
                  key={tag} 
                  href={`/tags/${tag.toLowerCase()}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{tags.length - 3}</span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-center text-sm font-medium text-primary">
            Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md hover:border-primary/50">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <time dateTime={date}>{format(parseISO(date), 'MMM d, yyyy')}</time>
            <span className="hidden sm:inline-block">•</span>
            <ReadTimeBadge minutes={article.readingTime} />
          </div>

          <div className="flex items-center gap-2">
            {category && (
              <Link
                href={`/categories/${category.toLowerCase()}`}
                className="z-10 relative rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {category}
              </Link>
            )}
            <div className="z-10 relative">
              <BookmarkButton slug={article.slug} />
            </div>
          </div>
        </div>

        <div className="group relative w-full mb-4 flex-1">
          <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
            <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
              <Balancer>{title}</Balancer>
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-2 z-10 relative border-t w-full border-border/50">
            {tags.slice(0, 3).map(tag => (
              <Link 
                key={tag} 
                href={`/tags/${tag.toLowerCase()}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center text-xs text-muted-foreground">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

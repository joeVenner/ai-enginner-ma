import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { BookmarkButton } from './bookmark-button';
import { ReadTimeBadge } from './read-time-badge';
import type { Article } from '@/lib/content';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { title, description, date, category, tags } = article.frontmatter;

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card to-secondary/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
        <div className="flex flex-col justify-center p-8 md:p-14 relative z-10">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
            {category && (
              <Link
                href={`/categories/${category.toLowerCase()}`}
                className="rounded-full bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/20 transition-colors z-20 relative backdrop-blur-sm"
              >
                {category}
              </Link>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={date}>{format(parseISO(date), 'MMMM d, yyyy')}</time>
            </div>
            <div className="hidden sm:block h-1 w-1 rounded-full bg-border"></div>
            <ReadTimeBadge minutes={article.readingTime} />
            <div className="z-20 relative ml-auto bg-background/50 backdrop-blur-sm rounded-full p-1">
              <BookmarkButton slug={article.slug} />
            </div>
          </div>

          <h2 className="mb-5 text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground transition-colors group-hover:text-primary [text-wrap:balance]">
            <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h2>

          <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            {tags && tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-2 z-20 relative">
                {tags.slice(0, 3).map(tag => (
                  <Link 
                    key={tag} 
                    href={`/tags/${tag.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors backdrop-blur-sm"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Link>
                ))}
                {tags.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center text-sm font-bold text-primary sm:ml-auto">
              Read Article 
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:translate-x-2 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-5 flex w-full flex-wrap items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-3">
            <time dateTime={date}>{format(parseISO(date), 'MMM d, yyyy')}</time>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border"></span>
            <ReadTimeBadge minutes={article.readingTime} />
          </div>

          <div className="flex items-center gap-2">
            {category && (
              <Link
                href={`/categories/${category.toLowerCase()}`}
                className="z-20 relative rounded-full bg-secondary/70 px-3 py-1 text-secondary-foreground hover:bg-secondary transition-colors"
              >
                {category}
              </Link>
            )}
            <div className="z-20 relative ml-1">
              <BookmarkButton slug={article.slug} />
            </div>
          </div>
        </div>

        <div className="group relative w-full mb-5 flex-1">
          <h3 className="mb-3 text-xl md:text-2xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors [text-wrap:balance]">
            <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-auto pt-5 flex flex-wrap gap-2 z-20 relative border-t w-full border-border/40">
            {tags.slice(0, 3).map(tag => (
              <Link 
                key={tag} 
                href={`/tags/${tag.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center text-xs text-muted-foreground ml-1">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { ReadIndicator } from './read-indicator';
import type { Article } from '@/lib/content';

interface ArticleIndexRowProps {
  article: Article;
}

/**
 * A publication-index row. The landing page uses this instead of the card grid
 * so that the "Latest" section reads as an index rather than as three identical
 * boxes, and so that it stays legible as the archive grows.
 */
export function ArticleIndexRow({ article }: ArticleIndexRowProps) {
  const { title, description, date, category, tags } = article.frontmatter;
  const parsedDate = parseISO(date);

  return (
    <article className="group relative grid grid-cols-1 gap-x-8 gap-y-3 py-8 transition-colors md:grid-cols-[9rem_1fr_auto] md:items-start md:py-9">
      {/* Meta rail. Collapses above the title on small screens. */}
      <div className="order-1 flex items-center gap-3 font-mono text-xs text-muted-foreground md:order-none md:flex-col md:items-start md:gap-1.5 md:pt-1">
        <time dateTime={date}>{format(parsedDate, 'MMM d, yyyy')}</time>
        <span aria-hidden className="h-3 w-px bg-border md:hidden" />
        <span>{article.readingTime} min</span>
      </div>

      <div className="order-2 md:order-none">
        <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-balance transition-colors group-hover:text-brand sm:text-2xl">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
          <span className="relative z-20 ml-2 inline-flex translate-y-0.5">
            <ReadIndicator slug={article.slug} />
          </span>
        </h3>

        <p className="mt-2.5 line-clamp-2 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="relative z-20 mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
          {category && (
            <Link
              href={`/categories/${category.toLowerCase()}`}
              className="rounded-full border border-border px-2.5 py-1 font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              {category}
            </Link>
          )}
          {tags?.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="rounded-full px-1.5 py-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <ArrowUpRight
        aria-hidden
        className="order-3 hidden h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100 motion-reduce:transition-none md:order-none md:mt-1.5 md:block"
      />
    </article>
  );
}

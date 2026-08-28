import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { BookmarkButton } from './bookmark-button';
import { ReadIndicator } from './read-indicator';
import type { Article } from '@/lib/content';

interface FeaturedCoverProps {
  article: Article;
}

/**
 * The lead article, presented as an editorial cover for the hero's second
 * column. This replaces the hand-built "code editor" mockup that used to sit
 * here: a real, linkable article is both a stronger visual anchor and the thing
 * a reader actually came for.
 */
export function FeaturedCover({ article }: FeaturedCoverProps) {
  const { title, description, date, category, image } = article.frontmatter;
  const parsedDate = parseISO(date);

  return (
    <article className="h-full group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-24px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-brand/50">
      {image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wider text-brand">
            Featured
          </span>
          {category && (
            <>
              <span aria-hidden className="h-3 w-px bg-border" />
              <Link
                href={`/categories/${category.toLowerCase()}`}
                className="relative z-20 transition-colors hover:text-foreground"
              >
                {category}
              </Link>
            </>
          )}
          <span aria-hidden className="h-3 w-px bg-border" />
          <time dateTime={date}>{format(parsedDate, 'MMM d, yyyy')}</time>

          <span className="relative z-20 ml-auto flex items-center gap-2">
            <ReadIndicator slug={article.slug} />
            <BookmarkButton slug={article.slug} />
          </span>
        </div>

        <h2 className="font-heading text-2xl font-bold leading-[1.15] tracking-tight text-balance transition-colors group-hover:text-brand sm:text-3xl">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h2>

        <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-foreground">
          Read this one
          <ArrowUpRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:transform-none" />
          <span className="ml-auto font-normal text-muted-foreground">
            {article.readingTime} min read
          </span>
        </div>
      </div>
    </article>
  );
}

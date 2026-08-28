import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles, getAdjacentArticles } from '@/lib/content';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { TableOfContents } from '@/components/table-of-contents';
import { MobileToc } from '@/components/mobile-toc';
import { MobileActionsBar } from '@/components/mobile-actions-bar';
import { ArticleSeries } from '@/components/article-series';
import { ArticleFooterActions } from '@/components/article-footer-actions';
import { ShareButtons } from '@/components/share-buttons';
import { BookmarkButton } from '@/components/bookmark-button';
import { Newsletter } from '@/components/newsletter';
import { RelatedArticles } from '@/components/related-articles';
import { ArticleNav } from '@/components/article-nav';
import { NextArticleTeaser } from '@/components/next-article-teaser';
import { EstimatedRead } from '@/components/estimated-read';
import { AuthorBio } from '@/components/author-bio';
import { ViewCount } from '@/components/view-count';
import { HistoryTracker } from '@/components/history-tracker';
import { Comments } from "@/components/comments";
import { ArticleSchema } from '@/components/schema-org';
import { ReadAloud } from '@/components/read-aloud';
import { AiSummary } from '@/components/ai-summary';
import { FocusModeToggle } from '@/components/focus-mode-toggle';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx/components';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { remarkAdmonition } from '@/components/mdx/remark-admonition';
import { remarkGlossary } from '@/components/mdx/remark-glossary';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all articles at build time
export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate SEO metadata for the article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const url = `${siteConfig.url}/articles/${article.slug}`;

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    authors: [{ name: article.frontmatter.author }],
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: 'article',
      url,
      publishedTime: article.frontmatter.date,
      tags: article.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
    alternates: {
      canonical: url,
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, allArticles, adjacentArticles] = await Promise.all([
    getArticleBySlug(slug),
    getAllArticles(),
    getAdjacentArticles(slug)
  ]);

  if (!article) {
    notFound();
  }

  const { title, description, date, author, category, tags, image, aiSummary } = article.frontmatter;

  return (
    <article className="mx-auto min-h-screen max-w-[1400px] px-4 py-12 sm:px-6 md:py-16">
      <HistoryTracker slug={slug} />
      <ArticleSchema
        article={{
          title,
          description,
          date,
          author,
          slug,
          image
        }}
      />
      <EstimatedRead readingTime={article.readingTime} />

      {/* Back button */}
      <Link
        href="/articles"
        className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to articles
      </Link>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {category && (
            <Link
              href={`/categories/${category.toLowerCase()}`}
              className="inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              {category}
            </Link>
          )}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <FocusModeToggle />
            <ReadAloud title={title} />
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-foreground">
          {title}
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <Link href={`/authors/${encodeURIComponent((author || 'Editor').toLowerCase())}`} className="flex items-center gap-2 hover:text-primary transition-colors">
            <User className="h-4 w-4" />
            <span className="font-medium text-foreground hover:text-primary transition-colors">{author}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{format(parseISO(date), 'MMMM d, yyyy')}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{article.readingTime} min read</span>
          </div>
          <ViewCount slug={article.slug} />
        </div>
      </header>

      {/* Hero Image */}
      <div className="mb-12 overflow-hidden rounded-2xl bg-muted aspect-video md:aspect-[2/1] relative border border-border/50 shadow-sm">
        <img
          src={image || `/articles/${article.slug}/opengraph-image`}
          alt={title}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>


      {/* Article Content Layout */}
      <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16 relative">

        {/* Sticky Social Share (Desktop Left) */}
        <aside className="hidden xl:flex flex-col items-center gap-4 sticky top-32 h-fit pt-4 transition-opacity duration-300 focus-hide">
          <div className="flex flex-col items-center gap-4 rounded-full border border-border/50 bg-card p-3 shadow-sm">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Share</span>
            <div className="h-px w-8 bg-border"></div>
            <div className="flex flex-col gap-3 [&>div>span]:hidden [&>div]:flex-col [&>div]:gap-3">
              <ShareButtons title={title} slug={article.slug} />
            </div>
            <div className="h-px w-8 bg-border"></div>
            <BookmarkButton slug={article.slug} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 transition-all duration-500 ease-in-out focus-center">
          <MobileToc content={article.content} className="focus-hide" />

          {/* Series Outline */}
          <ArticleSeries currentArticle={article} allArticles={allArticles} />

          {/* AI Summary Component */}
          {aiSummary && aiSummary.length > 0 && (
            <AiSummary summaryPoints={aiSummary} />
          )}

          <div className="prose prose-zinc dark:prose-invert prose-lg md:prose-xl max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath, remarkAdmonition, remarkGlossary],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                      behavior: 'append',
                      properties: {
                        className: ['anchor-link'],
                        ariaHidden: true,
                        tabIndex: -1,
                      },
                      content: {
                        type: 'element',
                        tagName: 'span',
                        properties: { className: ['icon', 'icon-link'] },
                        children: [{ type: 'text', value: ' #' }]
                      }
                    }],
                    rehypeKatex,
                    rehypeHighlight
                  ],
                }
              }}
            />
          </div>

          <ArticleFooterActions title={title} slug={article.slug} tags={tags} />

          {/* Author Bio */}
          <AuthorBio authorName={author || 'Editor'} />

          {/* Newsletter */}
          <Newsletter />

          {/* Previous / Next Article Navigation */}
          <ArticleNav prevArticle={adjacentArticles.prev} nextArticle={adjacentArticles.next} />

          {/* Comments */}
          <Comments />

          {/* Related Articles */}
          <RelatedArticles currentArticle={article} allArticles={allArticles} />
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0 transition-opacity duration-300 focus-hide">
          <TableOfContents content={article.content} />
        </aside>
      </div>

      <MobileActionsBar title={title} slug={article.slug} />

      {/* Slide-in Next Article Teaser */}
      <NextArticleTeaser nextArticle={adjacentArticles.next} />
    </article>
  );
}

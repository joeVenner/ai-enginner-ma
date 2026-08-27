import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles, getAdjacentArticles } from '@/lib/content';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { TableOfContents } from '@/components/table-of-contents';
import { ShareButtons } from '@/components/share-buttons';
import { ArticleNav } from '@/components/article-nav';
import { Newsletter } from '@/components/newsletter';
import { RelatedArticles } from '@/components/related-articles';
import { ReadingProgress } from '@/components/reading-progress';
import { AuthorBio } from '@/components/author-bio';

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
  const ogImage = article.frontmatter.image ? `${siteConfig.url}${article.frontmatter.image}` : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    authors: [{ name: article.frontmatter.author }],
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: 'article',
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.frontmatter.title,
        },
      ],
      publishedTime: article.frontmatter.date,
      tags: article.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, adjacent, allArticles] = await Promise.all([
    getArticleBySlug(slug, true),
    getAdjacentArticles(slug),
    getAllArticles()
  ]);

  if (!article) {
    notFound();
  }

  const { title, description, date, author, category, tags, image } = article.frontmatter;

  return (
    <article className="mx-auto min-h-screen max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <ReadingProgress />
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
        {category && (
          <Link
            href={`/categories/${category.toLowerCase()}`}
            className="mb-6 inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            {category}
          </Link>
        )}

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-foreground">
          {title}
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium text-foreground">{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{format(parseISO(date), 'MMMM d, yyyy')}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {image && (
        <div className="mb-12 overflow-hidden rounded-2xl bg-muted aspect-video md:aspect-[2/1]">
          {/* Using img to avoid external domain restrictions */}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}


      {/* Article Content Layout */}
      <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="prose prose-zinc dark:prose-invert prose-lg md:prose-xl max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: article.html || '' }} />
          </div>

          <div className="mt-16 flex items-center justify-between border-t pt-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags && tags.map(tag => (
                <span key={tag} className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Social Share */}
            <ShareButtons title={title} slug={article.slug} />
          </div>

          {/* Author Bio */}
          <AuthorBio authorName={author || 'Editor'} />

          {/* Article Navigation */}
          <ArticleNav prevArticle={adjacent.prev} nextArticle={adjacent.next} />
          
          {/* Newsletter */}
          <Newsletter />
          
          {/* Related Articles */}
          <RelatedArticles currentArticle={article} allArticles={allArticles} />
        </div>
        
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <TableOfContents html={article.html || ''} />
        </aside>
      </div>
    </article>
  );
}

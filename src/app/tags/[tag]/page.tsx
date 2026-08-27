import { getAllArticles, getAllTags } from '@/lib/content';
import { ArticleCard } from '@/components/article-card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tags = await getAllTags();

  const tag = tags.find(t => t.toLowerCase() === tagSlug);

  if (!tag) {
    return {};
  }

  return {
    title: `Articles tagged with #${tag}`,
    description: `Read all our articles tagged with #${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;

  const tags = await getAllTags();
  const allArticles = await getAllArticles();

  // Find the original tag name with proper casing
  const tagName = tags.find(t => t.toLowerCase() === tagSlug);

  if (!tagName) {
    notFound();
  }

  const tagArticles = allArticles.filter(
    (article) => article.frontmatter.tags?.some(t => t.toLowerCase() === tagSlug)
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/tags" className="hover:text-foreground">Tags</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">#{tagName}</span>
      </div>

      <div className="mb-12 border-b pb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">#{tagName}</h1>
        <p className="text-xl text-muted-foreground">
          {tagArticles.length} {tagArticles.length === 1 ? 'article' : 'articles'} tagged with #{tagName}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tagArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

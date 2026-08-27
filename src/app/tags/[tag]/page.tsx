import { getAllArticles, getAllTags } from '@/lib/content';
import { ArticleCard } from '@/components/article-card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Articles tagged with "${decodedTag}"`,
    description: `Read all articles tagged with ${decodedTag}.`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const articles = await getAllArticles();
  
  // Find articles matching this tag (case-insensitive)
  const tagArticles = articles.filter(article => 
    article.frontmatter.tags?.some(t => t.toLowerCase() === decodedTag.toLowerCase())
  );

  if (tagArticles.length === 0) {
    notFound();
  }

  // Get original casing for display if possible
  const displayTag = tagArticles[0].frontmatter.tags?.find(
    t => t.toLowerCase() === decodedTag.toLowerCase()
  ) || decodedTag;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-12">
        <Link 
          href="/tags"
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Tags
        </Link>
        <div className="border-b pb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Tag: <span className="text-primary">#{displayTag}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {tagArticles.length} {tagArticles.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tagArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

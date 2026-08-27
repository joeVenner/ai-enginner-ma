import { getAllTags, getAllArticles } from '@/lib/content';
import Link from 'next/link';
import { Metadata } from 'next';
import { Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all article tags',
};

export default async function TagsPage() {
  const tags = await getAllTags();
  const allArticles = await getAllArticles();

  // Calculate tag counts
  const tagCounts = tags.map(tag => {
    const count = allArticles.filter(
      article => article.frontmatter.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
    ).length;

    return { name: tag, count };
  }).sort((a, b) => b.count - a.count); // Sort by count descending

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">Tags</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Browse articles by topic.
        </p>
      </div>

      <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tagCounts.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${tag.name.toLowerCase()}`}
            className="group flex flex-col items-center justify-center p-8 text-center rounded-2xl border bg-card hover:border-primary transition-all hover:shadow-md"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <Tag className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">#{tag.name}</h2>
            <p className="text-sm text-muted-foreground font-medium">
              {tag.count} {tag.count === 1 ? 'Article' : 'Articles'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
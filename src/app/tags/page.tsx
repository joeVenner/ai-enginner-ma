import { getAllTags, getAllArticles } from '@/lib/content';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse articles by tag.',
};

export default async function TagsIndexPage() {
  const tags = await getAllTags();
  const articles = await getAllArticles();

  // Count articles per tag
  const tagCounts = tags.map(tag => {
    const count = articles.filter(a => a.frontmatter.tags?.includes(tag)).length;
    return { name: tag, count };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-12 border-b pb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Tags</h1>
        <p className="text-xl text-muted-foreground">
          Browse our articles across specific tags.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tagCounts.map(({ name, count }) => (
          <Link
            key={name}
            href={`/tags/${name.toLowerCase()}`}
            className="group flex items-center gap-2 rounded-full border bg-card px-4 py-2 transition-all hover:border-primary hover:shadow-sm"
          >
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              #{name}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

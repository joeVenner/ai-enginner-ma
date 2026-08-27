import { getAllCategories, getAllArticles } from '@/lib/content';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse articles by category.',
};

export default async function CategoriesIndexPage() {
  const categories = await getAllCategories();
  const articles = await getAllArticles();

  // Count articles per category
  const categoryCounts = categories.map(category => {
    const count = articles.filter(a => a.frontmatter.category === category).length;
    return { name: category, count };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-12 border-b pb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Categories</h1>
        <p className="text-xl text-muted-foreground">
          Browse our articles across different topics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {categoryCounts.map(({ name, count }) => (
          <Link
            key={name}
            href={`/categories/${name.toLowerCase()}`}
            className="group flex flex-col justify-between rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {name}
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              {count} {count === 1 ? 'article' : 'articles'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

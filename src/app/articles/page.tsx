import { getAllArticles, getAllCategories } from '@/lib/content';
import { TrendingArticles } from '@/components/trending-articles';
import { ArticleList } from '@/components/article-list';
import Link from 'next/link';

export const metadata = {
  title: 'All Articles',
  description: 'Explore our complete collection of technical articles on AI, Data, and Engineering.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 border-b pb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">All Articles</h1>
        <p className="text-xl text-muted-foreground">
          Explore our complete collection of technical articles.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16">
        {/* Sidebar - Categories */}
        <aside className="mb-8 w-full md:w-72 md:flex-shrink-0">
          <div className="sticky top-24 space-y-10">
            <div>
              <h2 className="mb-4 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                Categories
              </h2>
              <ul className="flex flex-wrap gap-2 md:flex-col md:gap-3">
                <li>
                  <Link
                    href="/articles"
                    className="inline-block rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                  >
                    All Topics
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/categories/${category.toLowerCase()}`}
                      className="inline-block rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <TrendingArticles articles={articles} />
          </div>
        </aside>

        {/* Article Grid with Sorting */}
        <div className="flex-1">
          <ArticleList initialArticles={articles} />
        </div>
      </div>
    </div>
  );
}

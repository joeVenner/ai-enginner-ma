import { getAllArticles, getAllCategories } from '@/lib/content';
import { ArticleCard } from '@/components/article-card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = await getAllCategories();

  const category = categories.find(c => c.toLowerCase() === categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `\${category} Articles`,
    description: `Read all our articles about \${category}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  const categories = await getAllCategories();
  const allArticles = await getAllArticles();

  // Find the original category name with proper casing
  const categoryName = categories.find(c => c.toLowerCase() === categorySlug);

  if (!categoryName) {
    notFound();
  }

  const categoryArticles = allArticles.filter(
    (article) => article.frontmatter.category?.toLowerCase() === categorySlug
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/categories" className="hover:text-foreground">Categories</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">{categoryName}</span>
      </div>

      <div className="mb-12 border-b pb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{categoryName}</h1>
        <p className="text-xl text-muted-foreground">
          {categoryArticles.length} {categoryArticles.length === 1 ? 'article' : 'articles'} in this category.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

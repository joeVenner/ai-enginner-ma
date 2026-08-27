import { getAllArticles } from '@/lib/content';
import { ArticleCard } from '@/components/article-card';
import { FadeIn } from '@/components/fade-in';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const articles = await getAllArticles();

  // Find the featured article or just use the newest one
  const featuredArticle = articles.find((a) => a.frontmatter.featured) || articles[0];

  // The rest of the latest articles (excluding the featured one)
  const recentArticles = articles
    .filter((a) => a.slug !== featuredArticle?.slug)
    .slice(0, 6);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 overflow-hidden">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24 flex flex-col items-start justify-center space-y-6 max-w-3xl pt-8">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            The future of <span className="text-primary">AI</span>, Data, and Engineering.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Technical deep dives, architecture patterns, and the tooling reshaping how we build software.
          </p>
        </FadeIn>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="mb-16 md:mb-24">
          <FadeIn delay={0.3}>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Featured Read</h2>
            </div>
            <ArticleCard article={featuredArticle} featured />
          </FadeIn>
        </section>
      )}

      {/* Latest Articles */}
      <section className="mb-16 md:mb-24">
        <FadeIn delay={0.1}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
            <Link
              href="/articles"
              className="group flex items-center text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article, index) => (
              <FadeIn key={article.slug} delay={0.1 + (index * 0.1)}>
                <ArticleCard article={article} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground">
            No articles found. Add some markdown files to /content/articles
          </div>
        )}
      </section>
    </div>
  );
}

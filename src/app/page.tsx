import { getAllArticles } from '@/lib/content';
import { ArticleCard } from '@/components/article-card';
import { FadeIn } from '@/components/fade-in';
import { SearchShortcut } from '@/components/search-shortcut';
import { HeroBackground } from '@/components/hero-background';
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
    <div className="relative">
      <HeroBackground />
      
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-16 overflow-hidden">
        {/* Hero Section */}
        <section className="mb-20 md:mb-32 flex flex-col items-center text-center justify-center space-y-8 max-w-4xl mx-auto pt-12 md:pt-20">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Exploring the frontiers of technology
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              The future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">AI</span>, Data, and Engineering.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Technical deep dives, architecture patterns, and the tooling reshaping how we build software.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="w-full max-w-md mx-auto">
            <SearchShortcut />
          </FadeIn>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-20 md:mb-32">
            <FadeIn delay={0.4}>
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
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground bg-muted/20">
              No articles found. Add some markdown files to /content/articles
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

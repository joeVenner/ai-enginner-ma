import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Rss, Cpu, Database, Blocks, Network } from 'lucide-react';
import { getAllArticles } from '@/lib/content';
import { FadeIn } from '@/components/fade-in';
import { SearchShortcut } from '@/components/search-shortcut';
import { HeroBackground } from '@/components/hero-background';
import { FeaturedCarousel } from '@/components/featured-carousel';
import { ArticleIndexRow } from '@/components/article-index-row';
import { GithubIcon } from '@/components/icons';
import { siteConfig } from '@/config/site';

/**
 * Shape language for this page, applied consistently:
 *   surfaces  -> rounded-2xl
 *   anything interactive and inline (buttons, chips, pills) -> rounded-full
 * Accent: `brand` (emerald) and nothing else. `primary` stays a neutral.
 */

const FEEDS = [
  { href: '/rss.xml', label: 'RSS' },
  { href: '/atom.xml', label: 'Atom' },
  { href: '/feed.json', label: 'JSON' },
] as const;

export default async function Home() {
  const articles = await getAllArticles();

  // Get up to 3 featured articles. Backfill with newest if we have fewer than 3 explicit featured ones.
  const explicitFeatured = articles.filter((a) => a.frontmatter.featured);
  let featuredArticles = [...explicitFeatured];
  
  if (featuredArticles.length < 3) {
    const remaining = articles
      .filter((a) => !a.frontmatter.featured)
      .slice(0, 3 - featuredArticles.length);
    featuredArticles = [...featuredArticles, ...remaining];
  }
    
  const featuredSlugs = new Set(featuredArticles.map(a => a.slug));
  const recentArticles = articles
    .filter((a) => !featuredSlugs.has(a.slug))
    .slice(0, 5);

  // Only surface categories that actually have articles behind them. The
  // hardcoded list in siteConfig includes topics with nothing published yet,
  // and linking to empty archives from the landing page is a dead end.
  const categoryCounts = articles.reduce<Map<string, number>>((counts, article) => {
    const category = article.frontmatter.category;
    if (category) counts.set(category, (counts.get(category) ?? 0) + 1);
    return counts;
  }, new Map());

  const topics = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="relative">
      <HeroBackground />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------------------------------------------------------------
            Hero. Asymmetric split: the argument on the left, the lead article
            on the right. Deliberately no eyebrow, no fake product mockup.
        ---------------------------------------------------------------- */}
        <section className="grid grid-cols-1 items-center gap-12 pt-12 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div className="flex flex-col items-start">
            <FadeIn onMount direction="none">
              <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
                The future of AI, Data &amp; Engineering.
              </h1>
            </FadeIn>

            <FadeIn onMount delay={0.08} className="mt-6 max-w-xl">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Technical deep dives, architecture patterns, and the tooling
                reshaping how we build software.
              </p>
            </FadeIn>

            <FadeIn
              onMount
              delay={0.16}
              className="mt-9 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/articles"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                Read articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <SearchShortcut />

            </FadeIn>
          </div>

          {featuredArticles.length > 0 && (
            <FadeIn onMount delay={0.24} direction="none" className="w-full min-w-0">
              <FeaturedCarousel articles={featuredArticles} />
            </FadeIn>
          )}
        </section>

        
        
        {/* ---------------------------------------------------------------
            Focus Areas (Bento Grid)
        ---------------------------------------------------------------- */}
        <section className="border-t border-border py-14 md:py-20">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Explore by focus
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-rows-2">
              <Link 
                href="/categories/agentic ai" 
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand/50 md:col-span-2 lg:row-span-2 min-h-[300px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute right-6 top-6 rounded-full bg-muted p-3 text-muted-foreground transition-colors group-hover:bg-brand/10 group-hover:text-brand">
                  <Network className="h-6 w-6" />
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-brand">
                    Agentic AI
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-sm">
                    Building autonomous systems, multi-agent workflows, and exploring the tooling behind the next generation of AI applications.
                  </p>
                </div>
              </Link>
              
              <Link 
                href="/categories/llms" 
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50 min-h-[180px]"
              >
                <div className="absolute right-4 top-4 text-muted-foreground transition-colors group-hover:text-brand">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-brand">
                    LLMs
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                    Prompt engineering, fine-tuning, and evaluation frameworks.
                  </p>
                </div>
              </Link>

              <Link 
                href="/categories/data" 
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50 min-h-[180px]"
              >
                <div className="absolute right-4 top-4 text-muted-foreground transition-colors group-hover:text-brand">
                  <Database className="h-5 w-5" />
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-brand">
                    Data & RAG
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                    Vector databases, ingestion pipelines, and retrieval architectures.
                  </p>
                </div>
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* ---------------------------------------------------------------
            Topics. A single wrapped row of real categories with real counts.
        ---------------------------------------------------------------- */}
        {topics.length > 0 && (
          <section className="border-t border-border py-10 md:py-12">
            <FadeIn>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <h2 className="mr-2 shrink-0 text-sm font-semibold tracking-tight text-foreground">
                  Topics
                </h2>
                {topics.map(([topic, count]) => (
                  <Link
                    key={topic}
                    href={`/categories/${topic.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground"
                  >
                    {topic}
                    <span className="font-mono text-xs text-muted-foreground/70 transition-colors group-hover:text-brand">
                      {count}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/tags"
                  className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
                >
                  Browse tags
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ---------------------------------------------------------------
            Recent articles, as a publication index rather than a card grid.
        ---------------------------------------------------------------- */}
        <section className="border-t border-border py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
              <FadeIn>
                <div className="flex items-end justify-between gap-6">
                  <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                    Recent articles
                  </h2>
                  <Link
                    href="/articles"
                    className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
                  >
                    All articles
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:transform-none" />
                  </Link>
                </div>
              </FadeIn>

              {recentArticles.length > 0 ? (
                <div className="mt-4 divide-y divide-border">
                  {recentArticles.map((article, index) => (
                    <FadeIn key={article.slug} delay={Math.min(index * 0.06, 0.24)}>
                      <ArticleIndexRow article={article} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <FadeIn>
                  <div className="mt-8 rounded-2xl border border-dashed border-border px-8 py-14 text-center">
                    <p className="font-heading text-lg font-semibold text-foreground">
                      That is everything so far.
                    </p>
                  </div>
                </FadeIn>
              )}
            </div>
            
            {/* Sidebar */}
            <aside className="space-y-10 lg:pt-12">
              <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Subscribe
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Get the latest articles, architecture deep dives, and tutorials delivered straight to your inbox.
                  </p>
                  <form className="mt-5 flex flex-col gap-3" >
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                      required
                    />
                    <button 
                      type="submit"
                      className="h-10 w-full rounded-full bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </FadeIn>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            Follow band. Real destinations only, no signup form behind it.
        ---------------------------------------------------------------- */}
        <section className="border-t border-border py-14 md:py-20">
          <FadeIn>
            <div className="flex flex-col gap-8 rounded-2xl border border-border bg-card px-7 py-9 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-12">
              <div className="max-w-md">
                <h2 className="font-heading text-xl font-bold tracking-tight md:text-2xl">
                  Follow in your feed reader
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Every article lands in these feeds the moment it is published.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {FEEDS.map((feed) => (
                  <a
                    key={feed.label}
                    href={feed.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <Rss className="h-3.5 w-3.5" />
                    {feed.label}
                  </a>
                ))}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Source
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}

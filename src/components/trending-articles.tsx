import type { Article } from '@/lib/content';

interface TrendingArticlesProps {
  articles: Article[];
}

export function TrendingArticles({ articles }: TrendingArticlesProps) {
  // Simple heuristic for trending: featured articles first, then most recently published
  const trending = [...articles]
    .sort((a, b) => {
      // Primary sort: featured
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      
      // Secondary sort: date (newest first)
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    })
    .slice(0, 3); // Top 3 trending

  if (trending.length === 0) return null;

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-6 flex items-center text-lg font-bold tracking-tight">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
          <path d="M8.5 14c-.6-1.5 1.5-2.8 3.5-2.8s4.1 1.3 3.5 2.8"/>
          <path d="M12 7v4"/>
        </svg>
        Trending Now
      </h3>
      
      <div className="flex flex-col gap-6">
        {trending.map((article, i) => (
          <div key={article.slug} className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
              {i + 1}
            </div>
            <div>
              <h4 className="font-medium leading-tight group-hover:text-primary transition-colors">
                <a href={`/articles/${article.slug}`} className="hover:underline">
                  {article.frontmatter.title}
                </a>
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {article.readingTime} min read
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Article } from '@/lib/content';
import { ArticleCard } from '@/components/article-card';
import { ArrowRight } from 'lucide-react';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
}

export function RelatedArticles({ currentArticle, allArticles }: RelatedArticlesProps) {
  // Simple algorithm to find related articles:
  // 1. Must not be the current article
  // 2. Score based on matching tags (3 points each)
  // 3. Score based on matching category (5 points)
  // 4. Sort by score, then by date

  const related = allArticles
    .filter((a) => a.slug !== currentArticle.slug)
    .map((article) => {
      let score = 0;
      
      // Category match
      if (
        currentArticle.frontmatter.category &&
        article.frontmatter.category &&
        currentArticle.frontmatter.category === article.frontmatter.category
      ) {
        score += 5;
      }
      
      // Tags match
      const currentTags = currentArticle.frontmatter.tags || [];
      const articleTags = article.frontmatter.tags || [];
      
      const commonTags = currentTags.filter((tag) => articleTags.includes(tag));
      score += commonTags.length * 3;
      
      return { article, score };
    })
    .filter((item) => item.score > 0) // Only include articles with some relation
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.article.frontmatter.date).getTime() - new Date(a.article.frontmatter.date).getTime();
    })
    .map((item) => item.article)
    .slice(0, 2); // Show top 2 related articles

  if (related.length === 0) {
    // If no related articles found, just show the 2 most recent ones
    related.push(
      ...allArticles
        .filter((a) => a.slug !== currentArticle.slug)
        .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
        .slice(0, 2)
    );
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-border/40 pt-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Read Next</h2>
          <p className="mt-2 text-muted-foreground">Continue reading similar articles</p>
        </div>
        <Link 
          href="/articles" 
          className="group flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {related.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

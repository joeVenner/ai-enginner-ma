import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/content';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
}

export function RelatedArticles({ currentArticle, allArticles }: RelatedArticlesProps) {
  // Find related articles based on shared tags or category
  const related = allArticles
    .filter((a) => a.slug !== currentArticle.slug) // Exclude current
    .map((article) => {
      let score = 0;
      
      // Exact category match gives a high score
      if (
        article.frontmatter.category &&
        currentArticle.frontmatter.category &&
        article.frontmatter.category === currentArticle.frontmatter.category
      ) {
        score += 3;
      }
      
      // Each shared tag gives a point
      if (article.frontmatter.tags && currentArticle.frontmatter.tags) {
        const sharedTags = article.frontmatter.tags.filter((tag) => 
          currentArticle.frontmatter.tags?.includes(tag)
        );
        score += sharedTags.length;
      }
      
      return { article, score };
    })
    .filter((item) => item.score > 0) // Must have at least something in common
    .sort((a, b) => b.score - a.score) // Sort by highest score first
    .slice(0, 2) // Take top 2
    .map((item) => item.article);
    
  if (related.length === 0) return null;

  return (
    <div className="mt-20 border-t pt-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Related Reading
        </h2>
        <Link
          href="/articles"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all articles
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {related.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

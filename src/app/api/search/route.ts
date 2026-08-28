import { NextResponse, NextRequest } from 'next/server';
import { getAllArticles } from '@/lib/content';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase();

    const articles = await getAllArticles();

    // Generate basic index map
    let searchIndex = articles.map(article => ({
      slug: article.slug,
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      category: article.frontmatter.category,
      tags: article.frontmatter.tags,
      // For more advanced search, we might include a truncated raw content string later
    }));

    // If a query is provided, perform relevance-based filtering
    if (query) {
      searchIndex = searchIndex
        .map(item => {
          let score = 0;

          if (item.title.toLowerCase().includes(query)) {
            score += 10;
            if (item.title.toLowerCase().startsWith(query)) score += 5;
          }

          if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) {
            score += 5;
          }

          if (item.description.toLowerCase().includes(query)) {
            score += 3;
          }

          if (item.category && item.category.toLowerCase().includes(query)) {
            score += 2;
          }

          return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ score, ...item }) => item); // strip the temporary score field
    }

    return NextResponse.json({ results: searchIndex });
  } catch (error) {
    console.error('Error generating search index:', error);
    return NextResponse.json({ error: 'Failed to generate search index', results: [] }, { status: 500 });
  }
}

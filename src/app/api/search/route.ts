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

    // If a query is provided, perform basic server-side filtering
    if (query) {
      searchIndex = searchIndex.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        item.category?.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({ results: searchIndex });
  } catch (error) {
    console.error('Error generating search index:', error);
    return NextResponse.json({ error: 'Failed to generate search index', results: [] }, { status: 500 });
  }
}

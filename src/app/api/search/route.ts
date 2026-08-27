import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/content';

export async function GET() {
  try {
    const articles = await getAllArticles();

    // Return only the fields needed for the command palette to keep the payload small
    const searchIndex = articles.map(article => ({
      slug: article.slug,
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      category: article.frontmatter.category,
    }));

    return NextResponse.json(searchIndex);
  } catch (error) {
    console.error('Error generating search index:', error);
    return NextResponse.json({ error: 'Failed to generate search index' }, { status: 500 });
  }
}

import { getAllArticles } from '@/lib/content';
import { siteConfig } from '@/config/site';
import { Feed } from 'feed';

export async function GET() {
  const articles = await getAllArticles();

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en", 
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
      json: `${siteConfig.url}/feed.json`,
      atom: `${siteConfig.url}/atom.xml`,
    },
    author: {
      name: siteConfig.author.name,
      link: siteConfig.links.twitter,
    }
  });

  articles.forEach((article) => {
    feed.addItem({
      title: article.frontmatter.title,
      id: `${siteConfig.url}/articles/${article.slug}`,
      link: `${siteConfig.url}/articles/${article.slug}`,
      description: article.frontmatter.description,
      content: article.content, // Includes full content in RSS
      author: [
        {
          name: article.frontmatter.author || siteConfig.author.name,
        }
      ],
      date: new Date(article.frontmatter.date),
      image: article.frontmatter.image ? `${siteConfig.url}${article.frontmatter.image}` : `${siteConfig.url}/articles/${article.slug}/opengraph-image`,
      category: article.frontmatter.tags?.map(tag => ({ name: tag })) || []
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

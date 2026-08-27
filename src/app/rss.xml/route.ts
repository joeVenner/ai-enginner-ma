import { getAllArticles } from '@/lib/content';
import { siteConfig } from '@/config/site';

export async function GET() {
  const articles = await getAllArticles();

  const feed = `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
      ${articles
        .map((article) => {
          return `
        <item>
          <title><![CDATA[${article.frontmatter.title}]]></title>
          <link>${siteConfig.url}/articles/${article.slug}</link>
          <guid isPermaLink="true">${siteConfig.url}/articles/${article.slug}</guid>
          <pubDate>${new Date(article.frontmatter.date).toUTCString()}</pubDate>
          <description><![CDATA[${article.frontmatter.description}]]></description>
          ${article.frontmatter.category ? `<category>${article.frontmatter.category}</category>` : ''}
          <author>${article.frontmatter.author || siteConfig.author.name}</author>
        </item>`;
        })
        .join('')}
    </channel>
  </rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

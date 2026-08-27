import { MetadataRoute } from 'next';
import { getAllArticles, getAllCategories, getAllTags } from '@/lib/content';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  const articleUrls = articles.map((article) => ({
    url: `\${siteConfig.url}/articles/\${article.slug}`,
    lastModified: new Date(article.frontmatter.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `\${siteConfig.url}/categories/\${category.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));


  const tagUrls = tags.map((tag) => ({
    url: `${siteConfig.url}/tags/${tag.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const staticUrls = [

    {
      url: `${siteConfig.url}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `\${siteConfig.url}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `\${siteConfig.url}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `\${siteConfig.url}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...articleUrls, ...categoryUrls, ...tagUrls];
}

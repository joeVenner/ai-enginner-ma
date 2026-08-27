import { siteConfig } from '@/config/site';

interface WebSiteSchemaProps {
  url?: string;
  name?: string;
  description?: string;
}

export function WebSiteSchema({
  url = siteConfig.url,
  name = siteConfig.name,
  description = siteConfig.description,
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.links.twitter,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  article: {
    title: string;
    description: string;
    date: string;
    author?: string;
    slug: string;
    image?: string;
  };
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const url = `${siteConfig.url}/articles/${article.slug}`;
  const defaultImageUrl = `${siteConfig.url}/articles/${article.slug}/opengraph-image`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? [`${siteConfig.url}${article.image}`] : [defaultImageUrl],
    datePublished: article.date,
    dateModified: article.date,
    author: [
      {
        '@type': 'Person',
        name: article.author || siteConfig.author.name,
        url: siteConfig.links.twitter,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
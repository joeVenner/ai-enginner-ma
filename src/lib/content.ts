import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  draft?: boolean;
  series?: string;
  seriesOrder?: number;
  readingTimeOverride?: number;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string; // Original markdown
  readingTime: number;
}

// Directory where articles are stored
const contentDirectory = path.join(process.cwd(), 'content/articles');

// Calculate estimated reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

// Ensure the directory exists
function ensureDirectoryExists() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

// Default sensible fallback values
const DEFAULT_AUTHOR = 'Editor';
const DEFAULT_DATE = new Date().toISOString().split('T')[0];

/**
 * Validates and provides defaults for frontmatter
 */
function validateFrontmatter(data: Record<string, unknown>, slug: string): ArticleFrontmatter {
  // Extract or default values
  return {
    title: (data.title as string) || `Untitled Article (${slug})`,
    description: (data.description as string) || 'No description provided.',
    date: (data.date as string) || DEFAULT_DATE,
    author: (data.author as string) || DEFAULT_AUTHOR,
    category: (data.category as string) || 'Uncategorized',
    tags: Array.isArray(data.tags) ? data.tags as string[] : [],
    image: (data.image as string) || undefined,
    featured: !!data.featured,
    draft: !!data.draft,
    series: (data.series as string) || undefined,
    seriesOrder: typeof data.seriesOrder === 'number' ? data.seriesOrder : undefined,
    readingTimeOverride: typeof data.readingTimeOverride === 'number' ? data.readingTimeOverride : undefined,
  };
}

/**
 * Gets a single article by its slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    ensureDirectoryExists();

    // We allow finding files with or without .md extension in the slug
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    const frontmatter = validateFrontmatter(data, realSlug);

    // Remove leading H1 if it exists at the start of the file to prevent title duplication
    const cleanContent = content.replace(/^\s*#\s+[^\n]+\n+/, '');

    const article: Article = {
      slug: realSlug,
      frontmatter,
      content: cleanContent,
      readingTime: frontmatter.readingTimeOverride || calculateReadingTime(cleanContent),
    };

    return article;
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Gets all published articles, sorted by date (newest first)
 */
export async function getAllArticles(): Promise<Article[]> {
  ensureDirectoryExists();

  try {
    const fileNames = fs.readdirSync(contentDirectory);

    const articlesPromise = fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const article = await getArticleBySlug(slug);
        return article;
      });

    const articles = (await Promise.all(articlesPromise))
      .filter((article): article is Article => article !== null)
      .filter((article) => process.env.NODE_ENV === 'development' || !article.frontmatter.draft);

    // Sort articles by date
    return articles.sort((a, b) => {
      if (a.frontmatter.date < b.frontmatter.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error reading all articles:', error);
    return [];
  }
}

/**
 * Get all unique categories across all articles
 */
export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const categories = new Set<string>();

  articles.forEach((article) => {
    if (article.frontmatter.category) {
      categories.add(article.frontmatter.category);
    }
  });

  return Array.from(categories).sort();
}

/**
 * Get all unique tags across all articles
 */
export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles();
  const tags = new Set<string>();

  articles.forEach((article) => {
    if (article.frontmatter.tags) {
      article.frontmatter.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

/**
 * Get adjacent articles (previous/next) for navigation
 */
export async function getAdjacentArticles(currentSlug: string): Promise<{
  prev: Article | null;
  next: Article | null;
}> {
  const articles = await getAllArticles();
  const currentIndex = articles.findIndex(article => article.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    // Array is sorted newest first, so "next" (newer) is previous index
    // and "prev" (older) is next index
    next: currentIndex > 0 ? articles[currentIndex - 1] : null,
    prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  };
}

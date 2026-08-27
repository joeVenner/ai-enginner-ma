import { getAllArticles } from '@/lib/content';
import { authors } from '@/config/authors';
import { notFound } from 'next/navigation';
import { ArticleList } from '@/components/article-list';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon } from '@/components/icons';
import Link from 'next/link';

export async function generateStaticParams() {
  return Object.keys(authors).map((authorName) => ({
    slug: encodeURIComponent(authorName.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  
  // Find author (case-insensitive)
  const authorKey = Object.keys(authors).find(
    (key) => key.toLowerCase() === decodedSlug
  );

  if (!authorKey) return {};
  
  const author = authors[authorKey];

  return {
    title: `${author.name} - Author Profile`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  
  const authorKey = Object.keys(authors).find(
    (key) => key.toLowerCase() === decodedSlug
  );

  if (!authorKey) {
    notFound();
  }

  const author = authors[authorKey];
  const allArticles = await getAllArticles();
  
  const authorArticles = allArticles.filter(
    (article) => article.frontmatter.author === authorKey
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/articles"
        className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to articles
      </Link>

      <div className="mb-12 flex flex-col items-center md:flex-row md:items-start gap-8 border-b pb-12">
        <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-background shadow-lg">
          <Image
            src={author.avatar || '/images/default-avatar.png'}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{author.name}</h1>
          
          <div className="mb-6 flex justify-center md:justify-start gap-4 text-muted-foreground">
            {author.twitter && (
              <a href={author.twitter} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {author.github && (
              <a href={author.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {author.linkedin && (
              <a href={author.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
          </div>
          
          <p className="max-w-2xl text-lg text-muted-foreground">
            {author.bio}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          Articles by {author.name} ({authorArticles.length})
        </h2>
        
        {authorArticles.length > 0 ? (
          <ArticleList initialArticles={authorArticles} />
        ) : (
          <p className="text-muted-foreground">No articles published yet.</p>
        )}
      </div>
    </div>
  );
}

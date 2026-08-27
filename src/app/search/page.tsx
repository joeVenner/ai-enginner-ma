import { getAllArticles } from '@/lib/content';
import { SearchClient } from './search-client';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search across all published articles.',
};

export default async function SearchPage() {
  const articles = await getAllArticles();

  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 animate-pulse">
        <div className="h-10 w-48 bg-muted rounded mb-12"></div>
        <div className="h-16 w-full bg-muted rounded-xl mb-12"></div>
        <div className="h-64 w-full bg-muted/50 rounded-xl"></div>
      </div>
    }>
      <SearchClient initialArticles={articles} />
    </Suspense>
  );
}

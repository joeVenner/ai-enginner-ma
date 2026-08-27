import { getAllArticles } from '@/lib/content';
import { SearchClient } from './search-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search across all published articles.',
};

export default async function SearchPage() {
  const articles = await getAllArticles();

  return <SearchClient initialArticles={articles} />;
}

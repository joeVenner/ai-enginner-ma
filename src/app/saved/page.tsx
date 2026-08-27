import { getAllArticles } from '@/lib/content';
import { SavedArticlesClient } from './saved-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Articles',
  description: 'View your bookmarked articles.',
};

export default async function SavedPage() {
  // We need to fetch all articles server-side so we can pass them to the client component
  // to filter based on local storage IDs
  const allArticles = await getAllArticles();

  return <SavedArticlesClient allArticles={allArticles} />;
}

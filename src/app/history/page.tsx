import { getAllArticles } from '@/lib/content';
import { HistoryClient } from './history-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reading History',
  description: 'View your recently read articles.',
};

export default async function HistoryPage() {
  const allArticles = await getAllArticles();
  return <HistoryClient allArticles={allArticles} />;
}

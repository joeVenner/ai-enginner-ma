import { Metadata } from 'next';
import { AnalyticsDashboard } from './analytics-dashboard';

export const metadata: Metadata = {
  title: 'Reader Analytics',
  description: 'View your personal reading analytics and statistics.',
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
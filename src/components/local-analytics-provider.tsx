'use client';

import { useLocalAnalytics } from '@/hooks/use-local-analytics';
import { Suspense } from 'react';

function LocalAnalyticsInner() {
  useLocalAnalytics();
  return null;
}

export function LocalAnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <LocalAnalyticsInner />
    </Suspense>
  );
}
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && process.env.NODE_ENV === 'production') {
      // Basic page view performance timing log
      if (window.performance && window.performance.getEntriesByType) {
         setTimeout(() => {
           const navEntries = window.performance.getEntriesByType('navigation');
           if (navEntries.length > 0) {
             const navEntry = navEntries[0] as PerformanceNavigationTiming;
             console.debug(`[Perf] Page Load: ${navEntry.loadEventEnd - navEntry.startTime}ms | DOM Interactive: ${navEntry.domInteractive - navEntry.startTime}ms | Path: ${pathname}`);
           }
         }, 1000);
      }
    }
  }, [pathname, searchParams]);

  return <VercelAnalytics />;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}

'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This is a placeholder for a real analytics service (e.g., Plausible, Vercel Analytics, GA)
    // We're adding it as a feature foundation for when the user wants to plug in real analytics
    if (pathname) {
      // url variable isn't used right now, keeping for future implementation
      // const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Simulate tracking page view
      // console.log(`[Analytics] Page viewed: ${url}`);
      
      // Keep track of visited paths in local storage just for a fun internal metric
      try {
        const statsStr = localStorage.getItem('site-stats');
        const stats = statsStr ? JSON.parse(statsStr) : { totalViews: 0, uniquePaths: [] };
        
        stats.totalViews += 1;
        if (!stats.uniquePaths.includes(pathname)) {
          stats.uniquePaths.push(pathname);
        }
        
        localStorage.setItem('site-stats', JSON.stringify(stats));
      } catch {
        // Ignore local storage errors
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner />
    </Suspense>
  );
}

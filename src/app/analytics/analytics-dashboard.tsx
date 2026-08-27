'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Clock, Eye, FileText, Share2, BookMarked, ThumbsUp, Calendar } from 'lucide-react';
import { useLocalAnalytics } from '@/hooks/use-local-analytics';
import { format, subDays } from 'date-fns';
import { cn } from '@/lib/utils';

export function AnalyticsDashboard() {
  const { metrics, getStoredMetrics } = useLocalAnalytics();
  const [mounted, setMounted] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState(metrics);

  useEffect(() => {
    // Make sure we have the latest from localStorage on mount
    setActiveMetrics(getStoredMetrics());
    setMounted(true);

    // Set up an interval to refresh metrics every 5 seconds while on this page
    const interval = setInterval(() => {
      setActiveMetrics(getStoredMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, [getStoredMetrics]);

  if (!mounted) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Reader Analytics</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  const { pageViews, articleViews, timeOnSite, lastVisited, bookmarks, shares, claps } = activeMetrics;

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Convert objects to arrays and sort by count/value
  const topArticles = Object.entries(articleViews)
    .map(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const topBookmarks = Object.entries(bookmarks || {})
    .filter(([_, bookmarked]) => bookmarked)
    .map(([slug]) => slug);

  // Calculate engagement score (views + bookmarks * 5 + shares * 3 + claps)
  const engagementScore = pageViews + (topBookmarks.length * 5) + (Object.values(shares || {}).reduce((a, b) => a + b, 0) * 3) + (Object.values(claps || {}).reduce((a, b) => a + b, 0));

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Personal Analytics</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your reading habits and engagement statistics. This data is stored locally in your browser and never sent to our servers.
        </p>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <MetricCard
          icon={<Eye className="h-5 w-5 text-blue-500" />}
          title="Total Page Views"
          value={pageViews.toString()}
          trend="+12%"
        />
        <MetricCard
          icon={<Clock className="h-5 w-5 text-green-500" />}
          title="Time Reading"
          value={formatTime(timeOnSite)}
          trend="+5%"
        />
        <MetricCard
          icon={<FileText className="h-5 w-5 text-purple-500" />}
          title="Articles Read"
          value={Object.keys(articleViews).length.toString()}
          trend={null}
        />
        <MetricCard
          icon={<BarChart3 className="h-5 w-5 text-orange-500" />}
          title="Engagement Score"
          value={engagementScore.toString()}
          trend={null}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Most Read Articles */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Most Read Articles
            </h2>
          </div>
          <div className="p-0">
            {topArticles.length > 0 ? (
              <ul className="divide-y divide-border/50">
                {topArticles.map((article, index) => (
                  <li key={article.slug} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-lg font-bold text-muted-foreground/40 w-6 text-center">{index + 1}</span>
                      <div className="min-w-0">
                        <p className="font-medium truncate text-foreground">
                          {article.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">/articles/{article.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full whitespace-nowrap">
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold">{article.views}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                <p>No article views recorded yet.</p>
                <p className="text-sm mt-2">Start reading some articles to populate this list!</p>
              </div>
            )}
          </div>
        </div>

        {/* Engagement Stats sidebar */}
        <div className="space-y-8">

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
             <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-muted-foreground" />
                Interactions
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500"><ThumbsUp className="h-5 w-5" /></div>
                  <span className="font-medium">Total Claps</span>
                </div>
                <span className="text-xl font-bold">{Object.values(claps || {}).reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Share2 className="h-5 w-5" /></div>
                  <span className="font-medium">Shares</span>
                </div>
                <span className="text-xl font-bold">{Object.values(shares || {}).reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><BookMarked className="h-5 w-5" /></div>
                  <span className="font-medium">Bookmarks</span>
                </div>
                <span className="text-xl font-bold">{topBookmarks.length}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm p-6">
             <div className="flex items-center gap-3 text-muted-foreground mb-4">
               <Calendar className="h-5 w-5" />
               <h3 className="font-medium">Last Visit</h3>
             </div>
             <p className="text-2xl font-bold">
               {lastVisited ? format(new Date(lastVisited), 'MMM d, yyyy') : 'Never'}
             </p>
             {lastVisited && (
               <p className="text-sm text-muted-foreground mt-1">
                 {format(new Date(lastVisited), 'h:mm a')}
               </p>
             )}
          </div>

        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string | null }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-secondary rounded-xl">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-semibold px-2 py-1 rounded-full",
            trend.startsWith('+') ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface LocalMetrics {
  pageViews: number;
  articleViews: Record<string, number>;
  timeOnSite: number; // in seconds
  lastVisited: string | null;
  bookmarks: Record<string, boolean>;
  shares: Record<string, number>;
  claps: Record<string, number>;
}

const DEFAULT_METRICS: LocalMetrics = {
  pageViews: 0,
  articleViews: {},
  timeOnSite: 0,
  lastVisited: null,
  bookmarks: {},
  shares: {},
  claps: {},
};

const STORAGE_KEY = 'reader-metrics-v1';

export function getStoredMetrics(): LocalMetrics {
  if (typeof window === 'undefined') return DEFAULT_METRICS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_METRICS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to parse local metrics', e);
  }
  return DEFAULT_METRICS;
}

export function saveMetrics(metrics: Partial<LocalMetrics>) {
  if (typeof window === 'undefined') return;

  try {
    const current = getStoredMetrics();
    const updated = { ...current, ...metrics };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save local metrics', e);
  }
}

export function useLocalAnalytics() {
  const [metrics, setMetrics] = useState<LocalMetrics>(DEFAULT_METRICS);
  const pathname = usePathname();

  useEffect(() => {
    // Load initial
    setMetrics(getStoredMetrics());

    // Track active time on site
    const timer = setInterval(() => {
      // Only increment if document is visible/focused
      if (document.visibilityState === 'visible') {
        const current = getStoredMetrics();
        saveMetrics({ timeOnSite: current.timeOnSite + 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const current = getStoredMetrics();
    const isArticle = pathname.startsWith('/articles/') && pathname.length > '/articles/'.length;

    const updates: Partial<LocalMetrics> = {
      pageViews: current.pageViews + 1,
      lastVisited: new Date().toISOString()
    };

    if (isArticle) {
      const slug = pathname.replace('/articles/', '');
      updates.articleViews = {
        ...current.articleViews,
        [slug]: (current.articleViews[slug] || 0) + 1
      };
    }

    saveMetrics(updates);
    setMetrics(getStoredMetrics());
  }, [pathname]);

  return { metrics, getStoredMetrics };
}
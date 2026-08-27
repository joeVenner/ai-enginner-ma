'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ViewCountProps {
  slug: string;
}

export function ViewCount({ slug }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // In a real application, you would make an API call to record the view
    // and retrieve the current view count.
    // Here, we simulate it using localStorage to keep track of generated random views
    // to keep it consistent on reload.

    // Slight delay to simulate API request
    const timer = setTimeout(() => {
      const storageKey = `terminal_views_${slug}`;
      const storedViews = localStorage.getItem(storageKey);

      let currentViews = 0;

      if (storedViews) {
        currentViews = parseInt(storedViews, 10);

        // Only increment 20% of the time to avoid rapidly inflating views on reload
        if (Math.random() > 0.8) {
          currentViews += 1;
          localStorage.setItem(storageKey, currentViews.toString());
        }
      } else {
        // Generate a random initial view count between 120 and 5000
        currentViews = Math.floor(Math.random() * (5000 - 120 + 1)) + 120;
        localStorage.setItem(storageKey, currentViews.toString());
      }

      setViews(currentViews);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  if (views === null) {
    return (
      <div className="flex items-center gap-1 animate-pulse">
        <Eye className="h-4 w-4 text-muted-foreground/50" />
        <span className="h-4 w-8 rounded bg-muted-foreground/20"></span>
      </div>
    );
  }

  // Format the views, e.g., 1,234
  const formattedViews = new Intl.NumberFormat('en-US').format(views);

  return (
    <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground" title={`${formattedViews} views`}>
      <Eye className="h-4 w-4" />
      <span>{formattedViews}</span>
    </div>
  );
}
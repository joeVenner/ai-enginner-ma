'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

interface BookmarkButtonProps {
  slug: string;
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage for bookmark status
    const saved = localStorage.getItem('aiengineer_bookmarks');
    if (saved) {
      try {
        const bookmarks = JSON.parse(saved);
        setIsBookmarked(bookmarks.includes(slug));
      } catch (e) {
        console.error('Error parsing bookmarks', e);
      }
    }
  }, [slug]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if this is inside a link wrapper

    try {
      const saved = localStorage.getItem('aiengineer_bookmarks');
      let bookmarks: string[] = saved ? JSON.parse(saved) : [];

      const newBookmarkedState = !isBookmarked;

      if (isBookmarked) {
        // Remove bookmark
        bookmarks = bookmarks.filter(b => b !== slug);
      } else {
        // Add bookmark
        if (!bookmarks.includes(slug)) {
          bookmarks.push(slug);
        }
      }

      localStorage.setItem('aiengineer_bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(newBookmarkedState);

      // Update local analytics
      const metricsStr = localStorage.getItem('reader-metrics-v1');
      if (metricsStr) {
         const metrics = JSON.parse(metricsStr);
         if (!metrics.bookmarks) metrics.bookmarks = {};
         metrics.bookmarks[slug] = newBookmarkedState;
         localStorage.setItem('reader-metrics-v1', JSON.stringify(metrics));
      } else {
         localStorage.setItem('reader-metrics-v1', JSON.stringify({
           pageViews: 0,
           articleViews: {},
           timeOnSite: 0,
           lastVisited: null,
           shares: {},
           claps: {},
           bookmarks: { [slug]: newBookmarkedState }
         }));
      }

      // Dispatch custom event so other components can update
      window.dispatchEvent(new Event('bookmarks-updated'));
    } catch (e) {
      console.error('Error updating bookmark', e);
    }
  };

  if (!mounted) {
    return <div className="h-8 w-8 rounded-full bg-secondary"></div>;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleBookmark}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 fill-primary/20" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? "Remove bookmark" : "Save for later"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

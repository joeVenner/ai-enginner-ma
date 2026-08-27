'use client';

import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  slug: string;
  className?: string;
  showText?: boolean;
}

export function BookmarkButton({ slug, className, showText = false }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, mounted } = useBookmarks();

  if (!mounted) {
    return (
      <button 
        className={cn("flex items-center gap-1.5 text-muted-foreground", className)}
        disabled
      >
        <Bookmark className="h-4 w-4" />
        {showText && <span className="text-sm font-medium">Save</span>}
      </button>
    );
  }

  const bookmarked = isBookmarked(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(slug);
      }}
      className={cn(
        "flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
        bookmarked ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className
      )}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
      title={bookmarked ? "Remove bookmark" : "Bookmark article"}
    >
      <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
      {showText && <span className="text-sm font-medium">{bookmarked ? "Saved" : "Save"}</span>}
    </button>
  );
}

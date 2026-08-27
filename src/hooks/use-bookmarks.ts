import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('terminal_bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    setBookmarks(prev => {
      let newBookmarks;
      if (prev.includes(slug)) {
        newBookmarks = prev.filter(b => b !== slug);
      } else {
        newBookmarks = [...prev, slug];
      }
      
      try {
        localStorage.setItem('terminal_bookmarks', JSON.stringify(newBookmarks));
      } catch (e) {
        console.error('Failed to save bookmarks', e);
      }
      
      return newBookmarks;
    });
  };

  const isBookmarked = (slug: string) => bookmarks.includes(slug);

  return { bookmarks, toggleBookmark, isBookmarked, mounted };
}

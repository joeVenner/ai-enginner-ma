import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // We can safely read from localStorage inside an effect to hydrate state
    let isMounted = true;

    try {
      const stored = localStorage.getItem('aiengineer_bookmarks');
      if (stored && isMounted) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }

    setMounted(true);

    return () => {
      isMounted = false;
    };
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
        localStorage.setItem('aiengineer_bookmarks', JSON.stringify(newBookmarks));
      } catch (e) {
        console.error('Failed to save bookmarks', e);
      }
      
      return newBookmarks;
    });
  };

  const isBookmarked = (slug: string) => bookmarks.includes(slug);

  return { bookmarks, toggleBookmark, isBookmarked, mounted };
}

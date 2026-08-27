import { useState, useEffect } from 'react';

const HISTORY_STORAGE_KEY = 'aiengineer_reading_history';
const MAX_HISTORY_ITEMS = 10;

export function useReadingHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse reading history', e);
    }
  }, []);

  const addToHistory = (slug: string) => {
    try {
      setHistory((prev) => {
        // Remove if it already exists to move it to the front
        const filtered = prev.filter((item) => item !== slug);
        const newHistory = [slug, ...filtered].slice(0, MAX_HISTORY_ITEMS);
        
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (e) {
      console.error('Failed to save reading history', e);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHistory([]);
    } catch (e) {
      console.error('Failed to clear reading history', e);
    }
  };

  return { history, addToHistory, clearHistory, mounted };
}

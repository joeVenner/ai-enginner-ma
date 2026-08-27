'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Layout, Sun, Moon, Laptop, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SearchResult {
  title: string;
  slug: string;
  description: string;
  date: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Toggle palette with cmd+k or ctrl+k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    
    // Listen for custom event
    const handleCustomEvent = () => setOpen(true);
    window.addEventListener('open-command-palette', handleCustomEvent);
    
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-palette', handleCustomEvent);
    };
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results.slice(0, 5)); // Limit to 5 results
          setSelectedIndex(0);
        }
      } catch (error) {
        console.error('Search failed', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  // Handle keyboard navigation inside the modal
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Calculate total clickable items based on view state
      const totalItems = query === '' ? 7 : results.length; // 7 static links when no query

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % totalItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (query !== '' && results.length > 0) {
          runCommand(() => router.push(`/articles/${results[selectedIndex].slug}`));
        } else if (query === '') {
          // Static routing mapping based on index
          const staticRoutes = [
            () => router.push('/'),
            () => router.push('/articles'),
            () => router.push('/newsletter'),
            () => router.push('/history'),
            () => setTheme('light'),
            () => setTheme('dark'),
            () => setTheme('system')
          ];
          runCommand(staticRoutes[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, query, results, selectedIndex, router, setTheme, runCommand]);

  if (!open) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-all"
        onClick={() => setOpen(false)}
      />
      <div className="fixed left-[50%] top-[20%] z-[101] w-full max-w-lg translate-x-[-50%] overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-muted-foreground" />
          <input
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
            placeholder="Search articles, commands, or change theme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {loading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          
          {!loading && query !== '' && results.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Articles
              </div>
              {results.map((result, index) => (
                <button
                  key={result.slug}
                  className={`group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary/20 text-primary border-transparent'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => router.push(`/articles/${result.slug}`))}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <FileText className={`h-4 w-4 shrink-0 ${index === selectedIndex ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <span className="truncate font-medium">{result.title}</span>
                    <span className="truncate text-xs text-muted-foreground/70">{result.description}</span>
                  </div>
                  <ArrowRight className={`h-4 w-4 shrink-0 transition-opacity ${index === selectedIndex ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          )}

          {query === '' && (
            <>
              <div className="mb-4">
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Navigation
                </div>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 0
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => router.push('/'))}
                  onMouseEnter={() => setSelectedIndex(0)}
                >
                  <Layout className={`h-4 w-4 shrink-0 ${selectedIndex === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">Home</span>
                </button>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 1
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => router.push('/articles'))}
                  onMouseEnter={() => setSelectedIndex(1)}
                >
                  <FileText className={`h-4 w-4 shrink-0 ${selectedIndex === 1 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">Articles</span>
                </button>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 2
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => router.push('/newsletter'))}
                  onMouseEnter={() => setSelectedIndex(2)}
                >
                  <FileText className={`h-4 w-4 shrink-0 ${selectedIndex === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">Newsletter</span>
                </button>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 3
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => router.push('/history'))}
                  onMouseEnter={() => setSelectedIndex(3)}
                >
                  <FileText className={`h-4 w-4 shrink-0 ${selectedIndex === 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">Reading History</span>
                </button>
              </div>

              <div>
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Theme
                </div>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 4
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => setTheme('light'))}
                  onMouseEnter={() => setSelectedIndex(4)}
                >
                  <Sun className={`h-4 w-4 shrink-0 ${selectedIndex === 4 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">Light Theme</span>
                </button>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 5
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => setTheme('dark'))}
                  onMouseEnter={() => setSelectedIndex(5)}
                >
                  <Moon className={`h-4 w-4 shrink-0 ${selectedIndex === 5 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">Dark Theme</span>
                </button>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                    selectedIndex === 6
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-secondary hover:text-secondary-foreground text-foreground'
                  }`}
                  onClick={() => runCommand(() => setTheme('system'))}
                  onMouseEnter={() => setSelectedIndex(6)}
                >
                  <Laptop className={`h-4 w-4 shrink-0 ${selectedIndex === 6 ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="flex-1 font-medium">System Theme</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

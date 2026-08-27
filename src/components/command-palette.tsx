'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, Folder, Tag, Moon, Sun, BookMarked, Monitor, History, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';

interface ArticleSearchItem {
  slug: string;
  title: string;
  description: string;
  category?: string;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [articles, setArticles] = React.useState<ArticleSearchItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  // Fetch articles once when opened for the first time
  React.useEffect(() => {
    if (open && articles.length === 0 && !loading) {
      setLoading(true);
      fetch('/api/search')
        .then(res => res.json())
        .then(data => {
          setArticles(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch articles for command palette", err);
          setLoading(false);
        });
    }
  }, [open, articles.length, loading]);

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Listen for custom event to open the command palette
  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    []
  );

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-background/80 backdrop-blur-sm p-4"
      >
        <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          <Command.Input
            placeholder="Type a command or search articles..."
            value={query}
            onValueChange={setQuery}
            className="flex h-14 w-full border-b border-border bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              {loading ? 'Loading...' : 'No results found.'}
            </Command.Empty>

            {/* If there's a query and we have articles, show article results at the top */}
            {query.length > 0 && articles.length > 0 && (
              <Command.Group heading="Articles" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {articles.map((article) => (
                  <Command.Item
                    key={article.slug}
                    value={article.title + ' ' + (article.description || '')}
                    onSelect={() => runCommand(() => router.push(`/articles/${article.slug}`))}
                    className="flex cursor-pointer flex-col items-start justify-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    <div className="flex w-full items-center">
                      <FileText className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="font-medium truncate">{article.title}</span>
                      {article.category && (
                        <span className="ml-auto ml-2 shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                          {article.category}
                        </span>
                      )}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/search'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Advanced Search...
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/saved'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <BookMarked className="mr-2 h-4 w-4" />
                Saved Articles
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/history'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <History className="mr-2 h-4 w-4" />
                Reading History
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/tags'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <Tag className="mr-2 h-4 w-4" />
                Browse Tags
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Categories" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              {siteConfig.categories.map((category) => (
                <Command.Item
                  key={category}
                  onSelect={() => runCommand(() => router.push(`/categories/${category.toLowerCase()}`))}
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <Folder className="mr-2 h-4 w-4" />
                  {category}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Theme" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                onSelect={() => runCommand(() => setTheme('light'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
                {theme === 'light' && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme('dark'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
                {theme === 'dark' && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme('system'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
                {theme === 'system' && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
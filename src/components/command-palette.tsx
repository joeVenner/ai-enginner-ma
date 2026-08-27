'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, Folder, Tag, Moon, Sun, BookMarked, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

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
            placeholder="Type a command or search..."
            className="flex h-14 w-full border-b border-border bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/search'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Articles...
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/saved'))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <BookMarked className="mr-2 h-4 w-4" />
                Saved Articles
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
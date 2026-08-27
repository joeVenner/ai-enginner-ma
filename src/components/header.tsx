import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/articles"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Articles
            </Link>
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href="/tags"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tags
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href="/search"
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Search
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

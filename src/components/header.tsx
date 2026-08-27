'use client';
import Link from 'next/link';
import { Terminal, Rss, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { siteConfig } from '@/config/site';
import { GithubIcon } from './icons';
import { useState, useRef, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm' 
        : 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex gap-6 md:gap-8 items-center">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <span className="inline-block font-bold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          
          <nav className="hidden gap-6 md:flex items-center">
            <Link
              href="/articles"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Articles
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-48 rounded-md border border-border/50 bg-popover shadow-md outline-none animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
                  <div className="py-1">
                    {siteConfig.categories.map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${category.toLowerCase()}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tags"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tags
            </Link>

            <Link
              href="/saved"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
            >
              Saved
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 flex-shrink-0">
          <nav className="flex items-center space-x-1">
            <Link
              href="/search"
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Search <kbd className="ml-2 hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:inline-block">⌘K</kbd>
            </Link>
            
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="/rss.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Rss className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">RSS Feed</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>RSS Feed</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">GitHub Repository</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>GitHub Repository</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Rss, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { siteConfig } from '@/config/site';
import { GithubIcon } from './icons';
import { useState, useRef, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/tooltip';
import { MobileNav } from '@/components/mobile-nav';
import { HighContrastToggle } from '@/components/high-contrast-toggle';
import { TextSizeAdjust } from '@/components/text-size-adjust';
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        Skip to main content
      </a>

      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex gap-4 md:gap-8 items-center">
          {/* Mobile Navigation */}
          <MobileNav />

          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <span className="hidden sm:inline-block font-bold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          
          <nav className="hidden gap-6 md:flex items-center">
            <Link
              href="/articles"
              className={`text-sm font-medium transition-colors hover:text-foreground ${pathname?.startsWith('/articles') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Articles
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground focus:outline-none ${pathname?.startsWith('/categories') ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-48 rounded-md border border-border/50 bg-popover shadow-md outline-none animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {siteConfig.categories.map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${category.toLowerCase()}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm hover:bg-muted hover:text-foreground transition-colors ${pathname === `/categories/${category.toLowerCase()}` ? 'bg-muted/50 text-primary font-medium' : 'text-popover-foreground'}`}
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
              className={`text-sm font-medium transition-colors hover:text-foreground ${pathname?.startsWith('/tags') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Tags
            </Link>

            <Link
              href="/saved"
              className={`text-sm font-medium transition-colors hover:text-foreground flex items-center gap-1 ${pathname === '/saved' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Saved
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2 flex-shrink-0">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Search"
            >
              <span className="hidden sm:inline-block">Search</span>
              <span className="sm:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <kbd className="ml-2 hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:inline-block">⌘K</kbd>
            </button>

            <div className="hidden lg:flex items-center space-x-1">
              <KeyboardShortcuts />
            </div>

            <TooltipProvider delayDuration={100}>
              <div className="hidden sm:flex items-center space-x-1">
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
              </div>
            </TooltipProvider>
            
            <ThemeToggle />
            <TextSizeAdjust />
            <HighContrastToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent focus:outline-none"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background p-4 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold tracking-tight text-lg">
                {siteConfig.name}
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 px-2">
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </h4>
              <Link 
                href="/articles" 
                className={`text-lg font-medium transition-colors ${pathname === '/articles' ? 'text-primary' : 'text-foreground'}`}
              >
                All Articles
              </Link>
              <Link 
                href="/tags" 
                className={`text-lg font-medium transition-colors ${pathname === '/tags' ? 'text-primary' : 'text-foreground'}`}
              >
                Tags
              </Link>
              <Link 
                href="/saved" 
                className={`text-lg font-medium transition-colors ${pathname === '/saved' ? 'text-primary' : 'text-foreground'}`}
              >
                Saved Articles
              </Link>
              <Link 
                href="/history" 
                className={`text-lg font-medium transition-colors ${pathname === '/history' ? 'text-primary' : 'text-foreground'}`}
              >
                Reading History
              </Link>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {siteConfig.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${category.toLowerCase()}`}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

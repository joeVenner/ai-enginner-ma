import Link from 'next/link';
import { Terminal, Home, Search, BookOpen } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-16rem)] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="mb-8 rounded-full bg-secondary/50 p-6">
        <Terminal className="h-16 w-16 text-muted-foreground opacity-50" />
      </div>
      
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl text-foreground">
        404
      </h1>
      
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        Page not found
      </h2>
      
      <p className="mb-10 max-w-lg text-lg text-muted-foreground">
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
      </p>

      <div className="grid w-full max-w-md gap-4 sm:grid-cols-2 md:max-w-2xl md:grid-cols-3">
        <Link 
          href="/"
          className="group flex flex-col items-center justify-center gap-2 rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-sm"
        >
          <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Home className="h-5 w-5" />
          </div>
          <span className="font-medium">Home</span>
        </Link>
        
        <Link 
          href="/articles"
          className="group flex flex-col items-center justify-center gap-2 rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-sm"
        >
          <div className="rounded-full bg-secondary p-3 text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-medium">Articles</span>
        </Link>
        
        <Link 
          href="/search"
          className="group flex flex-col items-center justify-center gap-2 rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-sm sm:col-span-2 md:col-span-1"
        >
          <div className="rounded-full bg-secondary p-3 text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Search className="h-5 w-5" />
          </div>
          <span className="font-medium">Search</span>
        </Link>
      </div>
    </div>
  );
}

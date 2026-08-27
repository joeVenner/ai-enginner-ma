'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        We encountered an unexpected error while loading this page. 
        Our team has been notified and is looking into it.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

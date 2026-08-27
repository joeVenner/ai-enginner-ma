'use client';

import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans antialiased flex items-center justify-center`}>
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Critical Application Error</h1>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            We encountered a critical error that prevented the application from loading.
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
      </body>
    </html>
  );
}

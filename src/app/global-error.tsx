'use client'; // Error boundaries must be Client Components

import { Inter, JetBrains_Mono } from 'next/font/google';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground`}>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">A critical error occurred</h1>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            The application crashed completely. We apologize for the inconvenience.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

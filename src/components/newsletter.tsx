'use client';

import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <div className="newsletter-section my-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Join the AI Engineer Newsletter
        </h3>
        <p className="mb-8 max-w-md text-muted-foreground">
          Get weekly deep dives into AI, data engineering, and the future of software development delivered straight to your inbox.
        </p>

        <button
          onClick={() => {
            const event = new CustomEvent('open-newsletter-modal');
            window.dispatchEvent(event);
          }}
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Subscribe Now
        </button>

        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

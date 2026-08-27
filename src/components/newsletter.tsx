'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="my-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Join the Terminal Newsletter
        </h3>
        <p className="mb-8 max-w-md text-muted-foreground">
          Get weekly deep dives into AI, data engineering, and the future of software development delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yassir@example.com"
              disabled={status === 'loading' || status === 'success'}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="inline-flex h-[46px] items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span className="flex items-center">
                <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Subscribed
              </span>
            ) : (
              <span className="flex items-center">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

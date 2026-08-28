'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className={cn("mt-12 overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-b from-card to-secondary/10 px-6 py-12 sm:p-16 text-center shadow-sm relative", className)}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl mix-blend-multiply opacity-50 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl mix-blend-multiply opacity-50 dark:opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        
        <h3 className="mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Join the AI Engineer Newsletter
        </h3>
        
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          Get weekly deep dives into AI, data engineering, and the future of software development delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          {status === 'success' ? (
            <div className="flex animate-in fade-in zoom-in items-center justify-center gap-2 rounded-xl bg-green-500/10 px-4 py-4 text-green-600 dark:text-green-400 border border-green-500/20">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Thanks for subscribing! Check your inbox.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yassir@example.com"
                className="flex-1 rounded-xl border border-input bg-background/50 px-5 py-4 text-base shadow-sm backdrop-blur transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex h-14 items-center justify-center whitespace-nowrap rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">Subscribing...</span>
                ) : (
                  <>
                    Subscribe Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          )}
          <p className="mt-4 text-xs font-medium text-muted-foreground">
            No spam. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Show modal after 10 seconds on first visit or based on some interaction
    // Here we'll just expose it via a window variable for manual triggering if needed
    // or we can auto-trigger it once per session.
    
    // For now, let's auto-show it after 15 seconds if not seen before
    const hasSeenModal = sessionStorage.getItem('aiengineer_newsletter_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('aiengineer_newsletter_seen', 'true');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current && !scriptLoadedRef.current) {
      const scriptId = 'kit-com-newsletter-modal-script';
      
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://joe-118.kit.com/ea44fa08f6/index.js';
        script.async = true;
        script.setAttribute('data-uid', 'ea44fa08f6');
        
        containerRef.current.appendChild(script);
        scriptLoadedRef.current = true;
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Allow triggering from anywhere via custom event
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-newsletter-modal', handleOpenModal);
    return () => window.removeEventListener('open-newsletter-modal', handleOpenModal);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              Join the AI Engineer Newsletter
            </h3>
            <p className="mb-8 text-sm text-muted-foreground">
              Get weekly deep dives into AI, data engineering, and the future of software development straight to your inbox.
            </p>

            {/* Kit.com Script Container */}
            <div className="w-full min-h-[100px] flex justify-center" ref={containerRef}></div>
            
            <p className="mt-4 text-xs text-muted-foreground/70">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

export function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the script has already been added to avoid duplicates
    const scriptId = 'kit-com-newsletter-script';
    
    if (!document.getElementById(scriptId) && containerRef.current) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://joe-118.kit.com/fca3aaa8e7/index.js';
      script.async = true;
      script.setAttribute('data-uid', 'fca3aaa8e7');
      
      containerRef.current.appendChild(script);
    }
  }, []);

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

        {/* Kit.com Script Container */}
        <div className="w-full max-w-md min-h-[60px]" ref={containerRef}></div>

        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

import { Newsletter } from '@/components/newsletter';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Newsletter',
  description: `Subscribe to the ${siteConfig.name} newsletter for weekly deep dives into AI, data, and software engineering.`,
};

export default function NewsletterPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-foreground">
          Join the <span className="text-primary">Insiders</span>
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          Get weekly insights, architectural patterns, and cutting-edge tutorials on AI and Data Engineering delivered straight to your inbox.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Newsletter />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="font-semibold text-lg">100% Free</h3>
            <p className="text-sm text-muted-foreground">High quality engineering content without the paywall.</p>
          </div>
          
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
            </div>
            <h3 className="font-semibold text-lg">Weekly Delivery</h3>
            <p className="text-sm text-muted-foreground">One email per week. No daily spam or promotions.</p>
          </div>
          
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
            </div>
            <h3 className="font-semibold text-lg">Deep Dives</h3>
            <p className="text-sm text-muted-foreground">Technical depth and architectural breakdowns.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

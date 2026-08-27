import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 inline-block font-bold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Navigate</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-foreground transition-colors">All Articles</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-foreground transition-colors">Tags</Link>
              </li>
              <li>
                <Link href="/rss.xml" className="hover:text-foreground transition-colors">RSS Feed</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Social</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Powered by Automated AI Content
          </p>
        </div>
      </div>
    </footer>
  );
}

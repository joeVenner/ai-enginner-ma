'use client';

import Link from 'next/link';
import { ShareButtons } from '@/components/share-buttons';
import { EditOnGithub } from '@/components/edit-on-github';
import { ClapButton } from '@/components/clap-button';
import { BookmarkButton } from '@/components/bookmark-button';
import { PrintButton } from '@/components/print-button';

interface ArticleFooterActionsProps {
  title: string;
  slug: string;
  tags?: string[];
}

export function ArticleFooterActions({ title, slug, tags }: ArticleFooterActionsProps) {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-12 border-t border-border/40 pt-16">
      {/* Centered Large Clap Button */}
      <div className="flex flex-col items-center justify-center">
        <ClapButton slug={slug} className="scale-110" />
      </div>

      <div className="flex flex-col w-full max-w-3xl mx-auto gap-8">
        {/* Tags Row */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                <span className="rounded-full bg-secondary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground hover:bg-secondary/70 hover:text-foreground transition-all duration-300 border border-border/30">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Actions Row: Icons Only */}
        <div className="flex flex-col sm:flex-row items-center justify-center rounded-2xl bg-gradient-to-b from-card to-secondary/10 p-4 sm:p-6 border border-border/50 shadow-sm w-full gap-4 sm:gap-6">
          <BookmarkButton slug={slug} />
          <div className="hidden sm:block w-px h-6 bg-border/50"></div>
          <div className="sm:hidden h-px w-12 bg-border/50"></div>
          
          <ShareButtons title={title} slug={slug} />
          
          <div className="hidden sm:block w-px h-6 bg-border/50"></div>
          <div className="sm:hidden h-px w-12 bg-border/50"></div>
          
          <PrintButton />
          <EditOnGithub slug={slug} />
        </div>
      </div>
    </div>
  );
}

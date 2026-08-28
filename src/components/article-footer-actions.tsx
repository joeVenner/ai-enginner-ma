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

        {/* Actions Row: Bookmark + Share + Edit */}
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-gradient-to-b from-card to-secondary/10 p-5 sm:p-8 border border-border/50 shadow-sm w-full gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Save Article</span>
            <BookmarkButton slug={slug} />
          </div>

          <div className="hidden sm:block w-px h-10 bg-border/50"></div>
          <div className="sm:hidden h-px w-full bg-border/50"></div>

          <div className="flex flex-col sm:flex-row gap-8 items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Share</span>
              <ShareButtons title={title} slug={slug} />
            </div>

            <div className="hidden sm:block w-px h-10 bg-border/50"></div>

            <div className="flex items-center gap-4">
              <PrintButton />
              <EditOnGithub slug={slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

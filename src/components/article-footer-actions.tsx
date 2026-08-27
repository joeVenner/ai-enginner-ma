'use client';

import Link from 'next/link';
import { ShareButtons } from '@/components/share-buttons';
import { EditOnGithub } from '@/components/edit-on-github';
import { ClapButton } from '@/components/clap-button';
import { BookmarkButton } from '@/components/bookmark-button';

interface ArticleFooterActionsProps {
  title: string;
  slug: string;
  tags?: string[];
}

export function ArticleFooterActions({ title, slug, tags }: ArticleFooterActionsProps) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-12 border-t border-border pt-12">
      {/* Centered Large Clap Button */}
      <div className="flex flex-col items-center justify-center">
        <ClapButton slug={slug} />
      </div>

      <div className="flex flex-col w-full gap-8">
        {/* Tags Row */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
            {tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                <span className="rounded-md bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary transition-colors border border-transparent hover:border-border">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Actions Row: Bookmark + Share + Edit */}
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-xl bg-card p-4 sm:p-6 border border-border shadow-sm w-full gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Save for later:</span>
            <BookmarkButton slug={slug} />
          </div>

          <div className="hidden sm:block w-px h-8 bg-border"></div>
          <div className="sm:hidden h-px w-full bg-border"></div>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between w-full sm:w-auto">
            <ShareButtons title={title} slug={slug} />

            <div className="hidden sm:block w-px h-6 bg-border"></div>

            <EditOnGithub slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}

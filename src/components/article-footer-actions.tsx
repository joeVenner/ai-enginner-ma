'use client';

import Link from 'next/link';
import { ArticleFeedback } from '@/components/article-feedback';
import { ShareButtons } from '@/components/share-buttons';
import { EditOnGithub } from '@/components/edit-on-github';
import { ClapButton } from '@/components/clap-button';

interface ArticleFooterActionsProps {
  title: string;
  slug: string;
  tags?: string[];
}

export function ArticleFooterActions({ title, slug, tags }: ArticleFooterActionsProps) {
  return (
    <div className="mt-12 flex flex-col gap-8 border-t border-border pt-8">
      {/* Tags Row */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
              <span className="rounded-md bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary transition-colors">
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Actions Row: Claps + Feedback + Share + Edit */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between rounded-xl bg-card p-4 sm:p-6 border border-border shadow-sm">

        <div className="flex items-center gap-4">
          <ClapButton slug={slug} />
          <div className="w-px h-6 bg-border hidden sm:block"></div>
          <ArticleFeedback />
        </div>

        <div className="hidden md:block w-px h-8 bg-border"></div>
        <div className="md:hidden h-px w-full bg-border"></div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between w-full md:w-auto">
          <ShareButtons title={title} slug={slug} />

          <div className="hidden sm:block w-px h-6 bg-border"></div>

          <EditOnGithub slug={slug} />
        </div>
      </div>
    </div>
  );
}

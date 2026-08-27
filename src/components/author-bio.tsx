import Image from 'next/image';
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);
import { authors } from '@/config/authors';

interface AuthorBioProps {
  authorName: string;
}

export function AuthorBio({ authorName }: AuthorBioProps) {
  const author = authors[authorName] || authors['Editor'];

  if (!author) {
    return null;
  }

  return (
    <div className="my-12 flex flex-col items-center gap-6 rounded-2xl bg-muted/50 p-8 text-center sm:flex-row sm:items-start sm:text-left border border-border/50">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-background shadow-sm">
        {/* Using standard img for external avatars without configuring next/image domains */}
        <img
          src={author.avatar}
          alt={author.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight">{author.name}</h3>
          <p className="text-sm font-medium text-muted-foreground">@{author.handle}</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {author.bio}
        </p>
        <div className="flex items-center justify-center gap-4 sm:justify-start">
          {author.twitter && (
            <a
              href={author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">TwitterIcon</span>
            </a>
          )}
          {author.github && (
            <a
              href={author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

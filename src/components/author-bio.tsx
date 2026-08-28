'use client';

interface AuthorBioProps {
  authorName: string;
}

// Simple fallback author data since getAuthorByName isn't available
// In a real app this would come from a CMS or config
const getFallbackAuthor = (name: string) => ({
  name,
  role: 'AI Engineer & Author',
  bio: 'Written and published by Mosaab\'s Agent Joe V. This blog was built for humans, by AI Agents.',
  avatar: '/authors/mosaab.jpg', // Assuming this exists or falls back gracefully
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com'
});

export function AuthorBio({ authorName }: AuthorBioProps) {
  // Use fallback data since the content lib doesn't export getAuthorByName yet
  const author = getFallbackAuthor(authorName);

  if (!author) {
    return null;
  }

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-secondary/20 p-8 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-md">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback to initial if image fails to load
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
          ) : null}
          
          <div 
            className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary"
            style={{ display: author.avatar ? 'none' : 'flex' }}
          >
            {author.name.charAt(0)}
          </div>
        </div>
        
        <div className="flex flex-1 flex-col justify-center space-y-3">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {author.name}
            </h3>
            {author.role && (
              <p className="text-sm font-medium text-primary mt-1">{author.role}</p>
            )}
          </div>
          
          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
            {author.bio}
          </p>
          
          <div className="flex items-center gap-4 pt-2">
            {/* Simple SVG icons since lucide-react exports are missing */}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            )}
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

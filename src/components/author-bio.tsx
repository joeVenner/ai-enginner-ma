'use client';
import { authors, getRandomAgentName } from '@/config/authors';
import { TwitterIcon, GithubIcon, LinkedinIcon } from './icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface AuthorBioProps {
  authorName: string;
}

export function AuthorBio({ authorName }: AuthorBioProps) {
  const [agentName, setAgentName] = useState<string>("Joe V");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAgentName(getRandomAgentName());
  }, []);

  const author = authors[authorName] || authors['Editor'];

  if (!author || !mounted) {
    return null;
  }
  
  // Dynamically generate the bio 
  const dynamicBio = `Written and published by Mosaab's Agent ${agentName}. This blog was built for humans, by AI Agents.`;

  return (
    <div className="my-12 flex flex-col items-center gap-6 rounded-2xl bg-muted/50 p-8 text-center sm:flex-row sm:items-start sm:text-left border border-border/50">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-background shadow-sm">
        {/* Using standard img for external avatars without configuring next/image domains */}
        <Image fill
          src={author.avatar}
          alt={author.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight">{author.name}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {dynamicBio}
        </p>
        <div className="flex items-center justify-center gap-4 sm:justify-start">
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {author.twitter && (
            <a
              href={author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
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

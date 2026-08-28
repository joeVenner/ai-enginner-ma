'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface AuthorHoverCardProps {
  authorName: string;
  children: React.ReactNode;
}

// Fallback author data (same as AuthorBio)
const getFallbackAuthor = (name: string) => ({
  name,
  role: 'AI Engineer & Author',
  bio: 'Written and published by Mosaab\'s Agent Joe V. This blog was built for humans, by AI Agents.',
  avatar: '/authors/mosaab.jpg',
});

export function AuthorHoverCard({ authorName, children }: AuthorHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const author = getFallbackAuthor(authorName);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 300); // 300ms delay before showing
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay before hiding to allow cursor to move to card
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isOpen && (
        <div 
          className="absolute z-50 left-0 top-full mt-2 w-80 overflow-hidden rounded-xl border border-border bg-popover shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="flex h-full w-full items-center justify-center bg-primary/10 text-lg font-bold text-primary"
                  style={{ display: author.avatar ? 'none' : 'flex' }}
                >
                  {author.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/authors/${encodeURIComponent(authorName.toLowerCase())}`}
                  className="text-sm font-bold text-popover-foreground hover:text-primary transition-colors hover:underline block truncate"
                >
                  {author.name}
                </Link>
                <p className="text-xs font-medium text-primary mt-0.5 truncate">
                  {author.role}
                </p>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {author.bio}
            </p>
          </div>
          
          <div className="bg-muted/50 px-4 py-2 border-t border-border flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">Contributor</span>
            <Link 
              href={`/authors/${encodeURIComponent(authorName.toLowerCase())}`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              View Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({ title, description, icon, href, className, children }: CardProps) {
  const CardWrapper = href ? Link : 'div';
  const isExternal = href?.startsWith('http');
  
  return (
    <CardWrapper
      href={href || '#'}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        href && "cursor-pointer hover:border-primary/50",
        className
      )}
    >
      <div className="flex w-full items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          
          {children && (
            <div className="mt-4 text-sm text-muted-foreground prose-sm max-w-none">
              {children}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            {icon}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export function CardGrid({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("my-6 grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {children}
    </div>
  );
}

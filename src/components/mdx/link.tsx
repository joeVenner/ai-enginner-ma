import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import React from 'react';

export function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors group"
    >
      {props.children}
      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

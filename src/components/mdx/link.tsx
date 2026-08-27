import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { ExternalLink } from 'lucide-react';

export function CustomLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // External links
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 group"
      {...props}
    >
      <span>{children}</span>
      <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

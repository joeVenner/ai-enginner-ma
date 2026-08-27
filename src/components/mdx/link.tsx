import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { AnchorHTMLAttributes } from 'react';

export function CustomLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (!href) {
    return <a {...props} />;
  }

  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props} className={`font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all ${props.className || ''}`}>
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={`font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all inline-flex items-center gap-1 ${props.className || ''}`}
    >
      {props.children}
      <ExternalLink className="h-3 w-3 text-muted-foreground inline-block" />
    </a>
  );
}

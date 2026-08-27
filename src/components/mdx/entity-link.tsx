import React from 'react';
import Link from 'next/link';

interface EntityLinkProps {
  href: string;
  children: React.ReactNode;
  sameAs?: string | string[];
}

export function EntityLink({ href, children, sameAs }: EntityLinkProps) {
  // If we have schema markup data, inject it silently alongside the link
  const jsonLd = sameAs ? {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    'name': typeof children === 'string' ? children : 'Technical Entity',
    'url': href,
    'sameAs': Array.isArray(sameAs) ? sameAs : [sameAs]
  } : null;

  return (
    <>
      <Link
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
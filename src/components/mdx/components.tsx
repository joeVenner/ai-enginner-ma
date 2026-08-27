import React from 'react';
import { CodeBlock } from './code-block';
import { ZoomImage } from './zoom-image';
import Link from 'next/link';

interface MDXProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface CalloutProps extends MDXProps {
  type?: 'warning' | 'error' | 'success' | 'info';
}

interface EntityLinkProps extends MDXProps {
  id?: string;
  name?: string;
  type?: string;
}

// Provide fallback components for custom MDX elements found in articles
const Axiom = ({ children, ...props }: MDXProps) => <div className="my-4 p-4 border border-border/50 rounded-lg bg-card" {...props}>{children}</div>;

const Callout = ({ children, type = "info", ...props }: CalloutProps) => {
  const getColors = () => {
    switch(type) {
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-800 dark:text-yellow-200';
      case 'error': return 'bg-red-500/10 border-red-500/50 text-red-800 dark:text-red-200';
      case 'success': return 'bg-green-500/10 border-green-500/50 text-green-800 dark:text-green-200';
      default: return 'bg-blue-500/10 border-blue-500/50 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className={`my-6 p-4 rounded-xl border ${getColors()} flex flex-col gap-2`} {...props}>
      <span className="font-bold uppercase tracking-wider text-xs opacity-80">{type}</span>
      <div className="[&>p]:m-0">{children}</div>
    </div>
  );
};

const EntityLink = ({ id, name, ...props }: EntityLinkProps) => {
  return (
    <Link href={`/tags/${name?.toLowerCase() || id?.toLowerCase()}`} className="inline-flex items-center gap-1 rounded-md bg-secondary/50 px-1.5 py-0.5 text-sm font-medium text-secondary-foreground hover:bg-secondary transition-colors" {...props}>
      <span className="w-2 h-2 rounded-full bg-primary/70"></span>
      {name || id}
    </Link>
  );
};

export const mdxComponents = {
  Axiom,
  Callout,
  EntityLink,

  // Enhanced pre/code blocks with copy/download buttons and syntax highlighting
  pre: ({ children, ...props }: MDXProps) => {
    return <CodeBlock {...props}>{children}</CodeBlock>;
  },

  // Custom image component with medium-style zooming
  img: ({ src, alt, className, ...props }: { src?: string; alt?: string; className?: string } & MDXProps) => {
    return <ZoomImage src={src || ''} alt={alt || ''} className={className} {...props} />;
  },

  // Enhanced headings with IDs for TOC linking
  h1: ({ children, id, ...props }: MDXProps & { id?: string }) => (
    <h1 id={id} className="group flex whitespace-pre-wrap" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }: MDXProps & { id?: string }) => (
    <h2 id={id} className="group flex whitespace-pre-wrap" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: MDXProps & { id?: string }) => (
    <h3 id={id} className="group flex whitespace-pre-wrap" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }: MDXProps & { id?: string }) => (
    <h4 id={id} className="group flex whitespace-pre-wrap" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, id, ...props }: MDXProps & { id?: string }) => (
    <h5 id={id} className="group flex whitespace-pre-wrap" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, id, ...props }: MDXProps & { id?: string }) => (
    <h6 id={id} className="group flex whitespace-pre-wrap" {...props}>
      {children}
    </h6>
  ),

  // Custom link component
  a: ({ href, children, ...props }: MDXProps & { href?: string }) => {
    const isExternal = href?.startsWith('http');

    return (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
        {isExternal && (
          <span className="inline-flex items-center ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
          </span>
        )}
      </a>
    );
  },

  // Beautiful blockquotes
  blockquote: ({ children, ...props }: MDXProps) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground [&>*]:text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Custom tables
  table: ({ children, ...props }: MDXProps) => (
    <div className="my-6 w-full overflow-y-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: MDXProps) => (
    <thead className="bg-muted text-muted-foreground" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: MDXProps) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: MDXProps) => (
    <tr className="transition-colors hover:bg-muted/50" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: MDXProps) => (
    <th className="px-6 py-3 font-semibold uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: MDXProps) => (
    <td className="px-6 py-4" {...props}>
      {children}
    </td>
  ),

  // Lists
  ul: ({ children, ...props }: MDXProps) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXProps) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),

  // Keyboard shortcuts
  kbd: ({ children, ...props }: MDXProps) => (
    <kbd
      className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
      {...props}
    >
      {children}
    </kbd>
  ),
};

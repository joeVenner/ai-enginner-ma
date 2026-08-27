import React from 'react';
import { cn } from '@/lib/utils';

export function Steps({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'my-10 ml-4 border-l-2 border-border/70 pl-8 [counter-reset:step]',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        // Only wrap elements that aren't already wrapped in something specific
        // We'll add the step class to whatever the child is (usually a div or h3)
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<{ className?: string }>;
          const existingClassName = childElement.props.className;

          return React.cloneElement(childElement, {
            className: cn(
              // Apply the step counter styles
              'relative pb-8 [counter-increment:step] before:absolute before:-left-[41px] before:top-1 before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:bg-card before:border-2 before:border-primary/50 before:text-xs before:font-bold before:text-primary before:content-[counter(step)]',
              // Preserve existing classes
              existingClassName
            ),
          });
        }
        return child;
      })}
    </div>
  );
}
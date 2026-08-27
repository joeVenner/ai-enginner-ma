import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ 
  children, 
  variant = 'default',
  className 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}) {
  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20',
    info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20',
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)}>
      {children}
    </span>
  );
}

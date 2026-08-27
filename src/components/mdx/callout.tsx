import { AlertCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  children?: React.ReactNode;
  type?: 'default' | 'warning' | 'error' | 'info';
  title?: string;
}

export function Callout({
  children,
  type = 'default',
  title,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 flex items-start rounded-xl border p-4 shadow-sm',
        {
          'border-border bg-muted/50 text-foreground': type === 'default',
          'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-200': type === 'info',
          'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-950/20 dark:text-yellow-200': type === 'warning',
          'border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-200': type === 'error',
        }
      )}
      {...props}
    >
      <div className="mr-4 mt-0.5 flex-shrink-0">
        {type === 'default' && <Lightbulb className="h-5 w-5" />}
        {type === 'info' && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        {type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
        {type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
      </div>
      <div className="flex-1 w-full min-w-0">
        {title && <h5 className="mb-1 font-semibold leading-none tracking-tight">{title}</h5>}
        <div className="[&>p]:m-0 [&>p]:leading-relaxed text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

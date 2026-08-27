import { Skeleton } from '@/components/loading-skeleton';
import { SearchIcon } from 'lucide-react';

export default function SearchLoading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-12">
        <Skeleton className="mb-6 h-10 w-40" />

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
            <SearchIcon className="h-5 w-5 text-muted-foreground opacity-50" aria-hidden="true" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      </div>

      <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-muted-foreground">
        <Skeleton className="mb-2 h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  );
}

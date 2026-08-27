import { Skeleton } from './loading-skeleton';

export function ArticleCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border bg-card transition-all">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="mb-4 h-8 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-6 h-4 w-5/6" />

          <div className="mb-6 flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>

          <Skeleton className="mt-auto h-5 w-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-between rounded-xl border bg-card p-6 h-[260px]">
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-24" />
          <span className="hidden sm:inline-block text-muted-foreground">•</span>
          <Skeleton className="h-4 w-20 hidden sm:inline-block" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="w-full mb-4 space-y-3">
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-2 w-full border-t border-border/50">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

import { ArticleCardSkeleton } from '@/components/article-card-skeleton';
import { Skeleton } from '@/components/loading-skeleton';

export default function HomeLoading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 overflow-hidden">
      {/* Hero Section Skeleton */}
      <section className="mb-16 md:mb-24 flex flex-col items-start justify-center space-y-6 max-w-3xl pt-8">
        <div className="space-y-2 w-full">
          <Skeleton className="h-12 md:h-16 w-3/4" />
          <Skeleton className="h-12 md:h-16 w-full" />
        </div>
        <div className="space-y-2 w-full pt-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </section>

      {/* Featured Article Skeleton */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
        </div>
        <ArticleCardSkeleton featured={true} />
      </section>

      {/* Latest Articles Skeleton */}
      <section className="mb-16 md:mb-24">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

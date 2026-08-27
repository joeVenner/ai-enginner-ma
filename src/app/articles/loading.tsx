import { ArticleCardSkeleton } from '@/components/article-card-skeleton';
import { Skeleton } from '@/components/loading-skeleton';

export default function ArticlesLoading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 border-b pb-8">
        <Skeleton className="mb-4 h-10 w-48" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16">
        <aside className="mb-8 w-full md:w-72 md:flex-shrink-0">
          <div className="space-y-10">
            <div>
              <Skeleton className="mb-4 h-5 w-24" />
              <div className="flex flex-wrap gap-2 md:flex-col md:gap-3">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-36 rounded-md" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-6 h-6 w-32" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-9 w-40 rounded-md" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

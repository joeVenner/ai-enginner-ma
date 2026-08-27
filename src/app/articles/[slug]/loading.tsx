import { Skeleton } from '@/components/loading-skeleton';
import { ChevronLeft } from 'lucide-react';

export default function ArticleLoading() {
  return (
    <article className="mx-auto min-h-screen max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to articles
      </div>

      <header className="mb-12">
        <Skeleton className="mb-6 h-8 w-24 rounded-full" />
        <Skeleton className="mb-4 h-12 w-full md:h-16 md:w-4/5 lg:h-20 lg:w-3/4" />
        <Skeleton className="mb-8 h-8 w-full md:h-10 md:w-3/4" />

        <div className="flex flex-wrap items-center gap-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>
      </header>

      <div className="mb-12 overflow-hidden rounded-2xl aspect-video md:aspect-[2/1]">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
        <div className="flex-1 min-w-0 space-y-6">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          
          <Skeleton className="h-6 w-full mt-10" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
          
          <div className="mt-8 mb-8 overflow-hidden rounded-xl">
            <Skeleton className="h-64 w-full" />
          </div>
          
          <Skeleton className="h-8 w-1/3 mt-10" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6 ml-4" />
            <Skeleton className="h-4 w-4/5 ml-4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </aside>
      </div>
    </article>
  );
}

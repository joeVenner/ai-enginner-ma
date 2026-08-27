import { Terminal } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50">
        <Terminal className="h-10 w-10 text-primary animate-pulse" />
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
      </div>
      <h2 className="mt-8 text-xl font-medium tracking-tight text-foreground animate-pulse">
        Initializing AI Engineer...
      </h2>
    </div>
  );
}
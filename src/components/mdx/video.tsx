import React from 'react';
import { cn } from '@/lib/utils';

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  caption?: string;
  autoPlay?: boolean;
}

export function Video({ src, caption, className, autoPlay = true, ...props }: VideoProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <video
          src={src}
          className={cn("w-full h-auto", className)}
          controls={!autoPlay}
          autoPlay={autoPlay}
          loop={autoPlay}
          muted={autoPlay}
          playsInline={autoPlay}
          {...props}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

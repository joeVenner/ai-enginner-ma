'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Skeleton } from '../loading-skeleton';

interface YouTubeProps {
  id: string;
  title?: string;
}

export function YouTube({ id, title = 'YouTube video player' }: YouTubeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // High-res thumbnail from YouTube
  const thumbnailUrl = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border bg-muted relative pb-[56.25%] h-0 shadow-sm group cursor-pointer transition-all hover:shadow-md">
      {!isPlaying ? (
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10"
          onClick={() => setIsPlaying(true)}
        >
          {/* We use an image with an error handler to fallback if maxresdefault doesn't exist */}
          {!isLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
          
          <img 
            src={thumbnailUrl} 
            alt={title}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={(e) => {
              // Fallback to lower res if high res is missing (common for older videos)
              const imgElement = e.target as HTMLImageElement;
              if (imgElement.src !== fallbackThumbnailUrl) {
                imgElement.src = fallbackThumbnailUrl;
              }
            }}
          />
          
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          
          <button 
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur transition-transform group-hover:scale-110 group-hover:bg-red-600"
            aria-label="Play video"
          >
            <Play className="h-6 w-6 ml-1 fill-current" />
          </button>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

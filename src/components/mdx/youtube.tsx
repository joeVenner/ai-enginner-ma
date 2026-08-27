interface YouTubeProps {
  id: string;
  title?: string;
}

export function YouTube({ id, title = 'YouTube video player' }: YouTubeProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl bg-muted relative pb-[56.25%] h-0">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

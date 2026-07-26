import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  photo?: Pick<Photo, "src" | "alt" | "width" | "height">;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: "eager" | "lazy";
  className?: string;
  hoverZoom?: boolean;
};

export function SiteImage({
  photo,
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  loading = "lazy",
  className,
  hoverZoom = false,
}: SiteImageProps) {
  const resolvedSrc = photo?.src ?? src;
  const resolvedWidth = photo?.width ?? width;
  const resolvedHeight = photo?.height ?? height;

  if (!resolvedSrc) return null;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={sizes}
      loading={loading}
      decoding="async"
      className={cn(
        "h-full w-full object-cover [image-rendering:auto]",
        hoverZoom && "transition-transform duration-700 group-hover:scale-[1.03] md:group-hover:scale-[1.02]",
        className,
      )}
    />
  );
}

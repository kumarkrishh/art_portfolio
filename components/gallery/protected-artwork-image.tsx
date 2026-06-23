"use client";

type ProtectedArtworkImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProtectedArtworkImage({
  src,
  alt,
  className,
}: ProtectedArtworkImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      className={`protected-artwork-image ${className ?? ""}`.trim()}
    />
  );
}

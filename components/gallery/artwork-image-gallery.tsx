"use client";

import { useState } from "react";
import type { ArtworkDetailImage } from "@/lib/artwork-images";
import { ProtectedArtworkImage } from "./protected-artwork-image";

type ArtworkImageGalleryProps = {
  images: ArtworkDetailImage[];
  title: string;
  isUnavailable: boolean;
};

export function ArtworkImageGallery({
  images,
  title,
  isUnavailable,
}: ArtworkImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];
  const isCanvasOnly = selectedImage.label === "Canvas only";

  return (
    <div className="flex-1 min-w-0 flex flex-col-reverse md:flex-row gap-6 lg:gap-10 w-full justify-center">
      <div
        className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar"
        aria-label={`${title} views`}
      >
        {images.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View ${title} in ${image.label.toLowerCase()}`}
              aria-pressed={isSelected}
              className={`flex-shrink-0 w-20 h-28 relative bg-[#F9F8F6] rounded-sm overflow-hidden border transition-all ${
                isSelected
                  ? "border-zinc-900 ring-1 ring-zinc-900"
                  : "border-zinc-200 hover:border-zinc-500"
              }`}
            >
              <ProtectedArtworkImage
                src={image.thumbnailSrc}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover ${
                  image.label === "Canvas only" ? "p-1.5" : ""
                } ${
                  isUnavailable ? "opacity-85" : ""
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="flex-1 flex justify-center lg:justify-start">
        {isCanvasOnly ? (
          <div className="relative h-[60vh] lg:h-[75vh] max-h-[800px] w-full bg-[#F9F8F6] rounded-sm overflow-hidden p-3 lg:p-8">
            <div className="relative w-full h-full">
              <ProtectedArtworkImage
                src={selectedImage.src}
                alt={`${title} in ${selectedImage.label.toLowerCase()}`}
                className={`absolute inset-0 w-full h-full object-contain drop-shadow-sm ${
                  isUnavailable ? "opacity-85" : ""
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <ProtectedArtworkImage
              src={selectedImage.src}
              alt={`${title} in ${selectedImage.label.toLowerCase()}`}
              className={`block w-auto h-auto max-w-full max-h-[800px] object-contain ${
                isUnavailable ? "opacity-85" : ""
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

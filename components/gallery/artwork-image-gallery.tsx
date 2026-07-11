"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ArtworkDetailImage } from "@/lib/artwork-images";
import { useArtworkSelection } from "./artwork-selection-context";
import { ProtectedArtworkImage } from "./protected-artwork-image";

type ArtworkImageGalleryProps = {
  images: ArtworkDetailImage[];
  title: string;
  isUnavailable: boolean;
  orientation: "landscape" | "portrait" | "square";
};

export function ArtworkImageGallery({
  images,
  title,
  isUnavailable,
  orientation,
}: ArtworkImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setSelectedLabel } = useArtworkSelection();
  const selectedImage = images[selectedIndex] ?? images[0];
  const isCanvasOnly = selectedImage.label === "Canvas only";
  const hasMultipleImages = images.length > 1;

  const selectImage = (index: number) => {
    setSelectedIndex(index);
    setSelectedLabel(images[index]?.label ?? "Canvas only");
  };

  const showPreviousImage = () => {
    selectImage(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const showNextImage = () => {
    selectImage(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <div
      className="flex-1 min-w-0 flex flex-col-reverse md:flex-row gap-6 lg:gap-10 w-full justify-center focus:outline-none"
      tabIndex={0}
      onKeyDown={(event) => {
        if (!hasMultipleImages) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousImage();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNextImage();
        }
      }}
    >
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
              onClick={() => selectImage(index)}
              aria-label={`View ${title} in ${image.label.toLowerCase()}`}
              aria-pressed={isSelected}
              className={`flex-shrink-0 relative bg-[#F9F8F6] rounded-sm overflow-hidden border transition-all ${
                orientation === "landscape"
                  ? "w-28 h-20"
                  : orientation === "square"
                    ? "w-24 h-24"
                    : "w-20 h-28"
              } ${
                isSelected
                  ? "border-zinc-900 ring-1 ring-zinc-900"
                  : "border-zinc-200 hover:border-zinc-500"
              }`}
            >
              <ProtectedArtworkImage
                src={image.thumbnailSrc}
                alt=""
                className={`absolute inset-0 w-full h-full object-contain ${
                  image.label === "Canvas only" ? "p-1.5" : ""
                } ${
                  isUnavailable ? "opacity-85" : ""
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="relative flex-1 flex justify-center lg:justify-start">
        <div
          className={`relative h-[60vh] lg:h-[75vh] max-h-[800px] w-full rounded-sm overflow-hidden ${
            isCanvasOnly ? "bg-[#F9F8F6] p-3 lg:p-8" : ""
          }`}
        >
          <div className="relative w-full h-full">
            <ProtectedArtworkImage
              src={selectedImage.src}
              alt={`${title} in ${selectedImage.label.toLowerCase()}`}
              className={`absolute inset-0 w-full h-full object-contain ${
                isCanvasOnly ? "drop-shadow-sm" : ""
              } ${isUnavailable ? "opacity-85" : ""}`}
            />
          </div>
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label={`View previous image of ${title}`}
              className="absolute left-2 lg:left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/90 p-2.5 text-zinc-800 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              aria-label={`View next image of ${title}`}
              className="absolute right-2 lg:right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/90 p-2.5 text-zinc-800 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ProtectedArtworkImage } from "@/components/gallery/protected-artwork-image";

export type Painting = {
  id: string;
  slug: string;
  title: string;
  collection: string;
  medium: string;
  price: number;
  imageUrl: string;
  dimensions?: string; 
  isSold?: boolean; 
  notForSale?: boolean;
};

function getDynamicPadding(dimensions?: string) {
  if (!dimensions) return "p-5"; 

  const matches = dimensions.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length < 2) return "p-5";

  const width = parseFloat(matches[0]);
  const height = parseFloat(matches[1]);
  const squareInches = width * height;

  if (squareInches <= 150) {
    return "p-8 md:p-10"; 
  }
  if (squareInches > 150 && squareInches < 500) {
    return "p-5 md:p-6";
  }
  return "p-2 md:p-3";
}

export function ArtworkCard({ painting }: { painting: Painting }) {
  const imagePaddingClass = getDynamicPadding(painting.dimensions);
  const isUnavailable = painting.isSold || painting.notForSale;
  const availabilityLabel = painting.notForSale ? "Not for Sale" : painting.isSold ? "Sold" : null;

  return (
    <Link
      href={`/gallery/${painting.slug}`}
      className="group flex flex-col gap-2"
      onClick={() =>
        track("artwork_card_clicked", {
          artworkId: painting.id,
          artworkSlug: painting.slug,
          artworkTitle: painting.title,
          collection: painting.collection,
        })
      }
    >
      <div className="relative aspect-[4/5] w-full bg-[#F9F8F6] rounded-sm overflow-hidden transition-all duration-500 ease-out group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
        
        {/* Top-left badge removed to prevent double "Sold" text */}

        <div className="relative w-full h-full flex items-center justify-center">
          <ProtectedArtworkImage
            src={painting.imageUrl}
            alt={painting.title}
            className={`absolute inset-0 w-full h-full object-contain drop-shadow-sm ${imagePaddingClass} ${isUnavailable ? 'opacity-85' : ''}`}
          />
        </div>
      </div>

      <div className="flex justify-between items-start pt-2 gap-4">
        <div className="flex flex-col">
          <h3 className="font-medium text-zinc-900 text-sm">{painting.title}</h3>
          <p className="text-xs text-zinc-500 mt-1">{painting.collection}</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            {painting.medium} {painting.dimensions && <span className="text-zinc-300 mx-1">|</span>} {painting.dimensions}
          </p>
        </div>
        
        {/* Keeping the elegant price replacement */}
        <p className="text-sm font-semibold text-zinc-900">
          {availabilityLabel ? (
            <span className="text-zinc-400 font-normal italic">{availabilityLabel}</span>
          ) : (
            `$${painting.price}`
          )}
        </p>
      </div>
    </Link>
  );
}

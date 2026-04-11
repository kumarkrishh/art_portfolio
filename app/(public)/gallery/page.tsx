"use client";

import { useState } from "react";
import { ArtworkCard, Painting } from "@/components/gallery/artwork-card";
import { artworks } from "@/lib/data";

export default function GalleryPage() {
  // 1. State to track which size is currently selected (null means "All Sizes")
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // 2. Automatically generate the list of available sizes from your data
  const availableSizes = Array.from(
    new Set(artworks.map((art) => art.dimensions).filter(Boolean))
  ) as string[];

  // 3. Filter the artworks based on the selected size
  const filteredArtworks = artworks.filter((art) => {
    if (selectedSize && art.dimensions !== selectedSize) {
      return false; // Hide if it doesn't match the selected size
    }
    return true; // Show otherwise
  });

  // 4. Map the filtered data to perfectly match what the ArtworkCard component expects
  const formattedArtworks: Painting[] = filteredArtworks.map((art) => ({
    id: art.id,
    slug: art.id, 
    title: art.title,
    collection: art.collection,
    medium: art.medium,
    price: art.price,
    imageUrl: art.image_url, 
    dimensions: art.dimensions, // <-- Added dimensions here!
  }));

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
      
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">All Artwork</h1>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Sidebar - Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="flex items-center justify-between">
              <button className="bg-zinc-900 text-white text-xs px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-colors tracking-wide">
                Hide filters
              </button>
              {/* Shows accurate count from your filtered data */}
              <span className="text-xs text-zinc-500 uppercase tracking-widest">{formattedArtworks.length} Artworks</span>
            </div>

            {/* Size Filter (NEW) */}
            <div className="border-t border-zinc-100 pt-6">
              <h3 className="text-sm font-medium text-zinc-900 mb-5 flex justify-between">
                Size 
                {/* Show a clear button only if a size is selected */}
                {selectedSize && (
                  <span 
                    className="text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors"
                    onClick={() => setSelectedSize(null)}
                  >
                    × clear
                  </span>
                )}
              </h3>
              <div className="space-y-4">
                {/* "All Sizes" Option */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="size"
                    checked={selectedSize === null}
                    onChange={() => setSelectedSize(null)}
                    className="w-4 h-4 border-zinc-300 text-zinc-900 focus:ring-zinc-900" 
                  />
                  <span className={`text-sm transition-colors ${selectedSize === null ? "text-zinc-900 font-medium" : "text-zinc-600 group-hover:text-zinc-900"}`}>
                    All Sizes
                  </span>
                </label>

                {/* Dynamic Size Options from Database */}
                {availableSizes.map((size) => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="size"
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      className="w-4 h-4 border-zinc-300 text-zinc-900 focus:ring-zinc-900" 
                    />
                    <span className={`text-sm transition-colors ${selectedSize === size ? "text-zinc-900 font-medium" : "text-zinc-600 group-hover:text-zinc-900"}`}>
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Medium Filter (Existing) */}
            <div className="border-t border-zinc-100 pt-6">
              <h3 className="text-sm font-medium text-zinc-900 mb-5 flex justify-between">
                Medium <span className="text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors">×</span>
              </h3>
              <div className="space-y-4">
                {["Oil Painting", "Acrylic", "Watercolor", "Mixed Media"].map((medium) => (
                  <label key={medium} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
                    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{medium}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Content - Grid */}
        <div className="flex-1 min-w-0">
          
          {/* Sort Controls */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">Sort</span>
              <select className="text-sm border-zinc-200 rounded-none py-2 pl-3 pr-8 focus:ring-zinc-900 focus:border-zinc-900 bg-transparent">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Expanded Artwork Grid */}
          {formattedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {formattedArtworks.map((painting) => (
                <ArtworkCard key={painting.id} painting={painting} />
              ))}
            </div>
          ) : (
            /* Empty State if a filter yields no results */
            <div className="py-20 text-center border border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center">
              <p className="text-zinc-500 mb-4">No pieces currently match this size.</p>
              <button 
                onClick={() => setSelectedSize(null)}
                className="text-sm font-medium text-zinc-900 underline underline-offset-4"
              >
                Clear Filters
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
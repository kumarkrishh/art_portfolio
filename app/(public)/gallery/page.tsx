"use client";

import { useState, useRef, useEffect } from "react";
import { ArtworkCard, Painting } from "@/components/gallery/artwork-card";
import { artworks } from "@/lib/data";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "title-asc", label: "Title: A–Z" },
  { value: "title-desc", label: "Title: Z–A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

type SortValue = typeof SORT_OPTIONS[number]["value"];

export default function GalleryPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortValue>("price-asc");
  const [showFilters, setShowFilters] = useState(true);
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableSizes = Array.from(
    new Set(artworks.map((art) => art.dimensions).filter(Boolean))
  ) as string[];

  const availableMediums = Array.from(
    new Set(artworks.map((art) => art.medium).filter(Boolean))
  ) as string[];

  const filteredArtworks = artworks.filter((art) => {
    if (selectedSize && art.dimensions !== selectedSize) {
      return false; 
    }
    if (selectedMediums.length > 0 && !selectedMediums.includes(art.medium)) {
      return false;
    }
    return true; 
  });

  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

  const formattedArtworks: Painting[] = sortedArtworks.map((art) => ({
    id: art.id,
    slug: art.id, 
    title: art.title,
    collection: art.collection,
    medium: art.medium,
    price: art.price,
    imageUrl: art.image_url, 
    dimensions: art.dimensions, 
  }));

  const activeSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label;

  const toggleMedium = (medium: string) => {
    setSelectedMediums((prev) =>
      prev.includes(medium)
        ? prev.filter((m) => m !== medium)
        : [...prev, medium]
    );
  };

  const clearAllFilters = () => {
    setSelectedSize(null);
    setSelectedMediums([]);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
      
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">All Artwork</h1>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Sidebar - Filters */}
        <aside className={`${showFilters ? 'lg:w-64' : 'lg:w-auto'} w-full flex-shrink-0 transition-all duration-300`}>
          <div className="sticky top-28 space-y-8">
            
            <div className="flex items-center justify-between gap-6">
              {/* Upgraded Filter Toggle Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 text-sm rounded-full py-2 px-4 hover:border-zinc-300 hover:bg-zinc-50 transition-colors whitespace-nowrap focus:outline-none"
              >
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              
              <span className="text-xs text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                {formattedArtworks.length} Artworks
              </span>
            </div>

            {showFilters && (
              <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Size Filter */}
                <div className="border-t border-zinc-100 pt-6">
                  <h3 className="text-sm font-medium text-zinc-900 mb-5 flex justify-between">
                    Size 
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

                {/* Medium Filter */}
                <div className="border-t border-zinc-100 pt-6">
                  <h3 className="text-sm font-medium text-zinc-900 mb-5 flex justify-between">
                    Medium 
                    {selectedMediums.length > 0 && (
                      <span 
                        className="text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors"
                        onClick={() => setSelectedMediums([])}
                      >
                        × clear
                      </span>
                    )}
                  </h3>
                  <div className="space-y-4">
                    {availableMediums.map((medium) => (
                      <label key={medium} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedMediums.includes(medium)}
                          onChange={() => toggleMedium(medium)}
                          className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 focus:ring-offset-0" 
                        />
                        <span className={`text-sm transition-colors ${selectedMediums.includes(medium) ? "text-zinc-900 font-medium" : "text-zinc-600 group-hover:text-zinc-900"}`}>
                          {medium}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </aside>

        {/* Right Content - Grid */}
        <div className="flex-1 min-w-0">
          
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-3" ref={sortRef}>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Sort by</span>
              
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 text-sm rounded-full py-2 pl-4 pr-3 hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none transition-colors w-44 justify-between"
                >
                  <span className="truncate">{activeSortLabel}</span>
                  <svg 
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 flex-shrink-0 ${isSortOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-zinc-50 text-left"
                      >
                        <span className={sortBy === option.value ? "text-zinc-900 font-medium" : "text-zinc-600"}>
                          {option.label}
                        </span>
                        {sortBy === option.value && (
                          <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {formattedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {formattedArtworks.map((painting) => (
                <ArtworkCard key={painting.id} painting={painting} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center rounded-lg">
              <p className="text-zinc-500 mb-4">No pieces currently match these filters.</p>
              <button 
                onClick={clearAllFilters}
                className="text-sm font-medium text-zinc-900 underline underline-offset-4"
              >
                Clear All Filters
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
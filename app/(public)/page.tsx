import Link from "next/link";
import { artworks } from "@/lib/data";
import { getArtworkPreviewUrl } from "@/lib/artwork-images";
import { ArtworkCard, Painting } from "@/components/gallery/artwork-card";

export default function HomePage() {
  // Define the exact IDs of the paintings you want to feature
  const featuredIds = [
    'sunbreak-over-the-sea', // Sunbreak over the Sea
    'silent-grove',          // Silent Grove
    'canopy-study',          // The Giant Reaches Up
    'turquoise-tides-in-motion', // Turquoise Tides in Motion
    'azure-descent',         // Hawaii Glow by Water
  ];

  // Map the IDs to the actual artwork data and format it for the card component
  const featuredArtworks: Painting[] = featuredIds
    .map(id => artworks.find(art => art.id === id))
    .filter((art): art is NonNullable<typeof art> => art !== undefined) // safety check
    .map((art) => ({
      id: art.id,
      slug: art.id, 
      title: art.title,
      collection: art.collection,
      medium: art.medium,
      price: art.price,
      imageUrl: getArtworkPreviewUrl(art.image_url), 
      dimensions: art.dimensions, 
      isSold: art.isSold,
      notForSale: art.notForSale,
    }));

  return (
    <main className="w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center overflow-hidden -mt-24 pt-24">
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-3.png')", 
            backgroundSize: 'cover',
            backgroundPosition: 'right center', 
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-start">
          
          <div className="max-w-2xl text-left">
            
            <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-8 font-medium">
              Fine Art Portfolio
            </span>

            <h1 
              className="text-6xl md:text-[5.5rem] lg:text-[7rem] text-zinc-900 mb-6 leading-[1.05] tracking-tight"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Original <br />
              Artwork <br />
              <span className="italic font-light text-zinc-600 text-5xl md:text-[4.5rem] lg:text-[6rem]">
                by Sree.
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-zinc-600 mb-12 font-light leading-relaxed max-w-md">
              A premium collection showcasing exquisite original paintings. 
              Discover her latest Spring collection, currently in progress.
            </p>

            <a 
              href="/gallery" 
              className="inline-block px-10 py-4 bg-zinc-900 border border-zinc-900 text-white text-[11px] tracking-[0.2em] font-medium hover:bg-transparent hover:text-zinc-900 transition-all duration-500 ease-out uppercase"
            >
              Explore Gallery
            </a>
          </div>

        </div>
      </div>

      {/* Featured Artworks Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mb-3">Selected Works</h2>
              <p className="text-zinc-500 font-light text-lg">A curated look at recent studio pieces.</p>
            </div>
            <Link 
              href="/gallery" 
              className="hidden md:inline-block text-sm font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-zinc-600 hover:border-zinc-600 transition-colors"
            >
              View Full Gallery
            </Link>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory">
            {featuredArtworks.map((painting) => (
              <div 
                key={painting.id} 
                className="w-[280px] md:w-[360px] flex-shrink-0 snap-start"
              >
                <ArtworkCard painting={painting} />
              </div>
            ))}
          </div>
          
          {/* Mobile View All Link */}
          <div className="mt-2 md:hidden text-center">
            <Link 
              href="/gallery" 
              className="inline-block text-sm font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-zinc-600 transition-colors"
            >
              View Full Gallery
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}

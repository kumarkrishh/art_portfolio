import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedCommissionLink } from "@/components/analytics/tracked-commission-link";
import { ProtectedArtworkImage } from "@/components/gallery/protected-artwork-image";
import { getArtworkPreviewUrl } from "@/lib/artwork-images";
import { artworks } from "@/lib/data";

export default async function ArtworkDetailsPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  
  const painting = artworks.find(art => art.id === resolvedParams.slug);

  if (!painting || painting.notForSale) {
    notFound();
  }

  // Pre-fill the email subject and body
  const emailSubject = encodeURIComponent(`Inquiry regarding: ${painting.title}`);
  const emailBody = encodeURIComponent(`Hello Sree,\n\nI am interested in purchasing "${painting.title}". Could you please provide more information on availability, shipping, and the purchasing process?\n\nThank you!`);
  const isUnavailable = painting.isSold || painting.notForSale;
  const availabilityLabel = painting.notForSale ? "Not for Sale" : "Sold";
  const availabilityButtonLabel = painting.notForSale ? "Not for Sale" : "Artwork Sold";

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-6 lg:py-8">
      
      {/* Back Navigation */}
      <Link 
        href="/gallery" 
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6 lg:mb-8 border-b border-transparent hover:border-zinc-900 pb-0.5 w-fit"
      >
        ← Back to Artwork
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Images */}
        <div className="flex-1 min-w-0 flex flex-col-reverse md:flex-row gap-6 lg:gap-10 w-full justify-center">
          
          {/* Vertical Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
            <button className="flex-shrink-0 w-20 h-28 relative bg-[#F9F8F6] rounded-sm overflow-hidden border transition-all border-zinc-900">
              <ProtectedArtworkImage
                src={getArtworkPreviewUrl(painting.image_url)} 
                alt={`${painting.title} thumbnail`} 
                className={`absolute inset-0 w-full h-full object-cover p-1.5 ${isUnavailable ? 'opacity-85' : ''}`}
              />
            </button>
          </div>

          {/* Main Large Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative h-[60vh] lg:h-[75vh] max-h-[800px] w-full bg-[#F9F8F6] rounded-sm overflow-hidden p-6 lg:p-12">
              <div className="relative w-full h-full">
                <ProtectedArtworkImage
                  src={painting.image_url}
                  alt={painting.title}
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-sm ${isUnavailable ? 'opacity-85' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Artwork Details */}
        <div className="w-full lg:w-[480px] flex-shrink-0 flex flex-col py-4">
          
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-2">{painting.title}</h1>
          <p className="text-zinc-500 mb-6 text-lg">{painting.collection}</p>
          
          {/* Updated Price to reflect "Sold" status */}
          <p className="text-2xl font-semibold text-zinc-900 mb-8">
            {isUnavailable ? <span className="italic text-zinc-500 font-normal">{availabilityLabel}</span> : `$${painting.price}`}
          </p>
          
          <div className="w-12 h-[1px] bg-zinc-200 mb-8"></div>
          
          <p className="text-zinc-600 text-base leading-relaxed mb-8">
            {painting.description}
          </p>

          {/* Details Section */}
          <div className="mb-10 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-widest mb-1">Materials</h4>
              <p className="text-sm text-zinc-600">{painting.medium}</p>
            </div>
            
            {painting.dimensions && (
              <div>
                <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-widest mb-1">Dimensions</h4>
                <p className="text-sm text-zinc-600">{painting.dimensions}</p>
              </div>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-4 mt-auto">
            {isUnavailable ? (
              <div className="flex flex-col gap-4">
                <button 
                  disabled 
                  className="w-full bg-zinc-100 text-zinc-400 border border-zinc-200 rounded-full py-4 text-sm font-medium cursor-not-allowed tracking-widest uppercase"
                >
                  {availabilityButtonLabel}
                </button>
                <div className="text-center mt-2">
                  <TrackedCommissionLink
                    href="/commissions" 
                    className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors border-b border-zinc-400 hover:border-zinc-900 pb-0.5"
                    source={painting.notForSale ? "artwork_detail_not_for_sale" : "artwork_detail_sold"}
                    artworkId={painting.id}
                    artworkTitle={painting.title}
                  >
                    Interested in a similar piece? Commission an artwork.
                  </TrackedCommissionLink>
                </div>
              </div>
            ) : (
              <a 
                href={`mailto:info@sree.art?subject=${emailSubject}&body=${emailBody}`}
                className="block w-full text-center bg-zinc-900 text-white border border-zinc-900 rounded-full py-4 text-sm font-medium hover:bg-zinc-800 transition-all duration-200 tracking-wide"
              >
                Inquire to Purchase
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedCommissionLink } from "@/components/analytics/tracked-commission-link";
import { ArtworkImageGallery } from "@/components/gallery/artwork-image-gallery";
import { ArtworkPrice } from "@/components/gallery/artwork-price";
import { ArtworkSelectionProvider } from "@/components/gallery/artwork-selection-context";
import { BuyArtworkButton } from "@/components/gallery/buy-artwork-button";
import { getArtworkDetailImages } from "@/lib/artwork-images";
import { artworks } from "@/lib/data";
import { getPaymentReadiness } from "@/lib/payment-config";

export default async function ArtworkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
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
  const detailImages = getArtworkDetailImages(painting);
  const paymentsReady = getPaymentReadiness().ready;
  const dimensionValues = painting.dimensions.match(/\d+(?:\.\d+)?/g)?.map(Number);
  const orientation = !dimensionValues || dimensionValues[0] === dimensionValues[1]
    ? "square"
    : dimensionValues[0] > dimensionValues[1]
      ? "landscape"
      : "portrait";

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-6 lg:py-8">
      
      {/* Back Navigation */}
      <Link 
        href="/gallery" 
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6 lg:mb-8 border-b border-transparent hover:border-zinc-900 pb-0.5 w-fit"
      >
        ← Back to Artwork
      </Link>

      <ArtworkSelectionProvider>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Images */}
        <ArtworkImageGallery
          images={detailImages}
          title={painting.title}
          isUnavailable={Boolean(isUnavailable)}
          orientation={orientation}
        />

        {/* Right Side: Artwork Details */}
        <div className="w-full lg:w-[480px] flex-shrink-0 flex flex-col py-4">
          
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-2">{painting.title}</h1>
          <p className="text-zinc-500 mb-6 text-lg">{painting.collection}</p>
          
          {/* Updated Price to reflect "Sold" status */}
          <p className="text-2xl font-semibold text-zinc-900 mb-8">
            <ArtworkPrice
              basePrice={painting.price}
              isUnavailable={Boolean(isUnavailable)}
              unavailableLabel={availabilityLabel}
            />
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
            ) : paymentsReady ? (
              <div className="space-y-3">
                <BuyArtworkButton
                  artworkId={painting.id}
                  artworkTitle={painting.title}
                />
                <a
                  href={`mailto:info@sree.art?subject=${emailSubject}&body=${emailBody}`}
                  className="block text-center text-xs text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  Questions about shipping or the artwork? Contact Sree
                </a>
              </div>
            ) : (
              <a
                href={`mailto:info@sree.art?subject=${emailSubject}&body=${emailBody}`}
                className="block w-full rounded-full border border-zinc-900 bg-zinc-900 py-4 text-center text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-zinc-800"
              >
                Inquire to Purchase
              </a>
            )}
          </div>

        </div>
      </div>
      </ArtworkSelectionProvider>
    </div>
  );
}

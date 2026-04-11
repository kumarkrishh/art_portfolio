import Link from "next/link";

export type Painting = {
  id: string;
  slug: string;
  title: string;
  collection: string;
  medium: string;
  price: number;
  imageUrl: string;
  dimensions?: string; 
};

// Helper function to calculate a dynamic "matte" (padding) based on physical size
function getDynamicPadding(dimensions?: string) {
  if (!dimensions) return "p-5"; // Default

  // Extract the numbers from strings like "10.5 x 13.5 in"
  const matches = dimensions.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length < 2) return "p-5";

  const width = parseFloat(matches[0]);
  const height = parseFloat(matches[1]);
  const squareInches = width * height;

  // Small pieces (e.g., 8x10, 9x12, 10.5x13.5) get a wide matte
  if (squareInches <= 150) {
    return "p-8 md:p-10"; 
  }
  // Medium pieces (e.g., 14x18, 18x24) get a standard matte
  if (squareInches > 150 && squareInches < 500) {
    return "p-5 md:p-6";
  }
  // Large pieces (e.g., 18x36, 24x36) fill the frame
  return "p-2 md:p-3";
}

export function ArtworkCard({ painting }: { painting: Painting }) {
  // Get our calculated padding class
  const imagePaddingClass = getDynamicPadding(painting.dimensions);

  return (
    <Link href={`/gallery/${painting.slug}`} className="group flex flex-col gap-2">
      <div className="relative aspect-[4/5] w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-zinc-100 p-4 transition-all duration-500 ease-out group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
        <div className="relative w-full h-full bg-zinc-50 border border-zinc-200/50 flex items-center justify-center">
          <img
            src={painting.imageUrl}
            alt={painting.title}
            // Apply the dynamic padding here
            className={`absolute inset-0 w-full h-full object-contain ${imagePaddingClass}`}
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
        <p className="text-sm font-semibold text-zinc-900">${painting.price}</p>
      </div>
    </Link>
  );
}
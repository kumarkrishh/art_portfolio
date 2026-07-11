export function getArtworkPreviewUrl(imageUrl: string) {
  return imageUrl.replace("/artworks/", "/artworks-preview/");
}

export type ArtworkDetailImage = {
  src: string;
  thumbnailSrc: string;
  label: string;
};

const framedArtworkImages: Record<string, ArtworkDetailImage[]> = {
  "wild-flowers-by-the-river": [
    { src: "/wildflowersbyriver/1.png", thumbnailSrc: "/wildflowersbyriver/1.png", label: "Brown frame" },
    { src: "/wildflowersbyriver/2.png", thumbnailSrc: "/wildflowersbyriver/2.png", label: "White frame" },
  ],
  "morning-calm-by-the-sea": [
    { src: "/morningcalmbythesea/1.png", thumbnailSrc: "/morningcalmbythesea/1.png", label: "Brown frame" },
    { src: "/morningcalmbythesea/2.png", thumbnailSrc: "/morningcalmbythesea/2.png", label: "White frame" },
  ],
  sunbreak: [
    { src: "/sunbeamoverbluewaters/1.png", thumbnailSrc: "/sunbeamoverbluewaters/1.png", label: "Brown frame" },
    { src: "/sunbeamoverbluewaters/2.png", thumbnailSrc: "/sunbeamoverbluewaters/2.png", label: "White frame" },
  ],
  "amber-run": [
    { src: "/wherefallcolorsflow/1.png", thumbnailSrc: "/wherefallcolorsflow/1.png", label: "Brown frame" },
    { src: "/wherefallcolorsflow/2.png", thumbnailSrc: "/wherefallcolorsflow/2.png", label: "White frame" },
  ],
  "canopy-study": [
    { src: "/giantreachesup/1.png", thumbnailSrc: "/giantreachesup/1.png", label: "Brown frame" },
    { src: "/giantreachesup/2.png", thumbnailSrc: "/giantreachesup/2.png", label: "White frame" },
  ],
  "last-light-over-the-valley": [
    { src: "/sunsetbeyondcountryfences/1.png", thumbnailSrc: "/sunsetbeyondcountryfences/1.png", label: "Brown frame" },
    { src: "/sunsetbeyondcountryfences/2.png", thumbnailSrc: "/sunsetbeyondcountryfences/2.png", label: "White frame" },
  ],
  "minimal-branch-sunset": [
    { src: "/peacebeneatheveningskies/1.png", thumbnailSrc: "/peacebeneatheveningskies/1.png", label: "Brown frame" },
    { src: "/peacebeneatheveningskies/2.png", thumbnailSrc: "/peacebeneatheveningskies/2.png", label: "White frame" },
  ],
  "emerald-field": [
    { src: "/fieldofsmiles/1.png", thumbnailSrc: "/fieldofsmiles/1.png", label: "Brown frame" },
    { src: "/fieldofsmiles/2.png", thumbnailSrc: "/fieldofsmiles/2.png", label: "White frame" },
  ],
  "golden-rose": [
    { src: "/warmthinbloom/1.png", thumbnailSrc: "/warmthinbloom/1.png", label: "Brown frame" },
    { src: "/warmthinbloom/2.png", thumbnailSrc: "/warmthinbloom/2.png", label: "White frame" },
  ],
  "birch-canopy": [
    { src: "/springunfolding/1.png", thumbnailSrc: "/springunfolding/1.png", label: "Brown frame" },
    { src: "/springunfolding/2.png", thumbnailSrc: "/springunfolding/2.png", label: "White frame" },
  ],
  "cloudbank-coast": [
    { src: "/underpalmshade/1.png", thumbnailSrc: "/underpalmshade/1.png", label: "Brown frame" },
    { src: "/underpalmshade/2.png", thumbnailSrc: "/underpalmshade/2.png", label: "White frame" },
  ],
  "beach-study": [
    { src: "/wheregentlewavesreturn/1.png", thumbnailSrc: "/wheregentlewavesreturn/1.png", label: "Brown frame" },
    { src: "/wheregentlewavesreturn/2.png", thumbnailSrc: "/wheregentlewavesreturn/2.png", label: "White frame" },
  ],
  "saffron-current": [
    { src: "/saffroncurrent/1.png", thumbnailSrc: "/saffroncurrent/1.png", label: "Brown frame" },
    { src: "/saffroncurrent/2.png", thumbnailSrc: "/saffroncurrent/2.png", label: "White frame" },
  ],
  "vibrant-horizon": [
    { src: "/vibranthorizon/1.png", thumbnailSrc: "/vibranthorizon/1.png", label: "Brown frame" },
    { src: "/vibranthorizon/2.png", thumbnailSrc: "/vibranthorizon/2.png", label: "White frame" },
  ],
  "azure-descent": [
    { src: "/hawaiiglowbywater/1.png", thumbnailSrc: "/hawaiiglowbywater/1.png", label: "Brown frame" },
    { src: "/hawaiiglowbywater/2.png", thumbnailSrc: "/hawaiiglowbywater/2.png", label: "White frame" },
  ],
  "evening-across-the-bay": [
    { src: "/whispersatdusk/1.png", thumbnailSrc: "/whispersatdusk/1.png", label: "Brown frame" },
    { src: "/whispersatdusk/2.png", thumbnailSrc: "/whispersatdusk/2.png", label: "White frame" },
  ],
  "cranes-in-tandem": [
    { src: "/togetherinflight/1.png", thumbnailSrc: "/togetherinflight/1.png", label: "Brown frame" },
    { src: "/togetherinflight/2.png", thumbnailSrc: "/togetherinflight/2.png", label: "White frame" },
  ],
};

export function getArtworkDetailImages(artwork: {
  id: string;
  image_url: string;
}): ArtworkDetailImage[] {
  const canvasOnlyImage = {
    src: artwork.image_url,
    thumbnailSrc: getArtworkPreviewUrl(artwork.image_url),
    label: "Canvas only",
  };

  return [canvasOnlyImage, ...(framedArtworkImages[artwork.id] ?? [])];
}

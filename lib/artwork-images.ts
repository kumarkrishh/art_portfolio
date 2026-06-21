export function getArtworkPreviewUrl(imageUrl: string) {
  return imageUrl.replace("/artworks/", "/artworks-preview/");
}

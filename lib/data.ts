// lib/data.ts

export const artworks = [
  {
    id: 'piece-1893',
    title: 'Wild Flowers by the River',
    price: 155,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait (12h x 9w)
    description: "A vibrant landscape capturing a serene blue stream flowing through a lush meadow. Yellow wildflowers dot the foreground, leading the eye toward evergreen pines and majestic, snow-capped mountain peaks.", //
    image_url: '/artworks/alpine-stream.jpeg',
  },
  {
    id: 'october-bend',
    title: 'October Bend',
    price: 450,
    collection: 'Studio Collection',
    medium: 'Oil on Canvas',
    dimensions: '24 x 36 in', // Landscape (24h x 36w)
    description: "An autumnal landscape featuring a tranquil river curving through a forest ablaze with vivid red, orange, and yellow foliage, perfectly mirrored in the still water.", //
    image_url: '/artworks/october-bend.jpeg',
  },
  {
    id: 'piece-1903',
    title: 'Morning Calm by the Sea',
    price: 195,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A tranquil coastal scene portraying gentle waves washing onto a sandy beach. The soft, pastel-hued sky and pale blue waters evoke the quiet stillness of early morning.", //
    image_url: '/artworks/pastel-horizon.jpeg',
  },
  {
    id: 'sunbreak',
    title: 'Sunbeam over Blue Waters',
    price: 165,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A dramatic seascape highlighting a brilliant sunburst breaking through the clouds. The radiant light creates a striking reflection across the deep blue, cresting ocean waves.", //
    image_url: '/artworks/sunbreak.jpeg',
  },
  {
    id: 'piece-1925',
    title: 'Turquoise Tides in Motion',
    price: 200,
    collection: 'Studio Collection',
    medium: 'Textured Art',
    dimensions: '18 x 14 in', // Portrait
    description: "A heavily textured, impasto painting viewed from above, showcasing vibrant turquoise ocean water and thick, sculptural white foam crashing onto a sandy shoreline.", //
    image_url: '/artworks/crashing-tide.jpeg',
  },
  {
    id: 'saffron-current',
    title: 'Saffron Current',
    price: 475,
    collection: 'Studio Collection',
    medium: 'Oil on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A bold, abstract piece utilizing heavy impasto technique. Sweeping, textured brushstrokes in rich saffron, goldenrod, and warm orange create a sense of vibrant, flowing energy.", //
    image_url: '/artworks/saffron-current.jpeg',
  },
  {
    id: 'bamboo-study-i',
    title: 'Bamboo Study I',
    price: 520,
    collection: 'Studio Collection',
    medium: 'Oil on Canvas',
    dimensions: '36 x 18 in', // Portrait
    description: "A detailed study of thick, segmented bamboo stalks. The vibrant green of the bamboo is set against a warm, earthy, textured background, emphasizing strength and organic structure.", //
    image_url: '/artworks/bamboo-study-i.jpeg',
  },
  {
    id: 'amber-run', 
    title: 'Where Fall Colors Flow',
    price: 165,
    collection: 'Seasonal',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A bright, seasonal landscape where a vivid blue stream cuts through a golden autumn forest. White birch trees stand prominently among the amber foliage and grasses.", //
    image_url: '/artworks/amber-run.jpeg', 
  },
  {
    id: 'bamboo-study-ii',
    title: 'Gentle Leaves Steady Stalk',
    price: 135,
    collection: 'Studio Collection',
    medium: 'Acrylic on Paper',
    dimensions: '12 x 9 in', // Portrait
    description: "A minimalist botanical study featuring slender green bamboo stalks and delicate leaves against a clean, light background, emphasizing negative space and elegant line work.", //
    image_url: '/artworks/bamboo-study-ii.jpeg',
  },
  {
    id: 'bamboo-study-iii',
    title: 'Grace Wrapped in Green',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A dynamic botanical composition showing interwoven bamboo stalks and scattered green foliage, creating a sense of natural rhythm against a bright, airy background.", //
    image_url: '/artworks/bamboo-study-iii.jpeg',
  },
  {
    id: 'azure-descent',
    title: 'Hawaii Glow by Water',
    price: 165,
    collection: 'Studio Collection',
    medium: 'Mixed Media on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A vibrant tropical sunset rendered in rich, warm hues. Silhouetted palm trees frame a golden sun as it dips below the horizon, casting brilliant reflections across the ocean water.", //
    image_url: '/artworks/azure-descent.jpeg',
  },
  {
    id: 'beach-study',
    title: 'Sweet Whispers by the Sea',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A soothing coastal study featuring warm, sandy shores and gentle blue surf. The hazy, peach-toned sky creates a dreamy, atmospheric glow over the water.", //
    image_url: '/artworks/beach.jpeg',
  },
  {
    id: 'cathedral-of-redwoods',
    title: 'Redwood Path to Light',
    price: 195,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "An inviting forest scene depicting a winding dirt trail flanked by towering, reddish-brown redwood trunks, leading deeper into a vibrant, sunlit green canopy.", //
    image_url: '/artworks/cathedral-of-redwoods.jpeg',
  },
  {
    id: 'canopy-study',
    title: 'The Giant Reaches Up',
    price: 195,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A striking upward perspective of a massive tree trunk ascending toward the sky. Thick, textured bark contrasts with the bright, lush green canopy reaching overhead.", //
    image_url: '/artworks/canopy.jpeg',
  },
  {
    id: 'last-light-over-the-valley',
    title: 'Sunset Beyond Country Fences',
    price: 155,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A pastoral landscape showcasing vibrant green, rolling hills divided by a rustic wooden fence. A vivid sunset of pink, gold, and orange fills the sky above.", //
    image_url: '/artworks/last-light-over-the-valley.jpeg',
  },
  {
    id: 'the-long-way-home',
    title: 'The Road to Serenity',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A peaceful countryside scene featuring a winding dirt road and rustic wooden fences. The path leads the viewer's eye through a series of lush, rolling green hills.", //
    image_url: '/artworks/the-long-way-home.jpeg',
  },
  {
    id: 'autumn-whisper',
    title: 'Golden Leaves, Quiet Woods',
    price: 165,
    collection: 'Studio Collection',
    medium: 'Acrylic on Paper',
    dimensions: '12 x 9 in', // Portrait
    description: "A serene autumn woodland scene focusing on the striking contrast of white birch trunks and vibrant golden canopies against a soft, atmospheric background.", //
    image_url: '/artworks/autumn-whisper.jpeg',
  },
  // NEW ADDITIONS BELOW
  {
    id: 'quiet-evening-lake',
    title: 'Quiet Evening by the Lake',
    price: 185,
    collection: 'Studio Collection',
    medium: 'Acrylic on Paper',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A serene landscape featuring a solitary wooden bench overlooking a tranquil lake. Lush green foliage frames a vibrant, golden-yellow sky as the sun dips toward the horizon.", //
    image_url: '/artworks/quiet-evening-lake.jpeg',
  },
  {
    id: 'minimal-branch-sunset',
    title: 'Branch over Still Waters',
    price: 150,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait (12h x 9w)
    description: "A minimalist composition contrasting the delicate silhouette of a bare branch against a tranquil gradient sky and calm, pale blue waters.", //
    image_url: '/artworks/branch-over-waters.jpeg',
  },
  {
    id: 'cliffs-of-pacific',
    title: 'Cliffs of the Pacific',
    price: 350,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '18 x 24 in', // Landscape (18h x 24w)
    description: "A breathtaking coastal landscape featuring rugged cliffs dropping into brilliant sapphire waters. A white wooden fence in the foreground invites the viewer into the expansive scene.", //
    image_url: '/artworks/cliffs-of-pacific.jpeg',
  },
  {
    id: 'vibrant-horizon',
    title: 'Vibrant Horizon',
    price: 175,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait (12h x 9w)
    description: "A vivid sunset scene where fiery orange and pale pink clouds meet a calming teal ocean. The sun’s reflection shimmers across gently breaking waves rolling onto a dark shore.", //
    image_url: '/artworks/vibrant-horizon.jpeg',
  }
];
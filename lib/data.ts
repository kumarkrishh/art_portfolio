// lib/data.ts

export const artworks = [
  {
    id: 'wild-flowers-by-the-river',
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
    id: 'morning-calm-by-the-sea',
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
    medium: 'Mixed Media',
    dimensions: '12 x 9 in', // Portrait
    description: "A dramatic seascape highlighting a brilliant sunburst breaking through the clouds. The radiant light creates a striking reflection across the deep blue, cresting ocean waves.", //
    image_url: '/artworks/sunbreak.jpeg',
  },
  {
    id: 'turquoise-tides-in-motion',
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
    id: 'silent-grove',
    title: 'Silent Grove',
    price: 520,
    collection: 'Studio Collection',
    medium: 'Oil on Canvas',
    dimensions: '36 x 18 in', // Portrait
    description: "Tall bamboo stalks rise in quiet strength while soft leaves arc around them, giving the composition a grounded stillness.", //
    image_url: '/artworks/silent-grove.jpeg',
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
    id: 'tender-shoots',
    title: 'Tender Shoots',
    price: 135,
    isSold: true,
    collection: 'Studio Collection',
    medium: 'Watercolor on Paper',
    dimensions: '12 x 9 in', // Portrait
    description: "Slender bamboo and light leaves gather softly against open paper, giving the piece a fresh and delicate character.", //
    image_url: '/artworks/tender-shoots.jpeg',
  },
  {
    id: 'interwoven-green',
    title: 'Interwoven Green',
    price: 145,
    isSold: true,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "Crossing bamboo stalks and fine leaves create a woven rhythm, balancing structure and movement within a bright field of space.", //
    image_url: '/artworks/interwoven-green.jpeg',
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
    isSold: true,
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
  {
    id: 'quiet-evening-lake',
    title: 'Sunset at Almaden Lake',
    price: 125,
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
  },
  {
    id: 'shoreline-under-summer-clouds',
    title: 'Shoreline Under Summer Clouds',
    price: 185,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A bright coastal landscape with a quiet sandy shore, vivid blue water, and towering white clouds drifting above. Wind-shaped trees and dark volcanic rocks anchor the composition with a distinctly tropical feel.", //
    image_url: '/artworks/shoreline-under-summer-clouds.jpeg',
  },
  {
    id: 'sunbreak-over-the-sea',
    title: 'Sunbreak over the Sea',
    price: 195,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 12 in', // Square
    description: "A luminous seascape centered on sunlight breaking through layered clouds. Radiating beams and shimmering reflections stretch across the water, giving the scene a dramatic sense of openness and calm.", //
    image_url: '/artworks/sunbreak-over-the-sea.jpeg',
  },
  {
    id: 'pines-by-the-pacific',
    title: 'Pines by the Pacific',
    price: 165,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A peaceful coastal view framed by tall pines and a warm sandy shore. The broad blue sky and gentle surf create an airy, relaxed scene with a strong sense of stillness.", //
    image_url: '/artworks/pines-by-the-pacific.jpeg',
  },
  {
    id: 'ember-horizon',
    title: 'Ember Horizon',
    price: 195,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A dramatic ocean sunset where glowing amber light burns beneath sweeping storm clouds, reflecting in a bright path across the water.", //
    image_url: '/artworks/ember-horizon.jpeg',
  },
  {
    id: 'quiet-sail',
    title: 'Quiet Sail',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A lone white sailboat glides across clear blue water beneath a calm sky, with distant green hills softening the horizon.", //
    image_url: '/artworks/quiet-sail.jpeg',
  },
  {
    id: 'evening-across-the-bay',
    title: 'Evening Across the Bay',
    price: 185,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "Overhanging branches frame a glowing sunset bay, where the city line appears as a quiet silhouette across luminous water.", //
    image_url: '/artworks/evening-across-the-bay.jpeg',
  },
  {
    id: 'desert-first-light',
    title: 'Desert First Light',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "Rolling brown hills meet a clean blue sky as the first warm light of day rises over a sparse desert ridge.", //
    image_url: '/artworks/desert-first-light.jpeg',
  },
  {
    id: 'still-reaching',
    title: 'Still Reaching',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A cluster of bamboo rises from the left edge while airy leaves reach across open space, giving the composition a calm upward pull.", //
    image_url: '/artworks/still-reaching.jpeg',
  },
  {
    id: 'open-meadow',
    title: 'Open Meadow',
    price: 135,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A simple green meadow stretches toward rounded hills under a wide blue sky, emphasizing calm and openness.", //
    image_url: '/artworks/open-meadow.jpeg',
  },
  {
    id: 'sunflower-study',
    title: 'Sunflower Study',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A bright sunflower fills the foreground, standing out against a field of smaller blooms and deep summer greens.", //
    image_url: '/artworks/sunflower-study.jpeg',
  },
  {
    id: 'emerald-field',
    title: 'Emerald Field',
    price: 135,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A luminous green field and low hills sit beneath a gentle blue sky in a pared-down landscape focused on color and light.", //
    image_url: '/artworks/emerald-field.jpeg',
  },
  {
    id: 'cranes-in-tandem',
    title: 'Cranes in Tandem',
    price: 175,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "Two white cranes move together across a deep blue field, their mirrored flight conveying grace, rhythm, and companionship.", //
    image_url: '/artworks/cranes-in-tandem.jpeg',
  },
  {
    id: 'three-geese-crossing',
    title: 'Three Geese Crossing',
    price: 165,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "Three geese stride across a sunlit field, bringing a playful sense of movement to a bright pastoral scene.", //
    image_url: '/artworks/three-geese-crossing.jpeg',
  },
  {
    id: 'prairie-cloud',
    title: 'Prairie Cloud',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A towering cloud drifts above a small red barn and open field, turning a simple rural view into a study of scale and atmosphere.", //
    image_url: '/artworks/prairie-cloud.jpeg',
  },
  {
    id: 'verdant-rhythm',
    title: 'Verdant Rhythm',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "Broad green stalks stand in close cadence while fine leaves break the pattern with a lighter, musical movement.", //
    image_url: '/artworks/verdant-rhythm.jpeg',
  },
  {
    id: 'golden-rose',
    title: 'Golden Rose',
    price: 135,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A close-up yellow rose unfolds in layered petals against a dark green background, celebrating color and form.", //
    image_url: '/artworks/golden-rose.jpeg',
  },
  {
    id: 'leaning-light',
    title: 'Leaning Light',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "Leaning bamboo canes and scattered leaves create a gentle diagonal flow, held together by soft light and open background space.", //
    image_url: '/artworks/leaning-light.jpeg',
  },
  {
    id: 'birch-canopy',
    title: 'Birch Canopy',
    price: 165,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "Seen from below, a bright birch trunk and spring-green leaves reach into an open blue sky, giving the painting an uplifting vertical pull.", //
    image_url: '/artworks/birch-canopy.jpeg',
  },
  {
    id: 'snowline-meadow',
    title: 'Snowline Meadow',
    price: 155,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A green meadow leads toward a low forest and a chain of snow-touched peaks under a clear, expansive sky.", //
    image_url: '/artworks/snowline-meadow.jpeg',
  },
  {
    id: 'migration-at-dusk',
    title: 'Migration at Dusk',
    price: 155,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A line of white birds cuts across a glowing dusk gradient, turning a minimal sky into a quiet migration study.", //
    image_url: '/artworks/migration-at-dusk.jpeg',
  },
  {
    id: 'cloudbank-coast',
    title: 'Cloudbank Coast',
    price: 185,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '9 x 12 in', // Landscape (9h x 12w)
    description: "A tropical shoreline with dark lava rocks, bright surf, and towering clouds captures the openness of a sunlit coastal day.", //
    image_url: '/artworks/cloudbank-coast.jpeg',
  },
  {
    id: 'mountain-barn',
    title: 'Mountain Barn',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "A small red barn sits alone below a steep green mountainside, giving the scene a strong sense of shelter and distance.", //
    image_url: '/artworks/mountain-barn.jpeg',
  },
  {
    id: 'palm-canopy',
    title: 'Palm Canopy',
    price: 145,
    collection: 'Studio Collection',
    medium: 'Acrylic on Canvas',
    dimensions: '12 x 9 in', // Portrait
    description: "Palm fronds sweep outward from the trunk in an upward-looking tropical study filled with layered greens and clear sky.", //
    image_url: '/artworks/palm-canopy.jpeg',
  }
];

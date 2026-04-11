import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left: Artist Photo */}
        <div className="w-full lg:w-1/2 relative aspect-[4/5] bg-zinc-50 border border-zinc-100 p-4">
          <div className="relative w-full h-full bg-zinc-200">
             {/* Replace with your actual photo */}
            <img 
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop" 
              alt="Sree working in the studio" 
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </div>
        </div>

        {/* Right: Bio */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-serif text-zinc-900 mb-8">About the Artist</h1>
          <div className="space-y-6 text-zinc-600 text-lg leading-relaxed">
            <p>
              Hello, I'm Sree. I am a contemporary painter focused on exploring the relationship between light, texture, and natural environments.
            </p>
            <p>
              Working primarily in oils and mixed media, my process is intuitive and heavily inspired by the coastal landscapes and shifting seasons of my home. Each piece is an attempt to capture a fleeting atmospheric moment and translate it into a permanent visual record.
            </p>
            <p>
              When I'm not in the studio, you can usually find me gathering reference materials out in nature or exploring new material techniques.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
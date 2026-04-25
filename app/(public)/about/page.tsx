import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-center">
        
        {/* Left: Artist Photo */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] bg-[#F9F8F6] rounded-sm overflow-hidden">
            <Image
              src="/images/profile.png"
              alt="Portrait of Sree"
              fill
              priority
              // Changed from object-bottom to object-center, and added p-8 so it floats beautifully in the middle
              className="object-contain object-center drop-shadow-md p-8"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </div>

        {/* Right: Bio */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6 font-medium">
            The Artist
          </span>
          
          <h1 
            className="text-5xl md:text-6xl text-zinc-900 mb-10 leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Meet <span className="italic font-light text-zinc-500">Sree.</span>
          </h1>

          <div className="space-y-8 text-zinc-600 font-light leading-relaxed text-[15px]">
            <p className="text-xl text-zinc-800 font-normal leading-snug">
              I am a contemporary painter focused on exploring the relationship between light, texture, and natural environments.
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
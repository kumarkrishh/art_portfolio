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

          <div className="space-y-6 text-zinc-600 font-light leading-relaxed text-[15px]">
            {/* Lead-in sentence */}
            <p className="text-xl text-zinc-800 font-normal leading-snug mb-2">
              I am a self-taught artist whose creative process is deeply intuitive. 
            </p>
            
            {/* Body paragraphs */}
            <p>
              I follow my heart across the canvas, allowing color, texture, and emotion to guide each piece. For me, expression is at the center of every painting — each brushstroke becoming a conversation between feeling, memory, and the canvas itself.
            </p>
            <p>
              Nature is my greatest inspiration. I find myself continually drawn to nature’s beauty, rhythm, and quiet presence. I believe this connection is sacred, deeply divine, and painting is my way of honoring that connection. Working across acrylics, watercolor, mixed media, and textured surfaces, I explore the layers of emotion and experience that shape how we see and remember the world around us.
            </p>
            <p>
              Each piece I create carries its own story — a moment, a memory, a place, or a feeling held in time. My hope is that viewers find something personal within my work: a reflection of their own journey, a sense of peace, stillness or a connection that speaks to the heart.
            </p>
            <p>
              When I’m not in the studio, I am often outdoors gathering inspiration from nature, collecting reference materials, or exploring new techniques and materials that continue to shape and evolve my artistic practice.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
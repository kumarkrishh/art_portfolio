export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden -mt-24 pt-24">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero-3.png')", 
          backgroundSize: 'cover',
          backgroundPosition: 'right center', 
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-start">
        
        <div className="max-w-2xl text-left">
          
          <span className="block text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-8 font-medium">
            Fine Art Portfolio
          </span>

          <h1 
            className="text-6xl md:text-[5.5rem] lg:text-[7rem] text-zinc-900 mb-6 leading-[1.05] tracking-tight"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Original <br />
            Artwork <br />
            <span className="italic font-light text-zinc-600 text-5xl md:text-[4.5rem] lg:text-[6rem]">
              by Sree.
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-600 mb-12 font-light leading-relaxed max-w-md">
            A premium collection showcasing exquisite original paintings. 
            Discover her latest Spring collection, currently in progress.
          </p>

          {/* Upgraded Button: Solid dark background for instant visibility */}
          <a 
            href="/gallery" 
            className="inline-block px-10 py-4 bg-zinc-900 border border-zinc-900 text-white text-[11px] tracking-[0.2em] font-medium hover:bg-transparent hover:text-zinc-900 transition-all duration-500 ease-out uppercase"
          >
            Explore Gallery
          </a>
        </div>

      </div>
    </div>
  );
}
export default function HomePage() {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay: This adds a slight tint and blur to make the text pop. 
            Adjust bg-black/30 to bg-black/50 if you want it darker.
        */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 drop-shadow-lg">
          Original Artwork by Sree
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-100 max-w-2xl mb-12 font-light drop-shadow-md">
          A premium portfolio showcasing original paintings. 
          The new Spring collection is currently in progress.
        </p>

        <a 
          href="/gallery" 
          className="px-10 py-4 bg-white text-zinc-900 text-sm tracking-[0.2em] font-medium hover:bg-zinc-100 transition-all duration-300 rounded-none uppercase shadow-xl"
        >
          View Gallery
        </a>
      </div>

      {/* Aesthetic Bottom Fade (Optional: blends into the next section) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </div>
  );
}
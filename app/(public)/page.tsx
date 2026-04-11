export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900 mb-6">
        Original Artwork by Sree
      </h1>
      <p className="text-lg text-zinc-500 max-w-2xl mb-12 font-light">
        A premium portfolio showcasing original paintings. The new Spring collection is currently in progress.
      </p>
      <a 
        href="/gallery" 
        className="px-8 py-3 bg-zinc-900 text-white text-sm tracking-wide hover:bg-zinc-800 transition-colors rounded-none"
      >
        View Gallery
      </a>
    </div>
  );
}
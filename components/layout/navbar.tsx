import Link from "next/link";

export function Navbar() {
  const navLinks = ["Gallery", "Commissions", "About", "Contact"];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link 
          href="/" 
          className="text-2xl md:text-3xl text-zinc-900 tracking-wide hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
        >
          Sree's Art
        </Link>

        {/* Middle: Real Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              // Bumped to text-xs and adjusted tracking slightly
              className="text-xs tracking-[0.15em] uppercase font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Side: Cart & Menu */}
        <div className="flex items-center gap-6">
          <button className="md:hidden text-zinc-900 hover:opacity-70 transition-opacity">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
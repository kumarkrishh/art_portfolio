import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-100">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link href="/" className="text-2xl font-serif text-zinc-900 tracking-wide">
          Sree Art
        </Link>

        {/* Middle: Real Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/gallery" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Gallery
          </Link>
          <Link href="/commissions" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Commissions
          </Link>
          <Link href="/about" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Side: Cart & Menu */}
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors">
            Cart (0)
          </button>
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-zinc-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
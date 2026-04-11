import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 bg-white pt-16 pb-8 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-sm">
        
        <div className="flex flex-col space-y-4">
          <h3 className="font-medium tracking-widest uppercase text-zinc-900">Sree Art</h3>
          <p className="text-zinc-500 leading-relaxed max-w-xs mx-auto md:mx-0">
            Original paintings and mixed media artwork. Exploring the intersection of color, nature, and emotion.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-zinc-900 mb-2">Explore</h4>
          <Link href="/gallery" className="text-zinc-500 hover:text-zinc-900 transition-colors">Available Works</Link>
          <Link href="/sold" className="text-zinc-500 hover:text-zinc-900 transition-colors">Sold Archive</Link>
          <Link href="/commissions" className="text-zinc-500 hover:text-zinc-900 transition-colors">Commissions</Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-zinc-900 mb-2">Support</h4>
          <Link href="/faq" className="text-zinc-500 hover:text-zinc-900 transition-colors">FAQ</Link>
          <Link href="/shipping-returns" className="text-zinc-500 hover:text-zinc-900 transition-colors">Shipping & Returns</Link>
          <Link href="/contact" className="text-zinc-500 hover:text-zinc-900 transition-colors">Contact</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center text-xs text-zinc-400">
        <p>&copy; {currentYear} Sree Art. All rights reserved.</p>
      </div>
    </footer>
  );
}
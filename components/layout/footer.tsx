import Link from "next/link";

export function Footer() {
  return (
    // Subtle top border, pushes to the bottom of the page
    <footer className="w-full bg-white border-t border-zinc-100 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-serif text-zinc-900 tracking-wide mb-4 inline-block">
              Sree Art
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Original paintings and premium fine art prints. Exploring light, texture, and the natural world through deliberate brushwork.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-widest mb-6">Explore</h4>
            <div className="flex flex-col gap-4 text-sm">
              <Link href="/gallery" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit">All Artwork</Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Commissions</Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit">About the Artist</Link>
            </div>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex flex-col gap-4 text-sm">
              <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Instagram</a>
              <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Pinterest</a>
              <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Contact</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Sree Art. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-400">
            <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
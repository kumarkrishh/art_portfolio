import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-100 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="text-3xl text-zinc-900 tracking-wide mb-6 inline-block hover:opacity-70 transition-opacity duration-300"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Sree Art.
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm font-light">
              Original paintings and premium fine art prints. Exploring light, texture, and the natural world through deliberate brushwork.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            {/* Bumped headings to text-xs, font-semibold */}
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-[0.15em] mb-8">
              Explore
            </h4>
            <div className="flex flex-col gap-5">
              {/* Bumped links to text-xs */}
              <Link href="/gallery" className="text-xs tracking-[0.1em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-fit">All Artwork</Link>
              <Link href="#" className="text-xs tracking-[0.1em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Commissions</Link>
              <Link href="#" className="text-xs tracking-[0.1em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-fit">About the Artist</Link>
            </div>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-[0.15em] mb-8">
              Connect
            </h4>
            <div className="flex flex-col gap-5">
              <a href="#" className="text-xs tracking-[0.1em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Instagram</a>
              <a href="#" className="text-xs tracking-[0.1em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Pinterest</a>
              <a href="#" className="text-xs tracking-[0.1em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors w-fit">Contact</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs tracking-[0.1em] uppercase text-zinc-400">
            © {new Date().getFullYear()} Sree Art. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs tracking-[0.1em] uppercase text-zinc-400">
            <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
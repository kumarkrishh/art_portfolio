"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Gallery", href: "/gallery" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Commissions", href: "/commissions" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Artist Name */}
        <Link 
          href="/" 
          className="text-xl font-medium tracking-widest uppercase text-zinc-900"
        >
          Sree Art
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white absolute w-full pb-6 shadow-xl">
          <nav className="flex flex-col px-6 pt-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg text-zinc-600 hover:text-zinc-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
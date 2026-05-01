"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const navLinks = ["Gallery", "Commissions", "About", "Contact"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Middle: Real Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="text-xs tracking-[0.15em] uppercase font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Side: Menu Toggle Button */}
        <div className="flex items-center gap-6">
          <button 
            className="md:hidden text-zinc-900 hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // "X" Close Icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-white border-b border-zinc-100 shadow-2xl py-8 px-6 flex flex-col gap-6 animate-in slide-in-from-top-2 fade-in duration-200">
          {navLinks.map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              onClick={() => setIsMobileMenuOpen(false)} // Closes the menu when a link is clicked
              className="text-sm tracking-[0.15em] uppercase font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
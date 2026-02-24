'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Venues', id: 'locations' },
    { label: 'Services', id: 'services' },
    { label: 'Players', id: 'players' },
    { label: 'Events', id: 'events' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <header 
      className="bg-gradient-to-r from-[#0a1f14]/98 via-[#1a472a]/95 to-[#0a1f14]/98 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-[#CCFF00] to-[#9dcc00] rounded-xl flex items-center justify-center shadow-lg shadow-[#CCFF00]/20 group-hover:shadow-[#CCFF00]/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-[#1a472a] font-black text-xl">F</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#CCFF00]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight tracking-tight">Flash Sports</span>
              <span className="text-[#CCFF00]/70 text-[10px] font-medium tracking-widest uppercase">Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="relative px-4 py-2 text-white/80 hover:text-white font-medium text-sm transition-all duration-200 group"
              >
                {link.label}
                {/* Hover underline effect */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Contact chip - hidden on mobile */}
            <a 
              href="tel:+9779800000000" 
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
              <span>+977 980-0000000</span>
            </a>

            <Button variant="volt" size="sm" href="#book-court" className="shadow-lg shadow-[#CCFF00]/20 hover:shadow-[#CCFF00]/40">
              <span className="mr-1.5">🎾</span>
              Book Now
            </Button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#0a1f14]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <a 
                href="tel:+9779800000000" 
                className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors"
              >
                <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                <span>+977 980-0000000</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

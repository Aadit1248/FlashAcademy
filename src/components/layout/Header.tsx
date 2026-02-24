'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#CCFF00] rounded-full flex items-center justify-center">
              <span className="text-[#1a472a] font-bold text-xl">F</span>
            </div>
            <span className="text-white font-bold text-xl">Flash Sports</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="text-white hover:text-[#CCFF00] transition-colors cursor-pointer"
            >
              Home
            </a>
            <a 
              href="#locations" 
              onClick={(e) => scrollToSection(e, 'locations')}
              className="text-white hover:text-[#CCFF00] transition-colors cursor-pointer"
            >
              Venues
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className="text-white hover:text-[#CCFF00] transition-colors cursor-pointer"
            >
              Services
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="text-white hover:text-[#CCFF00] transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="volt" size="sm" href="#book-court">
              Book Now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

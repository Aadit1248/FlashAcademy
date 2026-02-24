import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-green-900 font-bold text-xl">K</span>
            </div>
            <span className="text-white font-bold text-xl">Kridx</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link href="/venues" className="text-white hover:text-yellow-400 transition-colors">
              Venues
            </Link>
            <Link href="/events" className="text-white hover:text-yellow-400 transition-colors">
              Events
            </Link>
            <Link href="/pricing" className="text-white hover:text-yellow-400 transition-colors">
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="primary" size="sm">
              Login
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

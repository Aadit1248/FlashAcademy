import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600" />
        <div className="absolute inset-0 bg-[url('/images/hero-tennis.jpg')] bg-cover bg-center mix-blend-overlay opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-900/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            PLAY <span className="text-yellow-400">SPORTS</span>
          </h1>
          <p className="text-xl text-green-100 mb-8">
            World&apos;s Biggest Sports Community. Book courts, join events, and elevate your game.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Book a Court
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Explore Venues
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative player image on the right */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full z-10">
        <div className="absolute bottom-0 right-0 w-full h-4/5 bg-gradient-to-l from-green-800/50 to-transparent" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

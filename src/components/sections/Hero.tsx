import { Button } from '@/components/ui/Button';
import { getPayloadInstance } from '@/lib/payloadClient';

interface Location {
  id: string;
  name: string;
  clayCourts: number;
  miniCourts: number;
}

interface HeroStats {
  totalCourts: number;
  totalLocations: number;
  activePlayers: number;
}

export async function Hero() {
  let stats: HeroStats = {
    totalCourts: 0,
    totalLocations: 0,
    activePlayers: 0,
  };
  
  try {
    const payload = await getPayloadInstance();
    if (!payload) throw new Error('Payload instance not available');
    
    // Fetch locations to calculate total courts and location count
    const locationsResult = await payload.find({
      collection: 'locations',
      limit: 100,
    });
    const locations = locationsResult.docs as Location[];
    
    const totalCourts = locations.reduce(
      (sum, loc) => sum + (loc.clayCourts || 0) + (loc.miniCourts || 0),
      0
    );
    
    // Fetch player count
    const playersResult = await payload.count({
      collection: 'players',
    });
    
    stats = {
      totalCourts,
      totalLocations: locations.length,
      activePlayers: playersResult.totalDocs,
    };
  } catch (error) {
    console.error('Error fetching hero stats:', error);
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* High-Impact Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - Deep forest green */}
        <div className="w-full h-full bg-gradient-to-br from-[#0a1f14] via-[#1a472a] to-[#0f2d1a]" />
        
        {/* Tennis court lines pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 49.5%, rgba(204,255,0,0.3) 49.5%, rgba(204,255,0,0.3) 50.5%, transparent 50.5%),
              linear-gradient(0deg, transparent 49.5%, rgba(204,255,0,0.3) 49.5%, rgba(204,255,0,0.3) 50.5%, transparent 50.5%)
            `,
            backgroundSize: '120px 120px',
          }}
        />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f14] via-transparent to-[#0a1f14]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a472a] via-transparent to-transparent" />
      </div>

      {/* Animated Tennis Balls */}
      <div className="absolute top-20 right-[15%] w-32 h-32 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-full h-full rounded-full bg-[#CCFF00] shadow-2xl shadow-[#CCFF00]/30 relative">
          {/* Tennis ball seam */}
          <div className="absolute inset-2 rounded-full border-2 border-[#9dcc00]/50" 
               style={{ 
                 clipPath: 'path("M 50 0 C 70 25, 70 75, 50 100 C 30 75, 30 25, 50 0")',
                 transform: 'rotate(45deg)'
               }} />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute w-full h-[3px] bg-white/40 top-1/2 -translate-y-1/2 rotate-[30deg]" />
            <div className="absolute w-full h-[3px] bg-white/40 top-1/2 -translate-y-1/2 -rotate-[30deg]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-[25%] w-20 h-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <div className="w-full h-full rounded-full bg-[#CCFF00]/80 shadow-xl shadow-[#CCFF00]/20 relative">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute w-full h-[2px] bg-white/30 top-1/2 -translate-y-1/2 rotate-[30deg]" />
            <div className="absolute w-full h-[2px] bg-white/30 top-1/2 -translate-y-1/2 -rotate-[30deg]" />
          </div>
        </div>
      </div>

      {/* Tennis Racket Silhouette */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Racket head */}
          <ellipse cx="100" cy="70" rx="55" ry="65" stroke="white" strokeWidth="4" fill="none" />
          {/* Racket strings horizontal */}
          <line x1="50" y1="40" x2="150" y2="40" stroke="white" strokeWidth="1" />
          <line x1="48" y1="55" x2="152" y2="55" stroke="white" strokeWidth="1" />
          <line x1="46" y1="70" x2="154" y2="70" stroke="white" strokeWidth="1" />
          <line x1="48" y1="85" x2="152" y2="85" stroke="white" strokeWidth="1" />
          <line x1="50" y1="100" x2="150" y2="100" stroke="white" strokeWidth="1" />
          {/* Racket strings vertical */}
          <line x1="65" y1="10" x2="65" y2="130" stroke="white" strokeWidth="1" />
          <line x1="80" y1="8" x2="80" y2="132" stroke="white" strokeWidth="1" />
          <line x1="100" y1="6" x2="100" y2="134" stroke="white" strokeWidth="1" />
          <line x1="120" y1="8" x2="120" y2="132" stroke="white" strokeWidth="1" />
          <line x1="135" y1="10" x2="135" y2="130" stroke="white" strokeWidth="1" />
          {/* Handle */}
          <rect x="92" y="135" width="16" height="60" rx="4" fill="white" />
          <rect x="88" y="185" width="24" height="8" rx="2" fill="white" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#CCFF00]/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-emerald-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-[#CCFF00]/5 blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-[#CCFF00]/60 rounded-full top-[20%] left-[10%] animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full top-[40%] left-[20%] animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute w-2 h-2 bg-[#CCFF00]/40 rounded-full top-[60%] left-[15%] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
        <div className="absolute w-1 h-1 bg-white/30 rounded-full top-[30%] right-[40%] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute w-1.5 h-1.5 bg-[#CCFF00]/50 rounded-full top-[70%] right-[35%] animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-white/20 shadow-lg shadow-black/10">
            <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">🇳🇵 Nepal&apos;s Premier Tennis Academy</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Master the Court at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-[#e6ff66] to-[#CCFF00] inline-block animate-pulse" style={{ animationDuration: '3s' }}>
              Flash Sports Academy
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            World-class clay courts in the heart of Kathmandu. Professional coaching, 
            modern facilities, and a community of passionate players.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="volt" size="lg" href="#book-court">
              <span className="mr-2">🎾</span>
              Book Your Free Lesson
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              href="#locations"
            >
              Explore Our Courts
            </Button>
          </div>

          {/* Stats with icons */}
          <div className="flex flex-wrap gap-10 mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/20 flex items-center justify-center">
                <span className="text-2xl">🎾</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#CCFF00]">{stats.totalCourts}+</div>
                <div className="text-white/60 text-sm">Courts</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/20 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#CCFF00]">{stats.totalLocations}</div>
                <div className="text-white/60 text-sm">Locations</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/20 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#CCFF00]">{stats.activePlayers}+</div>
                <div className="text-white/60 text-sm">Active Players</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

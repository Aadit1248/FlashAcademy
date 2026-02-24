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
      {/* High-Impact Background - Tennis Court */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="w-full h-full bg-gradient-to-br from-[#1a472a] via-[#1a472a] to-[#0f2d1a]" />
        
        {/* Tennis court pattern overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%),
              linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        
        {/* Placeholder for tennis court image */}
        <div className="absolute inset-0 bg-[url('/images/tennis-court.jpg')] bg-cover bg-center opacity-30" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a472a] via-[#1a472a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a472a]/50 to-transparent" />
      </div>

      {/* Decorative tennis ball accent */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#CCFF00]/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-[#CCFF00]/5 blur-2xl" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Nepal&apos;s Premier Tennis Academy</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Master the Court at{' '}
            <span className="text-[#CCFF00] inline-block">Flash Sports Academy</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            World-class clay courts, professional coaching, and a community of passionate players. 
            Start your tennis journey today.
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
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              href="#locations"
            >
              Explore Our Courts
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-[#CCFF00]">{stats.totalCourts}+</div>
              <div className="text-white/60 text-sm">Courts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#CCFF00]">{stats.totalLocations}</div>
              <div className="text-white/60 text-sm">Locations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#CCFF00]">{stats.activePlayers}+</div>
              <div className="text-white/60 text-sm">Active Players</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

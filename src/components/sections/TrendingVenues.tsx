import { Card, CardContent } from '@/components/ui/Card';
import { getLocations } from '@/lib/payload';
import Link from 'next/link';

interface Location {
  id: string;
  name: string;
  clayCourts?: number;
  miniCourts?: number;
  address?: string;
  slug?: string;
}

export async function TrendingVenues() {
  let locations: Location[] = [];
  
  try {
    const locationsData = await getLocations({ limit: 0 });
    locations = locationsData.docs as Location[];
  } catch (error) {
    console.error('Error fetching locations:', error);
  }

  return (
    <section id="locations" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#CCFF00]/20 text-green-900 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Venues
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a472a] mb-4">Locations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our world-class tennis facilities across Kathmandu valley.
          </p>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {locations.length > 0 ? (
            locations.map((location) => (
              <VenueCard key={location.id} location={location} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-8">No locations available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function VenueCard({ location }: { location: Location }) {
  const totalCourts = (location.clayCourts || 0) + (location.miniCourts || 0);
  
  return (
    <Card className="w-full max-w-sm">
      {/* Placeholder Image with Tennis Court Graphics */}
      <div className="aspect-video bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] relative overflow-hidden">
        {/* Tennis court lines pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
          <div className="absolute top-4 bottom-4 left-4 right-4 border border-white rounded-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white rounded-full" />
        </div>
        {/* Tennis ball accent */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl">🎾</span>
        </div>
        {/* Location name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white font-semibold">{location.name}</span>
        </div>
      </div>
      <CardContent>
        <span className="inline-block bg-[#CCFF00] text-[#1a472a] text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {totalCourts} Courts
        </span>
        <h3 className="text-xl font-bold text-[#1a472a] mb-2">{location.name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {location.address || 'Kathmandu, Nepal'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[#1a472a] text-sm">
            {location.clayCourts || 0} Clay • {location.miniCourts || 0} Mini
          </span>
          <Link href={`/venues/${location.slug || location.id}`} className="text-[#1a472a] hover:text-[#CCFF00] font-semibold text-sm transition-colors">
            Book Now →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardImage, CardContent } from '@/components/ui/Card';
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

// Default venues for fallback
const defaultVenues = [
  { id: '1', name: 'SBD Pickleball', location: 'Sanepa, Bhaisepati Road', courts: '2 Courts', image: '/images/venue-1.jpg' },
  { id: '2', name: 'SBD Pickleball', location: 'Sanepa, Bhaisepati Road', courts: '3 Courts', image: '/images/venue-2.jpg' },
  { id: '3', name: 'SBD Pickleball', location: 'Sanepa, Bhaisepati Road', courts: '4 Courts', image: '/images/venue-3.jpg' },
];

export async function TrendingVenues() {
  let locations: Location[] = [];
  
  try {
    const locationsData = await getLocations({ limit: 6 });
    locations = locationsData.docs as Location[];
  } catch (error) {
    console.error('Error fetching locations:', error);
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">Trending</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Ut enim ad
            </p>
          </div>
          <Link href="/venues" className="text-green-800 font-semibold hover:text-green-900 whitespace-nowrap">
            View All →
          </Link>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.length > 0 ? (
            locations.map((location) => (
              <VenueCard key={location.id} location={location} />
            ))
          ) : (
            defaultVenues.map((venue) => (
              <VenueCardPlaceholder 
                key={venue.id} 
                name={venue.name} 
                location={venue.location}
                courts={venue.courts} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function VenueCard({ location }: { location: Location }) {
  const totalCourts = (location.clayCourts || 0) + (location.miniCourts || 0);
  
  return (
    <Card>
      <CardImage 
        src={`/images/venue-${location.id}.jpg`} 
        alt={location.name} 
      />
      <CardContent>
        <span className="inline-block bg-yellow-400 text-green-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {totalCourts} Courts
        </span>
        <h3 className="text-xl font-bold text-green-900 mb-2">{location.name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {location.address || 'Kathmandu, Nepal'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-green-800 text-sm">
            {location.clayCourts || 0} Clay • {location.miniCourts || 0} Mini
          </span>
          <Link href={`/venues/${location.slug || location.id}`} className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
            Book Now
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function VenueCardPlaceholder({ name, location, courts }: { name: string; location: string; courts: string }) {
  return (
    <Card>
      <div className="aspect-video bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/court-placeholder.jpg')] bg-cover bg-center opacity-80" />
        <span className="text-white/30 text-6xl absolute">🎾</span>
      </div>
      <CardContent>
        <span className="inline-block bg-yellow-400 text-green-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {courts}
        </span>
        <h3 className="text-xl font-bold text-green-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{location}</p>
      </CardContent>
    </Card>
  );
}

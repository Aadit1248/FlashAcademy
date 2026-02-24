import { getLocations } from '@/lib/payload';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Location {
  id: string;
  name: string;
  clayCourts?: number;
  miniCourts?: number;
  address?: string;
  slug?: string;
}

export default async function VenuesPage() {
  let locations: Location[] = [];
  
  try {
    const locationsData = await getLocations({ limit: 20 });
    locations = locationsData.docs as Location[];
  } catch (error) {
    console.error('Error fetching locations:', error);
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Our Venues</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our world-class sports facilities across multiple locations
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select className="rounded-full border border-gray-200 px-6 py-3 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/20">
                <option value="">All Locations</option>
                <option value="baluwatar">Baluwatar</option>
                <option value="budhanilkantha">Budhanilkantha</option>
              </select>
              <select className="rounded-full border border-gray-200 px-6 py-3 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/20">
                <option value="">All Court Types</option>
                <option value="clay">Clay Courts</option>
                <option value="mini">Mini Courts</option>
              </select>
              <select className="rounded-full border border-gray-200 px-6 py-3 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/20">
                <option value="">All Sports</option>
                <option value="tennis">Tennis</option>
                <option value="pickleball">Pickleball</option>
                <option value="badminton">Badminton</option>
              </select>
            </div>
            <Button variant="primary">Apply Filters</Button>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.length > 0 ? (
            locations.map((location) => (
              <Card key={location.id}>
                <CardImage
                  src={`/images/venue-${location.id}.jpg`}
                  alt={location.name}
                />
                <CardContent>
                  <div className="flex gap-2 mb-3">
                    {location.clayCourts && location.clayCourts > 0 && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {location.clayCourts} Clay
                      </span>
                    )}
                    {location.miniCourts && location.miniCourts > 0 && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {location.miniCourts} Mini
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {location.address || 'Kathmandu, Nepal'}
                  </p>
                  <Link href={`/venues/${location.slug || location.id}`}>
                    <Button variant="primary" className="w-full">
                      View & Book
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            // Placeholder venues when database is empty
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <div className="aspect-video bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center">
                    <span className="text-white/30 text-6xl">🎾</span>
                  </div>
                  <CardContent>
                    <div className="flex gap-2 mb-3">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        2 Clay
                      </span>
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        1 Mini
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">
                      Sports Venue {i}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">Kathmandu, Nepal</p>
                    <Button variant="primary" className="w-full">
                      View & Book
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Empty State */}
        {locations.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">
              Showing placeholder venues. Add locations in the admin panel to see real data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

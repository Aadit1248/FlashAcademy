import { getLocations, getUpcomingSlots } from '@/lib/payload';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { VenueFilters } from './VenueFilters';

interface Location {
  id: string;
  name: string;
  clayCourts: number;
  miniCourts: number;
  openTime: string;
  closedTime: string;
}

interface BookedSlot {
  id: string;
  location: Location | string;
  courtType: 'clay_courts' | 'mini_courts';
  startTime: string;
  endTime: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  audience: 'adults' | 'kids';
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    courtType?: string;
    sort?: string;
  }>;
}

export default async function VenuesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { search, courtType, sort } = params;
  
  let locations: Location[] = [];
  let upcomingSlots: BookedSlot[] = [];
  let totalCourts = 0;
  
  try {
    // Build where clause based on filters
    const whereClause: Record<string, unknown> = {};
    
    if (search) {
      whereClause.name = { contains: search };
    }
    
    if (courtType === 'clay') {
      whereClause.clayCourts = { greater_than: 0 };
    } else if (courtType === 'mini') {
      whereClause.miniCourts = { greater_than: 0 };
    }
    
    const locationsData = await getLocations({ 
      limit: 20,
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      sort: sort || 'name',
    });
    locations = locationsData.docs as Location[];
    
    // Calculate total courts
    totalCourts = locations.reduce((sum, loc) => 
      sum + (loc.clayCourts || 0) + (loc.miniCourts || 0), 0
    );
    
    // Get upcoming slots
    const slotsData = await getUpcomingSlots({ limit: 10 });
    upcomingSlots = slotsData.docs as BookedSlot[];
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">Our Venues</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our world-class tennis facilities across {locations.length} locations 
            with {totalCourts} courts ready for your game
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#1a472a]">{locations.length}</div>
            <div className="text-gray-600 text-sm">Locations</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#1a472a]">
              {locations.reduce((sum, loc) => sum + (loc.clayCourts || 0), 0)}
            </div>
            <div className="text-gray-600 text-sm">Clay Courts</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#1a472a]">
              {locations.reduce((sum, loc) => sum + (loc.miniCourts || 0), 0)}
            </div>
            <div className="text-gray-600 text-sm">Mini Courts</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#CCFF00]">{upcomingSlots.length}</div>
            <div className="text-gray-600 text-sm">Upcoming Sessions</div>
          </div>
        </div>

        {/* Filter Bar */}
        <VenueFilters 
          locations={locations}
          currentSearch={search}
          currentCourtType={courtType}
          currentSort={sort}
        />

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.length > 0 ? (
            locations.map((location) => (
              <Card key={location.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {/* Venue Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] relative flex items-center justify-center">
                  <span className="text-6xl opacity-30">🎾</span>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {location.clayCourts > 0 && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {location.clayCourts} Clay
                      </span>
                    )}
                    {location.miniCourts > 0 && (
                      <span className="bg-[#CCFF00] text-[#1a472a] text-xs font-bold px-3 py-1 rounded-full">
                        {location.miniCourts} Mini
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#1a472a] mb-2">
                    {location.name}
                  </h3>
                  
                  {/* Operating Hours */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {location.openTime && location.closedTime
                        ? `${formatTime(location.openTime)} - ${formatTime(location.closedTime)}`
                        : 'Hours not set'}
                    </span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Kathmandu, Nepal</span>
                  </div>

                  {/* Total Courts */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Total Courts</div>
                    <div className="text-2xl font-bold text-[#1a472a]">
                      {(location.clayCourts || 0) + (location.miniCourts || 0)}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/venues/${location.id}`} className="flex-1">
                      <Button variant="primary" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/availability?location=${location.id}`}>
                      <Button variant="outline" className="px-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Placeholder venues when database is empty or no results
            <>
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🎾</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {search || courtType ? 'No venues match your filters' : 'No venues yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {search || courtType 
                    ? 'Try adjusting your search or filters'
                    : 'Add locations in the admin panel to see them here'}
                </p>
                {(search || courtType) && (
                  <Link href="/venues">
                    <Button variant="outline">Clear Filters</Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>

        {/* Upcoming Sessions Preview */}
        {upcomingSlots.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a472a]">Upcoming Sessions</h2>
              <Link href="/availability">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingSlots.slice(0, 6).map((slot) => {
                const locationName = typeof slot.location === 'object' 
                  ? slot.location.name 
                  : 'Unknown Location';
                const startDate = new Date(slot.startTime);
                
                return (
                  <div key={slot.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1a472a]">{locationName}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        slot.level === 'beginner' 
                          ? 'bg-green-100 text-green-700'
                          : slot.level === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {slot.level}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {startDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {startDate.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        slot.courtType === 'clay_courts' 
                          ? 'bg-orange-50 text-orange-600' 
                          : 'bg-lime-50 text-lime-600'
                      }`}>
                        {slot.courtType === 'clay_courts' ? 'Clay' : 'Mini'}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 capitalize">{slot.audience}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

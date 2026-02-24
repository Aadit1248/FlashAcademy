import { getLocations, getBookedSlots } from '@/lib/payload';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';

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
  price: number;
  phoneNumber: string;
}

// Level badge colors
function getLevelBadge(level: string) {
  const styles: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };
  
  const labels: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[level] || styles.beginner}`}>
      {labels[level] || level}
    </span>
  );
}

// Court type badge
function getCourtBadge(courtType: string) {
  const isClay = courtType === 'clay_courts';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
      isClay ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
    }`}>
      {isClay ? '🎾 Clay Court' : '🏸 Mini Court'}
    </span>
  );
}

// Format time display
function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Default slots for display when database is empty
const defaultSlots = [
  { id: '1', locationName: 'Baluwatar Tennis Club', courtType: 'clay_courts' as const, startTime: '2026-02-24T06:00:00', endTime: '2026-02-24T07:00:00', level: 'beginner' as const },
  { id: '2', locationName: 'Baluwatar Tennis Club', courtType: 'clay_courts' as const, startTime: '2026-02-24T07:00:00', endTime: '2026-02-24T08:00:00', level: 'intermediate' as const },
  { id: '3', locationName: 'Baluwatar Tennis Club', courtType: 'mini_courts' as const, startTime: '2026-02-24T16:00:00', endTime: '2026-02-24T17:00:00', level: 'beginner' as const },
  { id: '4', locationName: 'Budhanilkantha Sports Complex', courtType: 'clay_courts' as const, startTime: '2026-02-24T08:00:00', endTime: '2026-02-24T09:00:00', level: 'advanced' as const },
  { id: '5', locationName: 'Budhanilkantha Sports Complex', courtType: 'clay_courts' as const, startTime: '2026-02-24T09:00:00', endTime: '2026-02-24T10:00:00', level: 'intermediate' as const },
  { id: '6', locationName: 'Budhanilkantha Sports Complex', courtType: 'mini_courts' as const, startTime: '2026-02-24T17:00:00', endTime: '2026-02-24T18:00:00', level: 'beginner' as const },
];

interface PageProps {
  searchParams: Promise<{
    location?: string;
    level?: string;
    courtType?: string;
  }>;
}

export default async function AvailabilityPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { location: locationFilter, level: levelFilter, courtType: courtTypeFilter } = params;
  
  let bookedSlots: BookedSlot[] = [];
  let locations: Location[] = [];
  let selectedLocation: Location | null = null;

  try {
    // Build where clause for filtering
    const whereClause: Record<string, unknown> = {};
    
    if (locationFilter) {
      whereClause.location = { equals: locationFilter };
    }
    if (levelFilter) {
      whereClause.level = { equals: levelFilter };
    }
    if (courtTypeFilter) {
      whereClause.courtType = { equals: courtTypeFilter };
    }

    const [slotsData, locationsData] = await Promise.all([
      getBookedSlots({ 
        limit: 50,
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        sort: 'startTime',
      }),
      getLocations({ limit: 20 }),
    ]);
    bookedSlots = slotsData.docs as BookedSlot[];
    locations = locationsData.docs as Location[];
    
    // Get selected location details
    if (locationFilter) {
      selectedLocation = locations.find(l => l.id === locationFilter) || null;
    }
  } catch (error) {
    console.error('Error fetching availability data:', error);
  }

  // Create a map of location IDs to names
  const locationMap = new Map(locations.map((loc) => [loc.id, loc.name]));

  // Process slots for display
  const displaySlots = bookedSlots.length > 0
    ? bookedSlots.map((slot) => ({
        id: slot.id,
        locationName: typeof slot.location === 'string' 
          ? locationMap.get(slot.location) || 'Unknown Location'
          : slot.location?.name || 'Unknown Location',
        courtType: slot.courtType,
        startTime: slot.startTime,
        endTime: slot.endTime,
        level: slot.level,
      }))
    : defaultSlots;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#CCFF00]/20 text-[#1a472a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Court Schedule
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a472a] mb-4">
            {selectedLocation ? `Availability at ${selectedLocation.name}` : 'Availability'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {selectedLocation 
              ? `View all available slots at ${selectedLocation.name}`
              : 'Check court availability across all our locations and book your preferred slot'}
          </p>
          {selectedLocation && (
            <a 
              href="/availability" 
              className="inline-flex items-center gap-2 mt-4 text-[#1a472a] hover:text-[#CCFF00] transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear location filter
            </a>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select className="rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#1a472a] focus:ring-2 focus:ring-[#1a472a]/20">
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
                {locations.length === 0 && (
                  <>
                    <option value="baluwatar">Baluwatar Tennis Club</option>
                    <option value="budhanilkantha">Budhanilkantha Sports Complex</option>
                  </>
                )}
              </select>
              <select className="rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#1a472a] focus:ring-2 focus:ring-[#1a472a]/20">
                <option value="">All Court Types</option>
                <option value="clay_courts">Clay Courts</option>
                <option value="mini_courts">Mini Courts</option>
              </select>
              <select className="rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#1a472a] focus:ring-2 focus:ring-[#1a472a]/20">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <input
                type="date"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#1a472a] focus:ring-2 focus:ring-[#1a472a]/20"
                defaultValue="2026-02-24"
              />
            </div>
            <Button variant="volt" size="sm">
              Search Available Slots
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Level:</span>
          </div>
          <div className="flex items-center gap-2">
            {getLevelBadge('beginner')}
            <span className="text-xs text-gray-500">New players</span>
          </div>
          <div className="flex items-center gap-2">
            {getLevelBadge('intermediate')}
            <span className="text-xs text-gray-500">Some experience</span>
          </div>
          <div className="flex items-center gap-2">
            {getLevelBadge('advanced')}
            <span className="text-xs text-gray-500">Competitive</span>
          </div>
        </div>

        {/* Table - Horizontal scroll on mobile */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="pb-4">
                {bookedSlots.length === 0 
                  ? 'Showing sample availability. Real data will appear once slots are added.'
                  : `Showing ${displaySlots.length} available slots`
                }
              </TableCaption>
              <TableHeader className="bg-[#1a472a]">
                <TableRow className="border-0 hover:bg-[#1a472a]">
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[180px]">
                    Location
                  </TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[140px]">
                    Court Type
                  </TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px]">
                    Date
                  </TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[140px]">
                    Timing
                  </TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[120px]">
                    Level
                  </TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px] text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displaySlots.map((slot, index) => (
                  <TableRow 
                    key={slot.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  >
                    <TableCell className="font-medium text-[#1a472a] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#CCFF00] rounded-full" />
                        {slot.locationName}
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getCourtBadge(slot.courtType)}
                    </TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">
                      {formatDate(slot.startTime)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getLevelBadge(slot.level)}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button variant="primary" size="sm" href="/book">
                        Book Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-[#1a472a]">{locations.length || 2}</div>
            <div className="text-gray-600 text-sm">Locations</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-[#CCFF00]">{displaySlots.length}</div>
            <div className="text-gray-600 text-sm">Available Slots</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-[#1a472a]">6+</div>
            <div className="text-gray-600 text-sm">Clay Courts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-[#1a472a]">3+</div>
            <div className="text-gray-600 text-sm">Mini Courts</div>
          </div>
        </div>
      </div>
    </div>
  );
}

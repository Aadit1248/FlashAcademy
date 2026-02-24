import { getLocationById, getBookedSlotsByLocation } from '@/lib/payload';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VenueDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let location: Location | null = null;
  let slots: BookedSlot[] = [];
  
  try {
    location = await getLocationById(id) as Location;
    const slotsData = await getBookedSlotsByLocation(id, { limit: 20 });
    slots = slotsData.docs as BookedSlot[];
  } catch (error) {
    console.error('Error fetching venue:', error);
    notFound();
  }

  if (!location) {
    notFound();
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const totalCourts = (location.clayCourts || 0) + (location.miniCourts || 0);
  
  // Separate upcoming and past slots
  const now = new Date();
  const upcomingSlots = slots.filter(s => new Date(s.startTime) > now);
  
  // Group by court type
  const claySlots = upcomingSlots.filter(s => s.courtType === 'clay_courts');
  const miniSlots = upcomingSlots.filter(s => s.courtType === 'mini_courts');

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] text-white">
        <div className="container mx-auto px-6 py-16">
          <Link href="/venues" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Venues
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{location.name}</h1>
              <div className="flex items-center gap-4 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {location.openTime && location.closedTime
                      ? `${formatTime(location.openTime)} - ${formatTime(location.closedTime)}`
                      : 'Hours not set'}
                  </span>
                </div>
              </div>
              
              {/* Court Type Badges */}
              <div className="flex gap-3 mb-6">
                {location.clayCourts > 0 && (
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                    {location.clayCourts} Clay Courts
                  </span>
                )}
                {location.miniCourts > 0 && (
                  <span className="bg-[#CCFF00] text-[#1a472a] px-4 py-2 rounded-full font-semibold">
                    {location.miniCourts} Mini Courts
                  </span>
                )}
              </div>
              
              <Button href={`/availability?location=${location.id}`} variant="volt" className="text-lg px-8 py-4">
                Check Availability & Book
              </Button>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[280px]">
              <h3 className="text-lg font-semibold mb-4">Venue Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Courts</span>
                  <span className="text-2xl font-bold">{totalCourts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Upcoming Sessions</span>
                  <span className="text-2xl font-bold">{upcomingSlots.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Clay Bookings</span>
                  <span className="text-2xl font-bold">{claySlots.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Mini Bookings</span>
                  <span className="text-2xl font-bold">{miniSlots.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Court Types */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-[#1a472a]">Court Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clay Courts Card */}
              {location.clayCourts > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-2xl">🏟️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a472a]">Clay Courts</h3>
                      <p className="text-sm text-gray-500">{location.clayCourts} available</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Professional-grade surface
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Ideal for training
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      NPR 12,000/month (Adults)
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Mini Courts Card */}
              {location.miniCourts > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center">
                      <span className="text-2xl">🎾</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a472a]">Mini Courts</h3>
                      <p className="text-sm text-gray-500">{location.miniCourts} available</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Perfect for beginners
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Kids-friendly
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      NPR 1,000/hour (Kids)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Upcoming Sessions */}
            {upcomingSlots.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1a472a] mb-6">Upcoming Sessions</h2>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date & Time</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Court</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Level</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Audience</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {upcomingSlots.slice(0, 10).map((slot) => {
                          const startDate = new Date(slot.startTime);
                          const endDate = new Date(slot.endTime);
                          
                          return (
                            <tr key={slot.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="font-medium text-[#1a472a]">
                                  {startDate.toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - 
                                  {endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  slot.courtType === 'clay_courts' 
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-lime-100 text-lime-700'
                                }`}>
                                  {slot.courtType === 'clay_courts' ? 'Clay' : 'Mini'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  slot.level === 'beginner'
                                    ? 'bg-green-100 text-green-700'
                                    : slot.level === 'intermediate'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {slot.level.charAt(0).toUpperCase() + slot.level.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 capitalize text-gray-600">
                                {slot.audience}
                              </td>
                              <td className="px-6 py-4 font-semibold text-[#1a472a]">
                                NPR {slot.price.toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  
                  {upcomingSlots.length > 10 && (
                    <div className="px-6 py-4 bg-gray-50 border-t">
                      <Link href={`/availability?location=${location.id}`}>
                        <Button variant="outline" className="w-full">
                          View All {upcomingSlots.length} Sessions
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Book Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-lg font-bold text-[#1a472a] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button href={`/availability?location=${location.id}`} variant="volt" className="w-full">
                  Check Availability
                </Button>
                <Button href="/contact" variant="outline" className="w-full">
                  Contact Venue
                </Button>
              </div>
              
              <hr className="my-6" />
              
              <h4 className="font-semibold text-gray-700 mb-3">Operating Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday - Sunday</span>
                  <span className="font-medium">
                    {location.openTime && location.closedTime
                      ? `${formatTime(location.openTime)} - ${formatTime(location.closedTime)}`
                      : 'Hours not set'}
                  </span>
                </div>
              </div>
              
              <hr className="my-6" />
              
              <h4 className="font-semibold text-gray-700 mb-3">Pricing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Adults (Morning)</span>
                  <span className="font-medium">NPR 12,000/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Kids (Evening)</span>
                  <span className="font-medium">NPR 1,000/hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

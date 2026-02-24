import { getLocations } from '@/lib/payload';
import { BookingForm } from './BookingForm';

interface Location {
  id: string;
  name: string;
  clayCourts: number;
  miniCourts: number;
}

export async function FindVenue() {
  let locations: Location[] = [];

  try {
    const locationsData = await getLocations({ limit: 0 });
    locations = locationsData.docs as Location[];
  } catch (error) {
    console.error('Error fetching locations:', error);
  }

  return (
    <section id="book-court" className="py-16 bg-white -mt-16 relative z-30 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-5xl mx-auto border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1a472a]/5 rounded-full blur-2xl" />

          {/* Header */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center">
                <span className="text-xl">🎾</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1a472a]">Book Your Court</h2>
            </div>
            <p className="text-gray-500 ml-13">Reserve your slot and start playing today!</p>
          </div>
          
          <BookingForm locations={locations} />
        </div>
      </div>
    </section>
  );
}

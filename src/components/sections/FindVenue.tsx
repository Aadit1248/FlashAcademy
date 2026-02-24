import { Button } from '@/components/ui/Button';

const sports = ['Tennis', 'Pickleball', 'Badminton', 'Cricket'];
const locations = ['Baluwatar', 'Budhanilkantha'];

export function FindVenue() {
  return (
    <section className="py-16 bg-white -mt-16 relative z-30">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-100">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Find Venue</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/20">
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sport */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sport
              </label>
              <select className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/20">
                <option value="">Select Sport</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input 
                type="date" 
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/20"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input 
                type="time" 
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/20"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                <SearchIcon className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

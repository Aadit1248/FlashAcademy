import { getEvents } from '@/lib/payload';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;
}

export async function Events() {
  let events: Event[] = [];
  
  try {
    const eventsData = await getEvents({ limit: 0 });
    events = eventsData.docs as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  // Sort events by start time
  const sortedEvents = events.sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(e => new Date(e.endTime) >= now);
  const pastEvents = sortedEvents.filter(e => new Date(e.endTime) < now).slice(0, 3);

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden scroll-mt-16">
      {/* Light Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle color orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CCFF00]/20 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#1a472a]/5 rounded-full blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(26,71,42,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(26,71,42,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with Trophy Icon */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] rounded-2xl mb-6 shadow-2xl shadow-orange-500/30">
            <span className="text-4xl">🏆</span>
          </div>
          <span className="block text-[#1a472a] text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Tournaments & Championships
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a472a] mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join prestigious tournaments and compete with the best players in Nepal.
          </p>
        </div>

        {/* Featured Event - World Cup Style */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <FeaturedEventCard event={upcomingEvents[0]} />
          </div>
        )}

        {/* Other Upcoming Events Grid */}
        {upcomingEvents.length > 1 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-[#1a472a] mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#1a472a] rounded-full" />
              More Tournaments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(1).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* No Events Placeholder */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a472a]/10 flex items-center justify-center">
              <span className="text-5xl opacity-50">🎾</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1a472a] mb-2">No Upcoming Events</h3>
            <p className="text-gray-500 mb-6">Stay tuned for exciting tournaments coming soon!</p>
            <Button variant="volt" href="#book-court">
              Book a Practice Session
            </Button>
          </div>
        )}

        {/* Past Events - Trophy Wall Style */}
        {pastEvents.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-500 mb-6 flex items-center gap-3">
              <span className="text-2xl">📜</span>
              Past Championships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pastEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedEventCard({ event }: { event: Event }) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate days until event
  const daysUntil = Math.ceil((startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isToday = daysUntil === 0;
  const isTomorrow = daysUntil === 1;

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#1a472a]/20 via-[#CCFF00]/30 to-[#1a472a]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-gradient-to-br from-[#0d2818] to-[#1a472a] rounded-3xl overflow-hidden border border-[#CCFF00]/20 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Event Visual */}
          <div className="relative h-64 lg:h-auto min-h-[300px]">
            {/* Background pattern or image */}
            {event.imageUrl ? (
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a472a] via-[#2d5a3d] to-[#1a472a]">
                {/* Tennis court pattern */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    {/* Court outline */}
                    <rect x="50" y="30" width="300" height="240" stroke="white" strokeWidth="2" fill="none" />
                    {/* Service boxes */}
                    <line x1="200" y1="30" x2="200" y2="270" stroke="white" strokeWidth="1" />
                    <line x1="50" y1="150" x2="350" y2="150" stroke="white" strokeWidth="2" />
                    <rect x="100" y="80" width="200" height="140" stroke="white" strokeWidth="1" fill="none" />
                    <line x1="200" y1="80" x2="200" y2="220" stroke="white" strokeWidth="1" />
                  </svg>
                </div>
                {/* Trophy icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] opacity-20">🏆</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d2818] lg:to-[#0d2818]" />
            
            {/* Live/Upcoming Badge */}
            <div className="absolute top-6 left-6">
              {isToday ? (
                <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  LIVE TODAY
                </div>
              ) : isTomorrow ? (
                <div className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  <span>⏰</span>
                  TOMORROW
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-[#CCFF00] text-[#1a472a] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  <span>📅</span>
                  {daysUntil} DAYS LEFT
                </div>
              )}
            </div>
          </div>

          {/* Right - Event Details */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            {/* Category tag */}
            <div className="flex items-center gap-2 text-[#CCFF00] text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="w-6 h-[2px] bg-[#CCFF00]" />
              Featured Tournament
            </div>

            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              {event.title}
            </h3>

            {event.description && (
              <p className="text-gray-400 mb-6 line-clamp-2">
                {event.description}
              </p>
            )}

            {/* Date & Time Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Date</div>
                <div className="text-white font-bold text-lg">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Start Time</div>
                <div className="text-white font-bold text-lg">
                  {formatTime(startDate)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const startDate = new Date(event.startTime);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="group relative bg-gradient-to-br from-[#0d2818] to-[#1a472a] rounded-2xl overflow-hidden border border-[#CCFF00]/20 hover:border-[#CCFF00]/40 hover:shadow-xl hover:shadow-[#CCFF00]/10 transition-all duration-300">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a472a] via-[#CCFF00] to-[#1a472a]" />
      
      <div className="p-6">
        {/* Date badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#CCFF00] text-xs font-bold tracking-wider">
            <span>📅</span>
            {formatDate(startDate)}
          </div>
          <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-lg">
            🎾
          </div>
        </div>

        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">
          {event.title}
        </h4>

        {event.description && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

function PastEventCard({ event }: { event: Event }) {
  const endDate = new Date(event.endTime);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#0d2818] to-[#1a472a] rounded-xl border border-[#CCFF00]/20 opacity-80 hover:opacity-100 transition-opacity">
      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">🥇</span>
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-white font-semibold truncate">{event.title}</h5>
        <p className="text-gray-400 text-sm">{formatDate(endDate)}</p>
      </div>
    </div>
  );
}

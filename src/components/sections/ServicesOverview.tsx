import { getServices } from '@/lib/payload';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Service {
  id: string;
  sessionType: string;
  targetAudience: 'adults' | 'kids';
  price: number;
  billingUnit: 'month' | 'hour';
}

// Icon mapping for services
function getServiceIcon(sessionType: string, audience: string) {
  const type = sessionType.toLowerCase();
  if (type.includes('coaching') || type.includes('lesson')) return '🎓';
  if (type.includes('tournament') || type.includes('match')) return '🏆';
  if (type.includes('group') || type.includes('class')) return '👥';
  if (audience === 'kids') return '🧒';
  if (audience === 'adults') return '🎾';
  return '⚡';
}

// Default services when database is empty
const defaultServices: Service[] = [
  { id: '1', sessionType: 'Adult Morning Training', targetAudience: 'adults', price: 12000, billingUnit: 'month' },
  { id: '2', sessionType: 'Kids Evening Coaching', targetAudience: 'kids', price: 1000, billingUnit: 'hour' },
  { id: '3', sessionType: 'Private Lessons', targetAudience: 'adults', price: 2500, billingUnit: 'hour' },
];

export async function ServicesOverview() {
  let services: Service[] = [];

  try {
    const servicesData = await getServices({ limit: 0 });
    services = servicesData.docs as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
  }

  // Use default services if none found
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 bg-white scroll-mt-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#CCFF00]/20 text-green-900 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a472a] mb-4">
            Overview of Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From beginner lessons to competitive training, we have programs designed for every skill level and age group.
          </p>
        </div>

        {/* Services Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const icon = getServiceIcon(service.sessionType, service.targetAudience);
  const audienceLabel = service.targetAudience === 'adults' ? 'Adults' : 'Kids';
  const audienceColor = service.targetAudience === 'adults' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800';

  return (
    <Card className="group relative overflow-hidden border border-gray-100 hover:border-[#CCFF00]/50" hover={false}>
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a472a] to-[#CCFF00]" />
      
      <CardContent className="p-8">
        {/* Icon */}
        <div className="w-16 h-16 bg-[#1a472a] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-[#CCFF00] group-hover:scale-110 transition-all duration-300">
          <span className="group-hover:scale-110 transition-transform">{icon}</span>
        </div>

        {/* Audience Badge */}
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${audienceColor}`}>
          {audienceLabel}
        </span>

        {/* Service Name */}
        <h3 className="text-xl font-bold text-[#1a472a] mb-3 group-hover:text-[#1a472a]">
          {service.sessionType}
        </h3>

        {/* Description placeholder */}
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {service.targetAudience === 'adults' 
            ? 'Professional training designed for adult players looking to improve their game.'
            : 'Fun and engaging sessions designed specifically for young players.'}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl font-bold text-[#1a472a]">
            NPR {service.price.toLocaleString()}
          </span>
          <span className="text-gray-500">/{service.billingUnit}</span>
        </div>

        {/* CTA */}
        <Button variant="secondary" className="w-full" href="/book">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}

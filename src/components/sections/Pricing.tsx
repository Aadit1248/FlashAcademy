import { Button } from '@/components/ui/Button';
import { getServices } from '@/lib/payload';

interface Service {
  id: string;
  sessionType: string;
  targetAudience: 'adults' | 'kids';
  price: number;
  billingUnit: 'month' | 'hour';
}

// Feature sets based on audience type
const featuresByAudience = {
  adults: [
    'Professional coaching',
    'Premium court access',
    'Locker facilities',
    'Tournament eligibility',
  ],
  kids: [
    'Age-appropriate training',
    'Equipment provided',
    'Fun group sessions',
    'Progress certificates',
  ],
};

// Icons based on session type
function getServiceIcon(sessionType: string, audience: string) {
  const type = sessionType.toLowerCase();
  if (type.includes('private') || type.includes('personal')) return '👤';
  if (type.includes('group') || type.includes('class')) return '👥';
  if (type.includes('tournament') || type.includes('competition')) return '🏆';
  if (audience === 'kids') return '⭐';
  return '🎾';
}

export async function Pricing() {
  let services: Service[] = [];

  try {
    const servicesData = await getServices({ limit: 0 });
    services = servicesData.docs as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
  }

  // Find the "most popular" - highest priced monthly plan
  const popularService = services.reduce((prev, curr) => {
    if (curr.billingUnit === 'month' && (!prev || curr.price > prev.price)) {
      return curr;
    }
    return prev;
  }, null as Service | null);

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-[#0f2d1a] via-[#1a472a] to-[#0f2d1a] relative overflow-hidden scroll-mt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#CCFF00]/5 rounded-full blur-[120px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#CCFF00]/20 text-[#CCFF00] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your Plan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Flexible pricing options for every player. Start your tennis journey today.
          </p>
        </div>

        {/* Pricing Cards */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {services.map((service) => (
              <PricingCard 
                key={service.id} 
                service={service} 
                isPopular={popularService?.id === service.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No pricing plans available yet.</p>
        )}

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <span className="text-[#CCFF00]">💡</span>
            <span className="text-gray-300 text-sm">
              All plans include access to our world-class clay courts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ service, isPopular }: { service: Service; isPopular: boolean }) {
  const icon = getServiceIcon(service.sessionType, service.targetAudience);
  const features = featuresByAudience[service.targetAudience];
  const audienceLabel = service.targetAudience === 'adults' ? 'Adults' : 'Kids';
  
  return (
    <div className={`group relative w-full max-w-sm ${isPopular ? 'lg:-mt-4 lg:mb-4' : ''}`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#CCFF00] text-[#1a472a] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            ⭐ MOST POPULAR
          </div>
        </div>
      )}

      {/* Card */}
      <div className={`relative bg-gradient-to-b ${isPopular ? 'from-[#CCFF00]/10 to-white/5' : 'from-white/10 to-white/5'} backdrop-blur-sm rounded-3xl overflow-hidden border ${isPopular ? 'border-[#CCFF00]/50' : 'border-white/10'} hover:border-[#CCFF00]/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:-translate-y-1`}>
        
        {/* Top Section */}
        <div className="p-8 pb-6">
          {/* Icon & Audience */}
          <div className="flex items-center justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl ${isPopular ? 'bg-[#CCFF00]' : 'bg-white/10'} flex items-center justify-center text-2xl shadow-lg`}>
              {icon}
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              service.targetAudience === 'adults' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {audienceLabel}
            </span>
          </div>

          {/* Service Name */}
          <h3 className="text-xl font-bold text-white mb-2">
            {service.sessionType}
          </h3>
          
          {/* Price */}
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-sm text-gray-400">NPR</span>
            <span className={`text-4xl font-black ${isPopular ? 'text-[#CCFF00]' : 'text-white'}`}>
              {service.price.toLocaleString()}
            </span>
            <span className="text-gray-400">/{service.billingUnit}</span>
          </div>

          {/* Billing Info */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Billed {service.billingUnit === 'month' ? 'monthly' : 'per session'}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Features Section */}
        <div className="p-8 pt-6">
          <ul className="space-y-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full ${isPopular ? 'bg-[#CCFF00]' : 'bg-white/20'} flex items-center justify-center flex-shrink-0`}>
                  <CheckIcon className={`w-3 h-3 ${isPopular ? 'text-[#1a472a]' : 'text-white'}`} />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button
            variant={isPopular ? 'volt' : 'outline'}
            className={`w-full ${!isPopular ? 'border-white/30 text-white hover:bg-white/10' : ''}`}
            href="/book"
          >
            Get Started
          </Button>
        </div>

        {/* Decorative glow for popular */}
        {isPopular && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#CCFF00]/5 to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

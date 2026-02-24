import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const pricingPlans = [
  {
    name: 'Kids Coaching',
    price: 'NPR 1,000',
    period: '/hour',
    description: 'Evening sessions for young players',
    features: [
      'Professional coaching',
      'Equipment provided',
      'Small group sessions',
      'Progress tracking',
    ],
    highlight: false,
  },
  {
    name: 'Adult Monthly',
    price: 'NPR 12,000',
    period: '/month',
    description: 'Morning sessions for adults',
    features: [
      'Unlimited court access',
      'Morning slots (6-10 AM)',
      'Locker facilities',
      'Tournament participation',
    ],
    highlight: true,
  },
  {
    name: 'Court Rental',
    price: 'NPR 1,500',
    period: '/hour',
    description: 'Book courts for private games',
    features: [
      'Clay court access',
      'Equipment rental available',
      'Lighting included',
      'Online booking',
    ],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Select Your Plan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your sports journey. Flexible options for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`${plan.highlight ? 'ring-2 ring-yellow-400 scale-105 relative' : ''}`}
              hover={false}
            >
              {plan.highlight && (
                <div className="bg-yellow-400 text-green-900 text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-green-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-green-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-600">
                      <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  className="w-full"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

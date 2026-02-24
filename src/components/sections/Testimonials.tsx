const testimonials = [
  {
    id: 1,
    name: 'Lucas Hernandez',
    role: 'Tennis Player',
    content: 'Amazing courts! The best playing experience I\'ve ever had. The facilities are top-notch.',
    avatar: 'L',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    role: 'Pickleball Enthusiast',
    content: 'Love the booking system. So easy to find and reserve courts. Highly recommend!',
    avatar: 'M',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-green-900 relative overflow-hidden scroll-mt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Customers Are Saying About Us.
            </h2>

            {/* Testimonial Cards */}
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <p className="text-white mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-green-200 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Right Image - Player */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] flex items-end justify-center">
              {/* Decorative shape */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-green-800 rounded-full opacity-50" />
              
              {/* Player silhouette placeholder */}
              <div className="relative z-10 w-72 h-96 bg-gradient-to-t from-green-800 to-transparent rounded-t-full flex items-center justify-center">
                <span className="text-8xl opacity-30">🎾</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

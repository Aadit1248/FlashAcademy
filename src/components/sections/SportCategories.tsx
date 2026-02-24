const sports = [
  { name: 'Tennis', icon: '🎾', color: 'from-[#CCFF00] to-[#9dcc00]', description: 'Master the clay courts' },
  { name: 'Pickleball', icon: '🏓', color: 'from-emerald-400 to-emerald-600', description: 'Fast-paced fun for all' },
  { name: 'Badminton', icon: '🏸', color: 'from-sky-400 to-sky-600', description: 'Agility and precision' },
];

export function SportCategories() {
  return (
    <section id="sports" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden scroll-mt-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a472a 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#1a472a]/10 text-[#1a472a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a472a] mb-4">
            Take Your Game To The Next Level
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from a variety of sports and find the perfect court for your game. 
            Our facilities are designed to help you excel.
          </p>
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sports.map((sport, index) => (
            <div
              key={sport.name}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#CCFF00]/50 overflow-hidden h-full">
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Decorative corner accent */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${sport.color} rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500`} />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${sport.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {sport.icon}
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1a472a] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-[#CCFF00] text-xs font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[#1a472a] mb-2 group-hover:text-[#1a472a] transition-colors">
                  {sport.name}
                </h3>
                <p className="text-gray-500 mb-6">
                  {sport.description}
                </p>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-[#1a472a] font-semibold group-hover:text-[#1a472a] transition-colors">
                  <span>Explore</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${sport.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-[#1a472a] rounded-full pl-6 pr-2 py-2 shadow-xl hover:shadow-2xl transition-shadow">
            <span className="text-white font-medium">Ready to start your journey?</span>
            <button className="bg-[#CCFF00] text-[#1a472a] font-bold px-6 py-3 rounded-full hover:bg-[#d4ff1a] transition-colors">
              Book a Court
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

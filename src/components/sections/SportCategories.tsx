const sports = [
  { name: 'Cricket', icon: '🏏', color: 'from-orange-400 to-orange-500' },
  { name: 'Pickleball', icon: '🏓', color: 'from-green-400 to-green-500' },
  { name: 'Tennis', icon: '🎾', color: 'from-yellow-400 to-yellow-500' },
  { name: 'Badminton', icon: '🏸', color: 'from-blue-400 to-blue-500' },
];

export function SportCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-green-900 mb-6">
              Take Your Game To The Next Level
            </h2>
            <p className="text-gray-600 mb-8">
              Choose from a variety of sports and find the perfect court for your game. Our facilities are designed to help you improve and enjoy every moment on the court.
            </p>
            
            {/* Sport Pills */}
            <div className="flex flex-wrap gap-4">
              {sports.map((sport) => (
                <button
                  key={sport.name}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-green-800 rounded-full hover:bg-green-50 transition-colors group"
                >
                  <span className="text-2xl">{sport.icon}</span>
                  <span className="font-semibold text-green-900">{sport.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Circular Sport Icons */}
          <div className="relative h-96 hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Circular arrangement of sport icons */}
              <div className="relative w-80 h-80">
                {sports.map((sport, index) => {
                  const angle = (index * 90 - 45) * (Math.PI / 180);
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={sport.name}
                      className="absolute w-24 h-24 rounded-full bg-gradient-to-br shadow-lg flex items-center justify-center text-4xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                      }}
                    >
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${sport.color} flex items-center justify-center`}>
                        {sport.icon}
                      </div>
                    </div>
                  );
                })}
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-green-900 flex items-center justify-center shadow-xl">
                  <span className="text-yellow-400 text-3xl">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

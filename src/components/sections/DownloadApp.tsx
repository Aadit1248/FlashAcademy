import { Button } from '@/components/ui/Button';

export function DownloadApp() {
  return (
    <section id="app" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden scroll-mt-16">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CCFF00]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1a472a]/10 rounded-full blur-[120px]" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #1a472a 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/30 to-[#1a472a]/20 rounded-[4rem] blur-3xl scale-110" />
              
              {/* Phone mockup */}
              <div className="relative w-72 h-[580px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                {/* Phone frame */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
                
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-br from-[#1a472a] via-[#1f5233] to-[#1a472a] rounded-[2.5rem] overflow-hidden relative">
                  {/* App UI Preview */}
                  <div className="absolute inset-0 p-6 flex flex-col">
                    {/* Status bar */}
                    <div className="flex justify-between items-center text-white/60 text-xs mb-8 mt-6">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-[#CCFF00] rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-[#1a472a] font-black text-xl">F</span>
                      </div>
                      <div>
                        <div className="text-white font-bold">Flash Sports</div>
                        <div className="text-[#CCFF00] text-xs">Academy</div>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                        <span className="text-2xl mb-2 block">🎾</span>
                        <span className="text-white text-xs">Book Court</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                        <span className="text-2xl mb-2 block">📅</span>
                        <span className="text-white text-xs">Schedule</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                        <span className="text-2xl mb-2 block">🏆</span>
                        <span className="text-white text-xs">Events</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                        <span className="text-2xl mb-2 block">👤</span>
                        <span className="text-white text-xs">Profile</span>
                      </div>
                    </div>
                    
                    {/* Preview Card */}
                    <div className="bg-[#CCFF00] rounded-2xl p-4 mt-auto mb-4">
                      <div className="text-[#1a472a] font-bold text-sm mb-1">Next Session</div>
                      <div className="text-[#1a472a]/70 text-xs">Morning Training • 6:00 AM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#CCFF00] rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <span className="text-2xl">🎾</span>
              </div>
              <div className="absolute -bottom-2 -left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100">
                <span className="text-xl">📱</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative z-10 order-1 lg:order-2">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-[#CCFF00]/20 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#CCFF00]"></span>
              </span>
              <span className="text-[#1a472a] text-sm font-semibold">Coming Soon</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#1a472a] mb-6 leading-tight">
              Your Tennis Journey,<br />
              <span className="text-[#1a472a]/60">In Your Pocket</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
              We&apos;re building something special. Book courts, track your progress, 
              join tournaments, and connect with fellow players — all from one app.
            </p>
            
            {/* Feature List */}
            <div className="space-y-4 mb-10">
              {[
                { icon: '⚡', text: 'Instant court booking' },
                { icon: '📊', text: 'Track your game statistics' },
                { icon: '🏆', text: 'Join exclusive tournaments' },
                { icon: '👥', text: 'Connect with players' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#1a472a]/5 rounded-xl flex items-center justify-center">
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Notify Form */}
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 max-w-md">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
                />
                <Button variant="volt" className="px-6 whitespace-nowrap">
                  Notify Me
                </Button>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Be the first to know when we launch. No spam, we promise! 🤞
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

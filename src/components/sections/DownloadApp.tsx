import { Button } from '@/components/ui/Button';

export function DownloadApp() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Phone Mockup & Player */}
          <div className="relative">
            <div className="relative z-10 flex items-end justify-center">
              {/* Phone mockup placeholder */}
              <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-full" />
                <div className="absolute inset-4 top-12 bg-gradient-to-br from-green-600 to-green-800 rounded-[2rem] flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                    <span className="text-green-900 font-bold text-2xl">K</span>
                  </div>
                  <span className="text-white font-bold text-lg">Kridx</span>
                  <span className="text-green-200 text-sm mt-2">Book Courts</span>
                  <span className="text-green-200 text-sm">Join Events</span>
                  <span className="text-green-200 text-sm">Play Sports</span>
                </div>
              </div>
              
              {/* Player silhouette */}
              <div className="absolute -left-10 bottom-0 w-48 h-72 opacity-60">
                <div className="w-full h-full bg-gradient-to-t from-green-900 to-transparent rounded-t-full flex items-center justify-center">
                  <span className="text-6xl">🧑‍🤝‍🧑</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Download Our App
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-md">
              Book courts, track your games, and connect with other players - all from your phone. Get the best sports experience in the palm of your hand.
            </p>
            
            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#" 
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.56.69.56 1.19s-.22.92-.56 1.19l-2.11 1.24-2.5-2.5 2.5-2.5 2.11 1.38zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
                </svg>
                <div>
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-green-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-xl">Kridx</span>
            </div>
            <p className="text-green-200 text-sm">
              Nepal&apos;s premier sports community with world-class facilities across multiple locations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/venues" className="text-green-200 hover:text-yellow-400 transition-colors">Venues</Link></li>
              <li><Link href="/events" className="text-green-200 hover:text-yellow-400 transition-colors">Events</Link></li>
              <li><Link href="/pricing" className="text-green-200 hover:text-yellow-400 transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="text-green-200 hover:text-yellow-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-green-200">
              <li>Baluwatar, Kathmandu</li>
              <li>Budhanilkantha, Kathmandu</li>
              <li>+977 9801234567</li>
              <li>info@kridx.com.np</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hours</h3>
            <ul className="space-y-2 text-green-200">
              <li>Morning: 6:00 AM - 10:00 AM</li>
              <li>Evening: 4:00 PM - 8:00 PM</li>
              <li>Weekends: 6:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} Kridx Sports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

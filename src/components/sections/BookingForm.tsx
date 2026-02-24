'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface Location {
  id: string;
  name: string;
  clayCourts: number;
  miniCourts: number;
}

interface BookingFormProps {
  locations: Location[];
}

interface BookingData {
  locationId: string;
  locationName: string;
  courtType: string;
  date: string;
  startTime: string;
  endTime: string;
  level: string;
  audience: string;
  phoneNumber: string;
}

export function BookingForm({ locations }: BookingFormProps) {
  const [formData, setFormData] = useState({
    location: '',
    courtType: '',
    date: '',
    startTime: '',
    endTime: '',
    level: '',
    audience: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Call the booking API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: formData.location,
          courtType: formData.courtType,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          level: formData.level,
          audience: formData.audience,
          phoneNumber: formData.phoneNumber,
          price: 0, // Default price, can be calculated based on service
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking');
      }

      const selectedLocation = locations.find(l => l.id === formData.location);
      
      setBookingDetails({
        locationId: formData.location,
        locationName: selectedLocation?.name || 'Unknown',
        courtType: formData.courtType === 'clay_courts' ? 'Clay Court' : 'Mini Court',
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        level: formData.level.charAt(0).toUpperCase() + formData.level.slice(1),
        audience: formData.audience === 'adults' ? 'Adults' : 'Kids',
        phoneNumber: formData.phoneNumber,
      });

      setShowModal(true);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      location: '',
      courtType: '',
      date: '',
      startTime: '',
      endTime: '',
      level: '',
      audience: '',
      phoneNumber: '',
    });
  };

  const inputStyles = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#CCFF00] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/20 transition-all";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <>
      <form onSubmit={handleSubmit} className="relative z-10">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              type="button"
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Location */}
          <div>
            <label className={labelStyles}>
              📍 Location
            </label>
            <select 
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={inputStyles}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>

          {/* Court Type */}
          <div>
            <label className={labelStyles}>
              🎾 Court Type
            </label>
            <select 
              name="courtType"
              value={formData.courtType}
              onChange={handleChange}
              required
              className={inputStyles}
            >
              <option value="">Select Court</option>
              <option value="clay_courts">Clay Court</option>
              <option value="mini_courts">Mini Court</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className={labelStyles}>
              📅 Date
            </label>
            <input 
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className={inputStyles}
            />
          </div>

          {/* Phone */}
          <div>
            <label className={labelStyles}>
              📞 Phone Number
            </label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="+977 98XXXXXXXX"
              className={inputStyles}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Start Time */}
          <div>
            <label className={labelStyles}>
              🕐 Start Time
            </label>
            <input 
              type="time" 
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>

          {/* End Time */}
          <div>
            <label className={labelStyles}>
              🕑 End Time
            </label>
            <input 
              type="time" 
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>

          {/* Level */}
          <div>
            <label className={labelStyles}>
              📊 Skill Level
            </label>
            <select 
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className={inputStyles}
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Audience */}
          <div>
            <label className={labelStyles}>
              👥 Who&apos;s Playing?
            </label>
            <select 
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              required
              className={inputStyles}
            >
              <option value="">Select</option>
              <option value="adults">Adults</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <Button 
              variant="volt" 
              className="w-full flex items-center justify-center gap-2 py-3"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Booking...
                </>
              ) : (
                <>
                  <span>🎯</span>
                  Book Now
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {showModal && bookingDetails && (
        <SuccessModal bookingDetails={bookingDetails} onClose={closeModal} />
      )}
    </>
  );
}

function SuccessModal({ bookingDetails, onClose }: { bookingDetails: BookingData; onClose: () => void }) {
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ['#CCFF00', '#1a472a', '#FFD700', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-modal-pop">
        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-[#1a472a] via-[#CCFF00] to-[#1a472a]" />

        {/* Success Icon */}
        <div className="pt-10 pb-6 text-center relative">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#CCFF00]/10 to-transparent" />
          
          <div className="relative inline-flex">
            <div className="w-24 h-24 bg-gradient-to-br from-[#CCFF00] to-[#9dcc00] rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
              <span className="text-5xl">🎉</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#1a472a] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">✓</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 text-center">
          <h3 className="text-3xl font-bold text-[#1a472a] mb-2">
            You&apos;re All Set! 🏆
          </h3>
          <p className="text-gray-500 mb-8">
            Your court is reserved. Get ready to play like a champion!
          </p>

          {/* Booking Details Card */}
          <div className="bg-gradient-to-br from-[#1a472a] to-[#0f2d1a] rounded-2xl p-6 text-left mb-8 relative overflow-hidden">
            {/* Court pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Booking Confirmed</div>
                  <div className="text-[#CCFF00] text-sm">#{Date.now().toString(36).toUpperCase()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Location</div>
                  <div className="text-white font-medium">{bookingDetails.locationName}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Court</div>
                  <div className="text-white font-medium">{bookingDetails.courtType}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Date</div>
                  <div className="text-white font-medium">
                    {new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Time</div>
                  <div className="text-white font-medium">
                    {bookingDetails.startTime} - {bookingDetails.endTime}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Level</div>
                  <div className="text-white font-medium">{bookingDetails.level}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Category</div>
                  <div className="text-white font-medium">{bookingDetails.audience}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-xl p-4 mb-6">
            <p className="text-[#1a472a] font-medium">
              &quot;Champions are made on the court. See you there!&quot; 💪
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              Book Another
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-[#1a472a] text-white font-semibold hover:bg-[#0f2d1a] transition-colors flex items-center justify-center gap-2"
            >
              <span>Done</span>
              <span>🎾</span>
            </button>
          </div>

          {/* Contact Note */}
          <p className="text-gray-400 text-xs mt-6">
            We&apos;ll send a confirmation to {bookingDetails.phoneNumber}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes modal-pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
        
        .animate-modal-pop {
          animation: modal-pop 0.5s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

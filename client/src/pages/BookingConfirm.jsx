import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function BookingConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const bookingData = location.state || {};

  // Guest details state
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!guestName.trim()) {
      newErrors.name = 'Full name is required';
    } else if (guestName.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guestEmail.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(guestEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!guestPhone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(guestPhone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmPayment = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // Create booking with guest details
      const bookingPayload = {
        hotelId: bookingData.hotel?._id,
        roomTypeName: bookingData.selectedRoom?.name || 'Standard Room',
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: {
          adults: bookingData.adults || 2,
          children: bookingData.children || 0,
          infants: 0
        },
        addOns: bookingData.addOns || {},
        paymentMethod: 'card',
        guestDetails: {
          name: guestName,
          email: guestEmail,
          phone: guestPhone
        },
        specialRequests: ''
      };

      const result = await api.createBooking(bookingPayload);
      
      // Navigate to success page
      navigate('/booking-success', { state: { booking: result } });
    } catch (err) {
      alert(err.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50">
        <div className="flex items-center justify-between px-4 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="material-icons text-[#FF8C00] active:scale-95 duration-200 p-2 rounded-full hover:bg-orange-50">
              arrow_back
            </button>
            <h1 className="font-bold text-lg tracking-tight text-slate-900">Review & Confirm</h1>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-12">
          <span className="text-[#FF8C00] font-bold tracking-widest uppercase text-xs">Step 2 of 2</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 tracking-tight">Review & Confirm</h2>
          <p className="text-slate-600 mt-4 max-w-xl text-lg">Please verify your reservation details before we finalize your booking.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Section: Booking Summary */}
          <div className="lg:col-span-7 space-y-8">
            {/* Summary Card */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                  <img className="w-full h-full object-cover" src={bookingData.hotel?.coverImage || bookingData.hotel?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'} alt="Property" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{bookingData.hotel?.name || bookingData.package?.name || bookingData.trek?.name || 'Booking'}</h3>
                  <p className="text-slate-600 text-sm flex items-center gap-1">
                    <span className="material-icons text-sm">location_on</span>
                    {bookingData.hotel?.location || bookingData.hotel?.destination?.name || 'Kashmir'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {bookingData.checkIn && (
                  <div className="space-y-1">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Check-in</p>
                    <p className="font-bold text-slate-900">{new Date(bookingData.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                )}
                {bookingData.checkOut && (
                  <div className="space-y-1">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Check-out</p>
                    <p className="font-bold text-slate-900">{new Date(bookingData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                )}
                {bookingData.adults && (
                  <div className="space-y-1">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Guests</p>
                    <p className="font-bold text-slate-900">{bookingData.adults} Adults{bookingData.children > 0 ? `, ${bookingData.children} Children` : ''}</p>
                  </div>
                )}
                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="space-y-1">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Duration</p>
                    <p className="font-bold text-slate-900">{Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24))} Nights</p>
                  </div>
                )}
              </div>

              {bookingData.addOns && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold text-slate-900 mb-4">Selected Add-ons</h4>
                  <div className="flex flex-wrap gap-2">
                    {bookingData.addOns.airportPickup && (
                      <span className="bg-orange-100 text-[#FF8C00] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        <span className="material-icons text-sm">airport_shuttle</span>
                        Airport Pickup
                      </span>
                    )}
                    {bookingData.addOns.breakfast && (
                      <span className="bg-orange-100 text-[#FF8C00] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        <span className="material-icons text-sm">restaurant</span>
                        Breakfast
                      </span>
                    )}
                    {bookingData.addOns.localGuide && (
                      <span className="bg-orange-100 text-[#FF8C00] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        <span className="material-icons text-sm">person</span>
                        Local Guide
                      </span>
                    )}
                    {bookingData.addOns.adventurePack && (
                      <span className="bg-orange-100 text-[#FF8C00] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        <span className="material-icons text-sm">hiking</span>
                        Adventure Pack
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Guest Details Form */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-900 text-lg">Guest Details</h4>
                <span className="text-xs text-slate-600 bg-orange-50 px-3 py-1 rounded-full font-semibold">Booking details will be sent here</span>
              </div>
              
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter name as per ID proof"
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[#FF8C00]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span className="material-icons text-xs">error</span>
                      {errors.name}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-icons text-xs">info</span>
                    Important: Enter name as mentioned on your passport or Government approved IDs
                  </p>
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#FF8C00]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="material-icons text-xs">error</span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-[#FF8C00]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="material-icons text-xs">error</span>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Section: Price Breakdown */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <section className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
              <h4 className="font-bold text-2xl text-slate-900 mb-8">Fare Breakdown</h4>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Base Price</span>
                  <span className="text-slate-900 font-bold">₹{((bookingData.total || 0) / 1.12).toFixed(0).toLocaleString()}</span>
                </div>
                <div className="pt-5 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Tax (12% GST)</span>
                  <span className="text-slate-900 font-bold">₹{((bookingData.total || 0) - ((bookingData.total || 0) / 1.12)).toFixed(0).toLocaleString()}</span>
                </div>
                <div className="mt-8 p-6 bg-orange-50 rounded-2xl flex justify-between items-center border-2 border-[#FF8C00]/20">
                  <div>
                    <p className="text-xs font-bold text-[#FF8C00] uppercase tracking-widest">Grand Total</p>
                    <p className="text-3xl font-bold text-[#FF8C00]">₹{(bookingData.total || 0).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 font-medium">All taxes included</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <button 
                  onClick={handleConfirmPayment} 
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-bold py-5 rounded-full shadow-lg shadow-[#FF8C00]/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Confirm & Pay'}
                  <span className="material-icons">{submitting ? 'hourglass_empty' : 'arrow_forward'}</span>
                </button>
                <button onClick={() => navigate(-1)} className="w-full bg-gray-200 text-slate-900 font-bold py-5 rounded-full hover:bg-gray-300 transition-all flex items-center justify-center gap-3">
                  <span className="material-icons">arrow_back</span>
                  Go Back
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-slate-600 px-4 leading-relaxed">
                By clicking "Confirm & Pay", you agree to our <Link to="/terms" className="text-[#FF8C00] underline">Terms of Service</Link> and <Link to="/cancellation-policy" className="text-[#FF8C00] underline">Cancellation Policy</Link>.
              </p>
            </section>

            {/* Secure Payment Badge */}
            <div className="flex items-center justify-center gap-4 text-slate-600 opacity-60">
              <span className="material-icons">verified_user</span>
              <span className="text-xs font-bold tracking-widest uppercase">Secure SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

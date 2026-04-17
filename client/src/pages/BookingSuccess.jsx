import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="material-icons text-white text-5xl">check_circle</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Booking Confirmed!</h1>
          <p className="text-slate-600 text-lg">Your reservation has been successfully confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200 mb-6">
          <div className="text-center mb-8 pb-8 border-b-2 border-dashed border-gray-200">
            <p className="text-sm text-slate-600 mb-2">Booking Reference</p>
            <p className="text-3xl font-bold text-[#FF8C00] tracking-wider">{booking.bookingRef}</p>
          </div>

          <div className="space-y-6">
            {/* Hotel Info */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={booking.hotel?.coverImage || booking.hotel?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'} 
                  alt="Hotel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">{booking.hotel?.name || 'Hotel'}</h3>
                <p className="text-slate-600 text-sm flex items-center gap-1">
                  <span className="material-icons text-sm">location_on</span>
                  {booking.hotel?.location || 'Kashmir'}
                </p>
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Check-in</p>
                <p className="font-bold text-slate-900">{new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Check-out</p>
                <p className="font-bold text-slate-900">{new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Guests</p>
                <p className="font-bold text-slate-900">{booking.guests?.adults || 2} Adults</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Total Amount</p>
                <p className="font-bold text-[#FF8C00] text-xl">₹{booking.pricing?.totalAmount?.toLocaleString()}</p>
              </div>
            </div>

            {/* Guest Details */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Guest Information</p>
              <div className="space-y-2">
                <p className="text-slate-900"><span className="font-semibold">Name:</span> {booking.guestDetails?.name}</p>
                <p className="text-slate-900"><span className="font-semibold">Email:</span> {booking.guestDetails?.email}</p>
                <p className="text-slate-900"><span className="font-semibold">Phone:</span> {booking.guestDetails?.phone}</p>
              </div>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <span className="material-icons text-blue-600 mt-0.5">email</span>
              <div>
                <p className="font-bold text-blue-900 mb-1">Confirmation Email Sent</p>
                <p className="text-sm text-blue-700">
                  A detailed booking confirmation and invoice has been sent to <span className="font-semibold">{booking.guestDetails?.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/my-bookings" 
            className="flex-1 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="material-icons">receipt_long</span>
            View My Bookings
          </Link>
          <Link 
            to="/" 
            className="flex-1 bg-white text-slate-900 font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border-2 border-gray-200"
          >
            <span className="material-icons">home</span>
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-600 mt-8">
          Need help? Contact us at <a href="mailto:support@kashmirtravels.com" className="text-[#FF8C00] font-semibold underline">support@kashmirtravels.com</a>
        </p>
      </div>
    </div>
  );
}

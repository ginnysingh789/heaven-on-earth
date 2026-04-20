import { useState, useEffect } from 'react';
import api from '../api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMyBookings()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-500',
    confirmed: 'bg-green-500/10 text-green-500',
    checked_in: 'bg-blue-500/10 text-blue-500',
    checked_out: 'bg-slate-500/10 text-slate-400',
    cancelled: 'bg-red-500/10 text-red-500',
  };

  if (loading) return <div className="text-center py-20 text-slate-600">Loading your bookings...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-slate-900 mb-2">My Bookings</h1>
      <p className="text-slate-600 mb-10">Track and manage your Kashmir travel reservations</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <span className="material-icons text-6xl mb-4 block">luggage</span>
          <p className="text-lg">No bookings yet</p>
          <p className="text-sm mt-2">Start exploring Kashmir and book your dream stay!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FF8C00]/30 transition-all shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-40 md:h-auto overflow-hidden">
                  <img
                    src={booking.hotel?.image || 'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={booking.hotel?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{booking.hotel?.name || 'Hotel'}</h3>
                      <p className="text-sm text-slate-600">{booking.roomType?.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${statusColors[booking.status] || statusColors.pending}`}>
                        {booking.status?.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-600 font-mono">{booking.bookingRef}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold">Check-in</p>
                      <p className="font-medium text-slate-900">{new Date(booking.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold">Check-out</p>
                      <p className="font-medium text-slate-900">{new Date(booking.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold">Guests</p>
                      <p className="font-medium text-slate-900">{booking.guests?.adults} Adult{booking.guests?.adults > 1 ? 's' : ''}{booking.guests?.children > 0 ? `, ${booking.guests.children} Child` : ''}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold">Total</p>
                      <p className="font-bold text-[#FF8C00]">Confirmed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

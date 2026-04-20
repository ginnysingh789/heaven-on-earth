import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ADD_ONS = [
  { name: 'Guided Alpine Trek', price: 4500, desc: 'Private guide for the Great Lakes trail.' },
  { name: 'Traditional Wazwan Dinner', price: 2200, desc: 'Authentic multi-course Kashmiri feast.' },
  { name: 'Airport Luxury Transfer', price: 1800, desc: 'Private SUV from Srinagar Airport.' },
];

export default function BookingFlow() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [hotel, setHotel] = useState(location.state?.hotel || null);
  const [selectedRoom, setSelectedRoom] = useState(location.state?.selectedRoom || null);
  const [loading, setLoading] = useState(!hotel);
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Step 1: Dates & Guests
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Step 2: Room & Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    if (!hotel) {
      api.getHotel(slug).then(h => {
        setHotel(h);
        if (!selectedRoom && h.roomTypes?.length) setSelectedRoom(h.roomTypes[0]);
      }).catch(() => navigate('/hotels')).finally(() => setLoading(false));
    }
  }, [slug]);

  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) : 0;
  const roomTotal = selectedRoom ? selectedRoom.price * nights : 0;
  const addOnsTotal = selectedAddOns.reduce((s, a) => s + a.price, 0);
  const taxes = Math.round((roomTotal + addOnsTotal) * 0.18);
  const totalAmount = roomTotal + addOnsTotal + taxes;

  const toggleAddOn = (addon) => {
    setSelectedAddOns(prev =>
      prev.find(a => a.name === addon.name)
        ? prev.filter(a => a.name !== addon.name)
        : [...prev, { name: addon.name, price: addon.price }]
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const booking = await api.createBooking({
        hotelId: hotel._id,
        roomTypeName: selectedRoom.name,
        checkIn,
        checkOut,
        guests: { adults, children, infants },
        addOns: selectedAddOns,
        paymentMethod,
        guestDetails: { name: guestName, email: guestEmail, phone: guestPhone },
        specialRequests
      });
      setBookingResult(booking);
      setStep(4);
    } catch (err) {
      alert(err.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-600">Loading...</div>;
  if (!hotel) return <div className="text-center py-20 text-slate-600">Hotel not found</div>;

  // Booking Success
  if (step === 4 && bookingResult) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-green-500 text-4xl">check_circle</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-slate-700 mb-2">Reference: <span className="text-accent-gold font-bold">{bookingResult.bookingRef}</span></p>
        <p className="text-slate-400 mb-8">Your booking has been confirmed successfully.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/my-bookings')} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold">View My Bookings</button>
          <button onClick={() => navigate('/')} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Progress Stepper */}
      <div className="w-full max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          <div className={`absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          {['Dates & Guests', 'Choose Room', 'Checkout'].map((label, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ring-4 ring-background-dark ${
                i + 1 < step ? 'bg-primary/20 border border-primary text-primary' :
                i + 1 === step ? 'bg-primary text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {i + 1 < step ? <span className="material-icons text-sm">check</span> : i + 1}
              </div>
              <span className={`mt-2 text-sm font-semibold ${i + 1 === step ? 'text-white' : 'text-slate-400'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Dates & Guests */}
      {step === 1 && (
        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="flex-1 p-8 border-r border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8">Select Your Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Check-in Date</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Check-out Date</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-primary focus:border-primary" />
              </div>
            </div>
            {nights > 0 && (
              <div className="mt-4 bg-white/5 rounded-xl p-4 flex items-center gap-2">
                <span className="material-icons text-primary text-sm">event</span>
                <span className="text-sm text-slate-300">{nights} night{nights > 1 ? 's' : ''} selected</span>
              </div>
            )}
          </div>
          <div className="lg:w-96 p-8 bg-white/5">
            <h2 className="text-2xl font-bold text-white mb-8">Who's coming?</h2>
            <div className="space-y-6">
              {[
                { label: 'Adults', sub: 'Ages 12 or above', val: adults, set: setAdults, min: 1 },
                { label: 'Children', sub: 'Ages 2 – 12', val: children, set: setChildren, min: 0 },
                { label: 'Infants', sub: 'Under 2', val: infants, set: setInfants, min: 0 },
              ].map(({ label, sub, val, set, min }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => set(Math.max(min, val - 1))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white disabled:opacity-50"
                      disabled={val <= min}>
                      <span className="material-icons text-sm">remove</span>
                    </button>
                    <span className="text-lg font-bold w-4 text-center text-white">{val}</span>
                    <button onClick={() => set(val + 1)}
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 text-white">
                      <span className="material-icons text-sm">add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <button
                onClick={() => { if (checkIn && checkOut && nights > 0) setStep(2); else alert('Please select valid dates'); }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center group"
              >
                <span>Continue to Rooms</span>
                <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <p className="text-center text-xs text-slate-500 mt-4 italic">Next step: Browse luxury suites & houseboats</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Room & Add-ons */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Select Your Sanctuary</h1>
              <p className="text-slate-600">Experience Kashmiri hospitality in our meticulously curated suites.</p>
            </div>
            {hotel.roomTypes?.map((room, i) => (
              <div key={i} className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all shadow-sm ${
                selectedRoom?.name === room.name ? 'border-[#FF8C00] bg-orange-50' : 'border-gray-200 hover:border-[#FF8C00]/50'
              }`} onClick={() => setSelectedRoom(room)}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{room.name}</h3>
                      {selectedRoom?.name === room.name && (
                        <span className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white text-[10px] font-bold px-3 py-1 rounded-full">SELECTED</span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{room.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities?.map((a, j) => (
                        <span key={j} className="text-xs text-slate-700 bg-gray-100 px-2.5 py-1 rounded-lg">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Add-ons */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <span className="material-icons text-primary">auto_awesome</span> Curated Experiences
                </h4>
                <div className="space-y-4">
                  {ADD_ONS.map((addon, i) => (
                    <label key={i} className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-gray-300 cursor-pointer transition-all">
                      <input type="checkbox" checked={!!selectedAddOns.find(a => a.name === addon.name)}
                        onChange={() => toggleAddOn(addon)} className="w-5 h-5 rounded border-gray-300 text-[#FF8C00] focus:ring-[#FF8C00]" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-bold text-slate-900">{addon.name}</span>
                        </div>
                        <p className="text-xs text-slate-600">{addon.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Summary */}
              <div className="bg-orange-50 border-2 border-[#FF8C00]/20 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-6 text-slate-900">Booking Summary</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{selectedRoom?.name} ({nights} night{nights > 1 ? 's' : ''})</span>
                  </div>
                  {addOnsTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Add-ons</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Taxes & Service Fees (18%)</span>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-600 uppercase font-bold tracking-widest">Total Amount</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-green-500 font-bold uppercase">Free Cancellation</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(3)}
                  className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:shadow-xl text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#FF8C00]/20 transition-all">
                  Continue to Payment
                </button>
                <button onClick={() => setStep(1)} className="w-full mt-3 text-slate-600 hover:text-slate-900 text-sm py-2">
                  &larr; Back to Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Checkout / Payment */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">Secure Checkout</h1>
              <p className="text-slate-600">Complete your booking for {hotel.name}</p>
            </div>

            {/* Guest Details */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <span className="material-icons text-primary">person</span> Guest Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Full Name</label>
                  <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Email</label>
                  <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Phone</label>
                  <input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+91-XXXXXXXXXX"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Special Requests</label>
                  <input type="text" value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Any preferences..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]" />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <span className="material-icons text-primary">payments</span> Payment Method
              </h2>
              {[
                { id: 'upi', icon: 'qr_code_2', label: 'UPI / QR Code', desc: 'Pay via Google Pay, PhonePe, or any UPI app', tag: 'Recommended' },
                { id: 'card', icon: 'credit_card', label: 'Credit / Debit Card', desc: 'Secure payments with Visa, Mastercard, or Amex', tag: '' },
                { id: 'pay_at_hotel', icon: 'apartment', label: 'Pay at Hotel', desc: 'Pay 10% now and the rest at the property', tag: '' },
              ].map(pm => (
                <label key={pm.id}
                  className={`flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${
                    paymentMethod === pm.id ? 'border-[#FF8C00] bg-orange-50' : 'border-gray-200 bg-white hover:border-[#FF8C00]/50'
                  }`}>
                  <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id}
                    onChange={() => setPaymentMethod(pm.id)} className="hidden" />
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-icons text-primary">{pm.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{pm.label}</p>
                    <p className="text-xs text-slate-500">{pm.desc}</p>
                  </div>
                  {pm.tag && (
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase tracking-wider">{pm.tag}</span>
                  )}
                </label>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">verified_user</span>
                  <span className="text-[10px] font-bold uppercase leading-none">PCI DSS<br/>Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">security</span>
                  <span className="text-[10px] font-bold uppercase leading-none">256-bit SSL<br/>Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">shield</span>
                  <span className="text-[10px] font-bold uppercase leading-none">Secure<br/>Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 glass-panel rounded-xl overflow-hidden shadow-2xl">
              <div className="relative h-40 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="material-icons text-[14px]">location_on</span>
                    {hotel.destination?.name || hotel.address}
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Check-in</p>
                    <p className="text-sm font-semibold">{new Date(checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Travelers</p>
                    <p className="text-sm font-semibold">{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child` : ''}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{selectedRoom?.name} ({nights}N)</span>
                  </div>
                  {addOnsTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Add-ons</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Taxes & Fees</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Total Amount</p>
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Incl. GST</p>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={submitting || !guestName || !guestEmail}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/25 disabled:opacity-50">
                  <span className="material-icons">lock</span>
                  {submitting ? 'Processing...' : 'Complete Booking'}
                </button>
                <button onClick={() => setStep(2)} className="w-full text-slate-400 hover:text-white text-sm py-2">
                  &larr; Back to Room Selection
                </button>
                <p className="text-[10px] text-center text-slate-500">
                  By clicking 'Complete Booking', you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

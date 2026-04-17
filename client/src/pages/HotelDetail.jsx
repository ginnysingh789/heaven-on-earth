import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { useAuth } from '../context/AuthContext';
import { DetailPageSkeleton } from '../components/Skeleton';

export default function HotelDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [addOns, setAddOns] = useState({
    airportPickup: false,
    breakfast: true,
    localGuide: false,
    adventurePack: false
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    api.getHotel(slug)
      .then(data => {
        if (data) {
          setHotel(data);
        } else {
          setHotel(null);
        }
      })
      .catch(() => {
        setHotel(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const calculateTotal = () => {
    if (!hotel || !checkIn || !checkOut) return 0;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const basePrice = (hotel.startingPrice || 0) * nights;
    const addOnsCost = (addOns.airportPickup ? 1500 : 0) + (addOns.breakfast ? 500 * nights : 0) + (addOns.localGuide ? 2000 : 0) + (addOns.adventurePack ? 3000 : 0);
    const subtotal = basePrice + addOnsCost;
    const gst = subtotal * 0.12;
    return subtotal + gst;
  };

  if (loading) return <DetailPageSkeleton />;
  if (!hotel) return <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]"><span className="text-slate-500 font-light tracking-widest uppercase text-xs">Hotel not found</span></div>;

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 page-enter-fade">
      <main className="pt-10 pb-32 flex flex-col items-center px-6">

        {/* Editorial Header */}
        <div className="w-full max-w-6xl mb-10 text-center">
          <Link to="/hotels" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-500 hover:text-slate-700 transition-colors mb-4">
            <span className="material-icons text-sm">arrow_back</span> Back to Hotels
          </Link>
          <span className="font-sans uppercase tracking-widest text-xs text-slate-500 font-bold mb-2 block">{hotel.category || 'Luxury'} · {hotel.location || hotel.destination?.name}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-slate-900">{hotel.name}</h2>
        </div>

        {/* Bento Article Grid */}
        <article className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Image — 7 cols */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={hotel.images?.length > 0 ? hotel.images[currentImageIndex] : (hotel.image || hotel.coverImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop')}
              alt={hotel.name}
              className="w-full aspect-[4/5] md:aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {hotel.images?.length > 1 && (
              <>
                <button onClick={() => setCurrentImageIndex(p => p === 0 ? hotel.images.length - 1 : p - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button onClick={() => setCurrentImageIndex(p => p === hotel.images.length - 1 ? 0 : p + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                  <span className="material-icons">chevron_right</span>
                </button>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-2 text-white mb-2">
                <span className="material-icons text-sm">location_on</span>
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold">{hotel.location || hotel.destination?.name}, Kashmir</span>
              </div>
              {hotel.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-icons text-sm ${i < Math.floor(hotel.rating) ? 'text-amber-400' : 'text-white/30'}`}>star</span>
                  ))}
                  <span className="text-white text-xs ml-1 font-semibold">{hotel.rating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content — 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-8 py-4">
            <header>
              <h3 className="font-serif text-4xl font-bold text-slate-900 mb-4">{hotel.name}</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                {hotel.description || 'Experience unmatched luxury at this premier property. Every detail is curated to provide a seamless stay, blending heritage craftsmanship with modern comforts.'}
              </p>
            </header>

            {/* Amenities */}
            {hotel.amenities?.length > 0 && (
              <div>
                <span className="price-label mb-3">The Experience</span>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <div key={idx} className="tag-pill">
                      <span className="material-icons">check</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing & Booking */}
            <div className="mt-auto pt-8 border-t border-slate-200">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="price-label">Starting From</span>
                  <div className="price-display">
                    <span className="price-amount">₹{hotel.startingPrice?.toLocaleString()}</span>
                    <span className="price-unit">/ night</span>
                  </div>
                </div>
                {hotel.category && (
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md">
                    <span className="font-sans text-xs uppercase tracking-widest font-bold">{hotel.category}</span>
                  </div>
                )}
              </div>

              <a href={buildWhatsAppUrl(hotel.name)} target="_blank" rel="noopener noreferrer"
                className="btn-cta mb-4 no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                ENQUIRY ON WHATSAPP
                <span className="material-icons text-lg">arrow_right_alt</span>
              </a>
            </div>
          </div>
        </article>

        {/* Secondary Feature Section */}
        <section className="w-full max-w-6xl mt-20 bg-[#f2f4f6] rounded-xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <span className="material-icons text-slate-900">hotel</span>
              <h4 className="font-serif text-xl font-bold">Curated Rooms</h4>
              <p className="text-slate-700 text-base leading-relaxed">Each room crafted with Kashmiri artisan details, fine linens, and panoramic valley views.</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="material-icons text-slate-900">restaurant</span>
              <h4 className="font-serif text-xl font-bold">Kashmiri Cuisine</h4>
              <p className="text-slate-700 text-base leading-relaxed">Authentic Wazwan dining experience reimagined through a contemporary culinary lens.</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="material-icons text-slate-900">spa</span>
              <h4 className="font-serif text-xl font-bold">Wellness & Spa</h4>
              <p className="text-slate-700 text-base leading-relaxed">Rejuvenate with traditional Kashmiri therapies and world-class wellness facilities.</p>
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="w-full max-w-6xl mt-8 bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-icons text-[#FF8C00] text-lg">auto_awesome</span>
            <span className="font-sans text-sm uppercase tracking-widest text-slate-800 font-bold">Enhance Your Stay</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'airportPickup', label: 'Airport Pickup', icon: 'flight_land', price: '₹1,500' },
              { key: 'breakfast', label: 'Breakfast', icon: 'free_breakfast', price: '₹500/night' },
              { key: 'localGuide', label: 'Local Guide', icon: 'tour', price: '₹2,000' },
              { key: 'adventurePack', label: 'Adventure Pack', icon: 'backpack', price: '₹3,000' },
            ].map(item => (
              <label
                key={item.key}
                className={`relative flex flex-col gap-3 p-5 rounded-xl cursor-pointer border-2 transition-all duration-200 select-none
                  ${addOns[item.key]
                    ? 'border-[#FF8C00] bg-orange-50 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/40'
                  }`}
              >
                <input type="checkbox" className="sr-only" checked={addOns[item.key]} onChange={e => setAddOns({ ...addOns, [item.key]: e.target.checked })} />
                {/* Checkmark badge when selected */}
                {addOns[item.key] && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-[#FF8C00] rounded-full flex items-center justify-center">
                    <span className="material-icons text-white text-xs">check</span>
                  </span>
                )}
                <span className={`material-icons text-2xl ${addOns[item.key] ? 'text-[#FF8C00]' : 'text-slate-500'}`}>{item.icon}</span>
                <div>
                  <p className={`font-sans text-sm font-bold uppercase tracking-wide leading-tight ${addOns[item.key] ? 'text-slate-900' : 'text-slate-700'}`}>{item.label}</p>
                  <p className={`font-sans text-sm font-semibold mt-1 ${addOns[item.key] ? 'text-[#FF8C00]' : 'text-slate-500'}`}>{item.price}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

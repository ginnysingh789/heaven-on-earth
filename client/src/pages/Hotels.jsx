import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import HotelCard from '../components/HotelCard';
import FilterBar from '../components/FilterBar';

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDest, setFilterDest] = useState(searchParams.get('destination') || '');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    api.getDestinations()
      .then(data => setDestinations(data))
      .catch(() => setDestinations([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterDest) params.set('destination', filterDest);
    if (filterCategory) params.set('category', filterCategory);

    const fetchHotels = filterDest && !filterDest.match(/^[0-9a-fA-F]{24}$/)
      ? api.getHotelsByDestination(filterDest)
      : api.getHotels(params.toString());

    fetchHotels
      .then(data => setHotels(data))
      .catch(() => setHotels([]))
      .finally(() => setLoading(false));
  }, [filterDest, filterCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&auto=format&fit=crop&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Explore Hotels & Stays</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Find your perfect accommodation across the Kashmir valley</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterBar
          filters={[
            { key: 'destination', icon: 'location_on', placeholder: 'All Destinations', options: [
              { value: '', label: 'All Destinations' },
              ...destinations.map(d => ({ value: d.slug, label: d.name }))
            ]},
            { key: 'category', icon: 'hotel', placeholder: 'All Categories', options: [
              { value: '', label: 'All Categories' },
              { value: 'luxury', label: 'Luxury' },
              { value: 'resort', label: 'Resort' },
              { value: 'houseboat', label: 'Houseboat' },
              { value: 'boutique', label: 'Boutique' },
              { value: 'budget', label: 'Budget' },
            ]},
          ]}
          values={{ destination: filterDest, category: filterCategory }}
          onChange={(key, val) => key === 'destination' ? setFilterDest(val) : setFilterCategory(val)}
          onClear={() => { setFilterDest(''); setFilterCategory(''); }}
          count={hotels.length}
        />

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading hotels...</div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-20 text-slate-600">
            <span className="material-icons text-6xl mb-4 block">search_off</span>
            No hotels found. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

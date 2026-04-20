import { useState, useEffect } from 'react';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadRentals();
  }, [filterCategory]);

  const loadRentals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set('category', filterCategory);
      const data = await api.getRentals(params.toString());
      setRentals(data);
    } catch (err) {
      console.error(err);
      setRentals([]);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons = {
    taxi: 'local_taxi',
    'self-drive-car': 'directions_car',
    bike: 'two_wheeler',
    'route-specific': 'route'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Background Image */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=2400)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Rental Services</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Explore Kashmir at your own pace with our premium rental services - from luxury SUVs to comfortable vans</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterBar
          filters={[
            { key: 'category', icon: 'directions_car', placeholder: 'All Services', options: [
              { value: '', label: 'All Services' },
              { value: 'SUV', label: 'SUV' },
              { value: 'Van', label: 'Van' },
              { value: 'Sedan', label: 'Sedan' },
              { value: 'Bike', label: 'Bike' },
            ]},
          ]}
          values={{ category: filterCategory }}
          onChange={(key, val) => setFilterCategory(val)}
          onClear={() => setFilterCategory('')}
          count={rentals.length}
        />

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading services...</div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-20 text-slate-600">No services found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <ListingCard
                key={rental._id}
                to={`/rentals/${rental.slug}`}
                image={rental.coverImage}
                title={rental.name}
                description={rental.description}
                tags={[rental.category, `${rental.capacity?.passengers} Passengers`].filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

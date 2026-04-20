import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

export default function Homestays() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState('');
  const [filterMeals, setFilterMeals] = useState('');

  useEffect(() => {
    loadHomestays();
  }, [filterRegion, filterMeals]);

  const loadHomestays = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterRegion) params.set('region', filterRegion);
      if (filterMeals) params.set('mealsIncluded', filterMeals);
      const data = await api.getHomestays(params.toString());
      setHomestays(data);
    } catch (err) {
      console.error(err);
      setHomestays([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://static.toiimg.com/thumb/105788955/Highlands-Park.jpg?width=636&height=358&resize=4)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Homestays</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Experience authentic Kashmiri hospitality with local families</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterBar
          filters={[
            { key: 'region', icon: 'place', placeholder: 'All Regions', options: [
              { value: '', label: 'All Regions' },
              { value: 'Srinagar', label: 'Srinagar' },
              { value: 'Gulmarg', label: 'Gulmarg' },
              { value: 'Pahalgam', label: 'Pahalgam' },
              { value: 'Sonamarg', label: 'Sonamarg' },
              { value: 'Gurez', label: 'Gurez Valley' },
            ]},
            { key: 'meals', icon: 'restaurant', placeholder: 'Any Meals', options: [
              { value: '', label: 'Any Meals' },
              { value: 'breakfast', label: 'Breakfast Included' },
              { value: 'all', label: 'All Meals Included' },
            ]},
          ]}
          values={{ region: filterRegion, meals: filterMeals }}
          onChange={(key, val) => key === 'region' ? setFilterRegion(val) : setFilterMeals(val)}
          onClear={() => { setFilterRegion(''); setFilterMeals(''); }}
          count={homestays.length}
        />

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading homestays...</div>
        ) : homestays.length === 0 ? (
          <div className="text-center py-20 text-slate-600">No homestays found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homestays.map((homestay) => (
              <ListingCard
                key={homestay._id}
                to={`/homestays/${homestay.slug}`}
                image={homestay.coverImage}
                title={homestay.name}
                description={homestay.description}
                tags={[homestay.location, homestay.isVerified ? 'Verified' : null].filter(Boolean)}
              />
            ))}
          </div>
        )}

        {/* List Your Homestay CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-[#FF8C00] rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Have a Homestay?</h2>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Join our community of local hosts and share your home with travelers from around the world.
          </p>
          <Link to="/list-homestay" className="inline-block bg-[#FF8C00] hover:bg-[#E67E00] text-white px-8 py-3 rounded-xl font-bold transition-all">
            List Your Homestay
          </Link>
        </div>
      </div>
    </div>
  );
}

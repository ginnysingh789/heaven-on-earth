import { useState, useEffect } from 'react';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

export default function Houseboats() {
  const [houseboats, setHouseboats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLake, setFilterLake] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadHouseboats();
  }, [filterLake, filterCategory]);

  const loadHouseboats = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterLake) params.set('lake', filterLake);
      if (filterCategory) params.set('category', filterCategory);
      const data = await api.getHouseboats(params.toString());
      setHouseboats(data);
    } catch (err) {
      console.error(err);
      setHouseboats([]);
    } finally {
      setLoading(false);
    }
  };

  const categoryLabels = {
    'deluxe': 'Deluxe',
    'super-deluxe': 'Super Deluxe',
    'luxury': 'Luxury',
    'standard': 'Standard'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Background Image */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://i.pinimg.com/originals/66/b7/40/66b740425af2ffdeb83f79a7c4991ab4.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Houseboats</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Experience the iconic floating accommodations of Kashmir's pristine lakes - a unique stay on Dal and Nigeen Lakes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterBar
          filters={[
            { key: 'lake', icon: 'water', placeholder: 'All Lakes', options: [
              { value: '', label: 'All Lakes' },
              { value: 'dal-lake', label: 'Dal Lake' },
              { value: 'nigeen-lake', label: 'Nigeen Lake' },
            ]},
            { key: 'category', icon: 'category', placeholder: 'All Categories', options: [
              { value: '', label: 'All Categories' },
              { value: 'Deluxe', label: 'Deluxe' },
              { value: 'Premium', label: 'Premium' },
              { value: 'Heritage', label: 'Heritage' },
              { value: 'Luxury', label: 'Luxury' },
            ]},
          ]}
          values={{ lake: filterLake, category: filterCategory }}
          onChange={(key, val) => key === 'lake' ? setFilterLake(val) : setFilterCategory(val)}
          onClear={() => { setFilterLake(''); setFilterCategory(''); }}
          count={houseboats.length}
        />

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading houseboats...</div>
        ) : houseboats.length === 0 ? (
          <div className="text-center py-20 text-slate-600">No houseboats found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houseboats.map((houseboat) => (
              <ListingCard
                key={houseboat._id}
                to={`/houseboats/${houseboat.slug}`}
                image={houseboat.coverImage}
                title={houseboat.name}
                description={houseboat.description}
                tags={[houseboat.category, houseboat.location].filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

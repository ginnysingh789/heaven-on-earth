import { useState, useEffect } from 'react';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

export default function Trekking() {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState('');

  useEffect(() => {
    loadTreks();
  }, [filterDifficulty]);

  const loadTreks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterDifficulty) params.set('difficulty', filterDifficulty);
      const data = await api.getTreks(params.toString());
      setTreks(data);
    } catch (err) {
      console.error(err);
      setTreks([]);
    } finally {
      setLoading(false);
    }
  };

  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-500 border-green-500/20',
    moderate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    difficult: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    challenging: 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=2400&auto=format&fit=crop&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Kashmir Treks</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Explore the most beautiful trekking routes in Kashmir</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterBar
          filters={[
            { key: 'difficulty', icon: 'terrain', placeholder: 'All Levels', options: [
              { value: '', label: 'All Levels' },
              { value: 'easy', label: 'Easy' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'difficult', label: 'Difficult' },
              { value: 'challenging', label: 'Challenging' },
            ]},
          ]}
          values={{ difficulty: filterDifficulty }}
          onChange={(key, val) => setFilterDifficulty(val)}
          onClear={() => setFilterDifficulty('')}
          count={treks.length}
        />

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading treks...</div>
        ) : treks.length === 0 ? (
          <div className="text-center py-20 text-slate-600">No treks found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treks.map((trek) => (
              <ListingCard
                key={trek._id}
                to={`/trekking/${trek.slug}`}
                image={trek.coverImage}
                title={trek.name}
                description={trek.overview}
                price={`₹${trek.pricing.perPerson.toLocaleString()}`}
                priceUnit="/person"
                tags={[trek.difficulty, `${trek.duration.days} Day Trek`]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

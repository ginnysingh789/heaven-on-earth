import { useState, useEffect } from 'react';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  useEffect(() => {
    loadPackages();
  }, [filterCategory, filterDifficulty]);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set('category', filterCategory);
      if (filterDifficulty) params.set('difficulty', filterDifficulty);
      const data = await api.getPackages(params.toString());
      setPackages(data);
    } catch (err) {
      console.error(err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const categoryLabels = {
    'popular-kashmir': 'Popular Kashmir Tours',
    'offbeat': 'Offbeat Tours',
    'ladakh': 'Ladakh Tours'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/IMG_5977.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Tour Packages</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Explore curated Kashmir & Ladakh tour packages</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterBar
          filters={[
            { key: 'category', icon: 'category', placeholder: 'All Categories', options: [
              { value: '', label: 'All Categories' },
              { value: 'popular-kashmir', label: 'Popular Kashmir' },
              { value: 'offbeat', label: 'Offbeat' },
              { value: 'ladakh', label: 'Ladakh' },
            ]},
            { key: 'difficulty', icon: 'terrain', placeholder: 'All Levels', options: [
              { value: '', label: 'All Levels' },
              { value: 'easy', label: 'Easy' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'challenging', label: 'Challenging' },
            ]},
          ]}
          values={{ category: filterCategory, difficulty: filterDifficulty }}
          onChange={(key, val) => key === 'category' ? setFilterCategory(val) : setFilterDifficulty(val)}
          onClear={() => { setFilterCategory(''); setFilterDifficulty(''); }}
          count={packages.length}
        />

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading packages...</div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 text-slate-600">No packages found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <ListingCard
                key={pkg._id}
                to={`/packages/${pkg.slug}`}
                image={pkg.coverImage}
                title={pkg.name}
                description={pkg.overview || pkg.description}
                tags={[`${pkg.duration.days}D/${pkg.duration.nights}N`, pkg.highlights?.[0]].filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

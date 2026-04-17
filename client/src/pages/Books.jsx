import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import FilterBar from '../components/FilterBar';
import { Star } from 'lucide-react';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('');

  useEffect(() => {
    loadBooks();
  }, [filterCategory, filterLanguage]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set('category', filterCategory);
      if (filterLanguage) params.set('language', filterLanguage);
      const data = await api.getBooks(params.toString());
      setBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-white mb-2">Kashmir Books & Literature</h1>
        <p className="text-slate-600">Discover books about Kashmir's culture, history, and poetry</p>
      </div>

      <FilterBar
        filters={[
          { key: 'category', icon: 'category', placeholder: 'All Categories', options: [
            { value: '', label: 'All Categories' },
            { value: 'poetry', label: 'Poetry' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'non-fiction', label: 'Non-Fiction' },
            { value: 'history', label: 'History' },
            { value: 'culture', label: 'Culture' },
            { value: 'travel', label: 'Travel' },
            { value: 'biography', label: 'Biography' },
          ]},
          { key: 'language', icon: 'language', placeholder: 'All Languages', options: [
            { value: '', label: 'All Languages' },
            { value: 'english', label: 'English' },
            { value: 'kashmiri', label: 'Kashmiri' },
            { value: 'urdu', label: 'Urdu' },
            { value: 'hindi', label: 'Hindi' },
            { value: 'bilingual', label: 'Bilingual' },
          ]},
        ]}
        values={{ category: filterCategory, language: filterLanguage }}
        onChange={(key, val) => key === 'category' ? setFilterCategory(val) : setFilterLanguage(val)}
        onClear={() => { setFilterCategory(''); setFilterLanguage(''); }}
        count={books.length}
      />

      {loading ? (
        <div className="text-center py-20 text-slate-600">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-slate-600">No books found</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <Link key={book._id} to={`/books/${book.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {book.isFeatured && (
                  <div className="absolute top-2 right-2 bg-[#FF8C00] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">Featured</div>
                )}
                {book.isClassic && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">Classic</div>
                )}
                {book.price && (
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold shadow">
                    ₹{book.price.toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-3 gap-1">
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">{book.title}</h3>
                <p className="text-[11px] text-slate-500">{book.author}</p>
                <div className="flex items-center gap-1.5 mt-auto pt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] font-semibold text-slate-700">{book.rating}</span>
                  <span className="text-[11px] text-slate-400 capitalize ml-1">{book.language}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

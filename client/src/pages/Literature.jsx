import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ListingCard from '../components/ListingCard';
import { BookOpen, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Heritage & Culture', slug: 'heritage', icon: 'account_balance', color: 'from-amber-500 to-orange-600', description: "Explore Kashmir's rich cultural heritage — Mughal gardens, Sufi shrines, and ancient traditions." },
  { name: 'History', slug: 'history', icon: 'menu_book', color: 'from-rose-500 to-red-600', description: "Stories from Kashmir's past — dynasties, empires, and pivotal moments that shaped the valley." },
  { name: 'Literature', slug: 'literature', icon: 'auto_stories', color: 'from-emerald-500 to-teal-600', description: "Literary masterpieces from Lal Ded to Agha Shahid Ali — the written soul of Kashmir." },
  { name: 'Poetry', slug: 'poetry', icon: 'edit_note', color: 'from-violet-500 to-purple-600', description: "Kashmiri poetry and verses — Habba Khatoon, Mahjoor, and modern Kashmiri poets." },
  { name: 'Travel Stories', slug: 'travel-stories', icon: 'flight', color: 'from-sky-500 to-blue-600', description: "First-hand travel narratives from the valleys, mountains, and hidden villages of Kashmir." },
  { name: 'Documentaries', slug: 'documentaries', icon: 'movie', color: 'from-pink-500 to-fuchsia-600', description: "Films and visual stories capturing the beauty, culture, and resilience of Kashmir." },
];


export default function Literature() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [articles, books] = await Promise.all([
        api.getArticles('featured=true'),
        api.getBooks('featured=true')
      ]);
      setFeaturedArticles(articles.slice(0, 6));
      setFeaturedBooks(books.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/DJI_20250307210014_0030_D-HDR.JPG')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-[#FF8C00]" />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-300">Explore</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Literature & Culture</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            Discover the rich literary heritage, cultural stories, and timeless poetry of Kashmir
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[#FF8C00] font-serif italic text-lg mb-2">Browse Topics</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/articles?category=${cat.slug}`}
              className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-icons text-white text-2xl">{cat.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#FF8C00] transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>


      {/* DB Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Latest from Our Writers</h2>
              <Link to="/articles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ListingCard
                  key={article._id}
                  to={`/articles/${article.slug}`}
                  image={article.coverImage}
                  title={article.title}
                  description={article.excerpt}
                  price={`${article.readTime} min`}
                  priceUnit=" read"
                  tags={[article.category.replace('-', ' '), article.author.name]}
                  cta="Read now"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DB Featured Books */}
      {featuredBooks.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Books</h2>
              <Link to="/books" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredBooks.map((book) => (
                <Link
                  key={book._id}
                  to={`/books/${book.slug}`}
                  className="group"
                >
                  <div className="relative mb-3 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-[#FF8C00] transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-600">{book.author}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guest Writer CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#FF8C00] to-[#E67E00] rounded-3xl p-10 md:p-14 text-center shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
              <span className="material-icons text-white text-3xl">edit_note</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Share Your Story</h2>
            <p className="text-white/85 mb-8 max-w-2xl mx-auto text-lg">
              Have a story, poem, or article about Kashmir? We welcome guest writers to share their perspectives and experiences.
            </p>
            <Link to="/submit-article" className="inline-block bg-white text-[#FF8C00] px-8 py-3.5 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg">
              Submit Your Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

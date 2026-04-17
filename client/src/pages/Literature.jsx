import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ListingCard from '../components/ListingCard';

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

  const categories = [
    { name: 'Heritage & Culture', slug: 'heritage', icon: '🏛️', description: 'Explore Kashmir\'s rich cultural heritage' },
    { name: 'History', slug: 'history', icon: '📜', description: 'Stories from Kashmir\'s past' },
    { name: 'Literature', slug: 'literature', icon: '📚', description: 'Literary works and analysis' },
    { name: 'Poetry', slug: 'poetry', icon: '✍️', description: 'Kashmiri poetry and verses' },
    { name: 'Travel Stories', slug: 'travel-stories', icon: '✈️', description: 'Personal travel experiences' },
    { name: 'Documentaries', slug: 'documentaries', icon: '🎬', description: 'Films about Kashmir' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl text-slate-900 mb-4">Literature & Culture</h1>
        <p className="text-xl text-slate-700 max-w-3xl mx-auto">
          Discover the rich literary heritage, cultural stories, and timeless poetry of Kashmir
        </p>
      </div>

      {/* Categories Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/articles?category=${cat.slug}`}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#FF8C00] transition-all shadow-sm"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#FF8C00] transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-slate-600">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Featured Articles</h2>
            <Link to="/articles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105">
              View All →
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
      )}

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Featured Books</h2>
            <Link to="/books" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105">
              View All →
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
      )}

      {/* Guest Writer CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-[#FF8C00]/20 rounded-2xl p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Share Your Story</h2>
        <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
          Have a story, poem, or article about Kashmir? We welcome guest writers to share their perspectives and experiences.
        </p>
        <Link to="/submit-article" className="inline-block bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:shadow-xl text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#FF8C00]/20">
          Submit Your Article
        </Link>
      </div>
    </div>
  );
}

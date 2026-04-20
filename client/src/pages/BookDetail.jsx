import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { DetailPageSkeleton } from '../components/Skeleton';

export default function BookDetail() {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
  }, [slug]);

  const loadBook = async () => {
    setLoading(true);
    try {
      const data = await api.getBook(slug);
      setBook(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DetailPageSkeleton />;
  if (!book) return <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]"><span className="text-slate-500 font-light tracking-widest uppercase text-xs">Book not found</span></div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 page-enter">
      <main className="pt-10 pb-32 flex flex-col items-center px-6">

        {/* Editorial Header */}
        <div className="w-full max-w-6xl mb-10 text-center">
          <Link to="/books" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-600 hover:text-slate-700 transition-colors mb-4">
            <span className="material-icons text-sm">arrow_back</span> Back to Books
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="bg-[#eceef0] text-slate-600 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold capitalize">{book.category}</span>
            <span className="bg-[#eceef0] text-slate-600 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold capitalize">{book.language}</span>
            {book.isFeatured && <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold">Featured</span>}
            {book.isClassic && <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold">Classic</span>}
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-slate-900">{book.title}</h2>
          <p className="font-sans text-slate-400 mt-2 tracking-widest text-sm uppercase font-bold">by {book.author}</p>
        </div>

        {/* Bento Article Grid */}
        <article className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Book Cover — 7 cols */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-xl shadow-lg">
            <img src={book.coverImage} alt={book.title}
              className="w-full aspect-[4/5] md:aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold ${book.availability === 'available' ? 'bg-green-100 text-green-800' : book.availability === 'upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'}`}>
                {book.availability === 'available' ? '✓ In Stock' : book.availability === 'upcoming' ? '⏳ Coming Soon' : 'Out of Print'}
              </div>
            </div>
          </div>

          {/* Content — 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-8 py-4">
            <header>
              <h3 className="font-serif text-4xl font-bold text-slate-900 mb-2">{book.title}</h3>
              <p className="font-sans text-slate-400 font-bold uppercase tracking-widest text-xs mb-6">by {book.author}</p>
              <p className="text-slate-700 text-lg leading-relaxed">{book.description}</p>
            </header>

            {/* Book Details Grid */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-4 block">Book Details</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  book.publishedYear && { icon: 'calendar_today', label: 'Published', val: book.publishedYear },
                  book.publisher && { icon: 'business', label: 'Publisher', val: book.publisher },
                  book.pages && { icon: 'menu_book', label: 'Pages', val: book.pages },
                  book.rating && { icon: 'star', label: 'Rating', val: `${book.rating} / 5` },
                ].filter(Boolean).map((s, i) => (
                  <div key={i} className="bg-[#eceef0] rounded-md p-3 flex items-center gap-3">
                    <span className="material-icons text-slate-500 text-sm">{s.icon}</span>
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-widest text-slate-600 font-bold">{s.label}</p>
                      <p className="font-sans text-sm font-bold text-slate-900">{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {book.tags?.length > 0 && (
              <div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-4 block">Topics</span>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, i) => (
                    <span key={i} className="bg-[#eceef0] px-4 py-2 rounded-md font-sans text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase CTAs */}
            <div className="mt-auto pt-8 border-t border-slate-200">
              {(book.purchaseLinks?.amazon || book.purchaseLinks?.flipkart || book.purchaseLinks?.other) && (
                <div className="space-y-3">
                  <span className="price-label mb-3">Buy Now</span>
                  {book.purchaseLinks?.amazon && (
                    <a href={book.purchaseLinks.amazon} target="_blank" rel="noopener noreferrer" className="btn-cta">
                      <span className="material-icons text-lg">shopping_cart</span>
                      BUY ON AMAZON
                      <span className="material-icons text-lg">arrow_right_alt</span>
                    </a>
                  )}
                  {book.purchaseLinks?.flipkart && (
                    <a href={book.purchaseLinks.flipkart} target="_blank" rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 border-2 border-[#FF8C00] text-[#FF8C00] py-4 rounded-xl font-sans text-xs uppercase tracking-[0.12em] font-bold hover:bg-orange-50 transition-colors mt-3">
                      <span className="material-icons text-lg">shopping_bag</span>
                      BUY ON FLIPKART
                    </a>
                  )}
                  {book.purchaseLinks?.other && (
                    <a href={book.purchaseLinks.other} target="_blank" rel="noopener noreferrer"
                      className="block text-center font-sans text-xs uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors font-bold underline underline-offset-4 mt-2">
                      Other Stores
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Excerpt */}
        {book.excerpt && (
          <section className="w-full max-w-6xl mt-16 bg-[#f2f4f6] rounded-xl p-12">
            <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-6 block">Excerpt</span>
            <blockquote className="font-serif text-xl text-slate-700 leading-relaxed italic whitespace-pre-wrap border-l-4 border-slate-300 pl-8">
              {book.excerpt}
            </blockquote>
          </section>
        )}

        {/* Related Books */}
        {book.relatedBooks?.length > 0 && (
          <section className="w-full max-w-6xl mt-16">
            <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-8">You May Also Like</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {book.relatedBooks.map((related) => (
                <Link key={related._id} to={`/books/${related.slug}`} className="group">
                  <div className="relative mb-3 rounded-xl overflow-hidden shadow-md">
                    <img src={related.coverImage} alt={related.title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-slate-900 mb-1 line-clamp-2 group-hover:underline">{related.title}</h3>
                  <p className="font-sans text-[10px] text-slate-400 uppercase tracking-wider font-bold">{related.author}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

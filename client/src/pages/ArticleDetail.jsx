import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { DetailPageSkeleton } from '../components/Skeleton';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    setLoading(true);
    try {
      const data = await api.getArticle(slug);
      setArticle(data);
    } catch (err) {
      console.error(err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked) return;
    try {
      const result = await api.likeArticle(slug);
      setArticle({ ...article, likes: result.likes });
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <DetailPageSkeleton />;
  if (!article) return <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]"><span className="text-slate-500 font-light tracking-widest uppercase text-xs">Article not found</span></div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 page-enter">
      <main className="pt-10 pb-32 flex flex-col items-center px-6">

        {/* Editorial Header */}
        <div className="w-full max-w-3xl mb-10 text-center">
          <Link to="/articles" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-600 hover:text-slate-700 transition-colors mb-4">
            <span className="material-icons text-sm">arrow_back</span> Back to Articles
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="bg-[#eceef0] text-slate-600 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold">
              {article.category?.replace('-', ' ')}
            </span>
            {article.isFeatured && (
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold">
                Featured
              </span>
            )}
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">{article.title}</h2>

          {/* Author + Meta */}
          <div className="flex items-center justify-center gap-4">
            {article.author?.image && (
              <img src={article.author.image} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
            )}
            <div className="text-left">
              <p className="font-sans font-bold text-sm text-slate-900">{article.author?.name}</p>
              <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold">
                <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                {article.readTime && <><span>·</span><span>{article.readTime} min read</span></>}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              {article.views && (
                <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold">
                  <span className="material-icons text-sm">visibility</span>{article.views}
                </span>
              )}
              <button onClick={handleLike} disabled={liked}
                className={`flex items-center gap-1 font-sans text-[10px] uppercase tracking-widest font-bold transition-colors ${liked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                <span className="material-icons text-sm">{liked ? 'favorite' : 'favorite_border'}</span>{article.likes}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-4xl mb-12 rounded-xl overflow-hidden shadow-lg relative">
          <img
            src={article.images?.length > 0 ? article.images[currentImageIndex] : article.coverImage}
            alt={article.title}
            className="w-full aspect-[16/7] object-cover"
          />
          {article.images?.length > 1 && (
            <>
              <button onClick={() => setCurrentImageIndex(p => p === 0 ? article.images.length - 1 : p - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                <span className="material-icons">chevron_left</span>
              </button>
              <button onClick={() => setCurrentImageIndex(p => p === article.images.length - 1 ? 0 : p + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                <span className="material-icons">chevron_right</span>
              </button>
            </>
          )}
        </div>

        {/* Article Body */}
        <div className="w-full max-w-3xl">
          <div className="font-serif text-lg text-slate-700 leading-relaxed whitespace-pre-wrap mb-16">{article.content}</div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mb-12 pb-12 border-b border-slate-200">
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-4">Tags</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-[#eceef0] text-slate-600 px-4 py-2 rounded-md font-sans text-[11px] font-semibold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {article.author?.bio && (
            <div className="mb-12 pb-12 border-b border-slate-200 bg-[#f2f4f6] rounded-xl p-8">
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-6">About the Author</span>
              <div className="flex gap-6">
                {article.author.image && (
                  <img src={article.author.image} alt={article.author.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                )}
                <div>
                  <p className="font-serif text-lg font-bold text-slate-900 mb-2">{article.author.name}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{article.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Related Articles */}
          {article.relatedArticles?.length > 0 && (
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-6">Continue Reading</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.relatedArticles.map((related) => (
                  <Link key={related._id} to={`/articles/${related.slug}`}
                    className="group overflow-hidden rounded-xl bg-[#f2f4f6] hover:shadow-md transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <img src={related.coverImage} alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-sm font-bold text-slate-900 mb-1 line-clamp-2 group-hover:underline">{related.title}</h4>
                      <p className="font-sans text-[11px] text-slate-400 line-clamp-2">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

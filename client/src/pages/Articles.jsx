import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    loadArticles();
  }, [filterCategory]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set('category', filterCategory);
      const data = await api.getArticles(params.toString());
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setFilterCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-white mb-2">Articles & Stories</h1>
        <p className="text-slate-600">Explore Kashmir through words and stories</p>
      </div>

      <FilterBar
        filters={[
          { key: 'category', icon: 'category', placeholder: 'All Categories', options: [
            { value: '', label: 'All Categories' },
            { value: 'heritage', label: 'Heritage & Culture' },
            { value: 'history', label: 'History' },
            { value: 'literature', label: 'Literature' },
            { value: 'poetry', label: 'Poetry' },
            { value: 'travel-stories', label: 'Travel Stories' },
            { value: 'documentaries', label: 'Documentaries' },
          ]},
        ]}
        values={{ category: filterCategory }}
        onChange={(key, val) => handleCategoryChange(val)}
        onClear={() => handleCategoryChange('')}
        count={articles.length}
      />

      {loading ? (
        <div className="text-center py-20 text-slate-600">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-slate-600">No articles found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ListingCard
              key={article._id}
              to={`/articles/${article.slug}`}
              image={article.coverImage}
              title={article.title}
              description={article.excerpt}
              price={`${article.readTime} min`}
              priceUnit=" read"
              tags={[article.category.replace('-', ' '), article.author.name].filter(Boolean)}
              cta="Read now"
            />
          ))}
        </div>
      )}
    </div>
  );
}

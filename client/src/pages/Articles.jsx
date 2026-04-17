import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import FilterBar from '../components/FilterBar';
import ListingCard from '../components/ListingCard';

const fallbackArticles = [
  // Heritage & Culture
  { _id: 'f1', slug: 'khatamband-wooden-ceiling', category: 'heritage', title: "The Lost Art of Khatamband — Kashmir's Wooden Ceiling Craft", excerpt: "Khatamband is an ancient woodworking technique unique to Kashmir, where intricate geometric patterns are assembled without nails. This dying art adorns shrines, houseboats, and heritage homes.", coverImage: '/heritage/craftman-1.jpg', readTime: 8, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f2', slug: 'sufi-shrines-valley', category: 'heritage', title: "Sufi Shrines of the Valley: A Spiritual Map", excerpt: "From Hazratbal to Charar-i-Sharif, Kashmir's Sufi shrines are living monuments of devotion — carrying centuries of stories, music, and syncretic culture.", coverImage: '/heritage/walk-2.jpg', readTime: 12, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f3', slug: 'pashmina-changthang', category: 'heritage', title: "Pashmina: From Changthang Plateau to the World", excerpt: "The journey of Pashmina begins at 14,000 feet with the Changthangi goat. Discover how raw pashm is hand-spun and embroidered into the world's finest shawls.", coverImage: '/heritage/craftman-3.jpg', readTime: 10, author: { name: 'Kashmir Offbeat' } },
  // History
  { _id: 'f4', slug: 'zain-ul-abidin-golden-age', category: 'history', title: "The Reign of Zain-ul-Abidin: Kashmir's Golden Age", excerpt: "Sultan Zain-ul-Abidin, known as Budshah, ushered in an era of religious tolerance, arts, and scholarship in 15th-century Kashmir.", coverImage: '/heritage/monument-2.jpg', readTime: 15, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f5', slug: 'martand-sun-temple', category: 'history', title: "Martand Sun Temple: A Monument Across Time", excerpt: "Built in the 8th century by Lalitaditya Muktapida, the Martand Sun Temple is one of the greatest architectural achievements of ancient Kashmir.", coverImage: '/heritage/monument-4.jpg', readTime: 9, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f6', slug: 'silk-route-kashmir', category: 'history', title: "The Silk Route Through Kashmir", excerpt: "Kashmir was a vital node on the ancient Silk Route, connecting Central Asia with the Indian subcontinent. Traders and scholars traversed these mountain passes for over a millennium.", coverImage: '/heritage/monument-5.jpg', readTime: 11, author: { name: 'Kashmir Offbeat' } },
  // Literature
  { _id: 'f7', slug: 'lal-ded-kashmiri-consciousness', category: 'literature', title: "Lal Ded: The Voice That Shaped Kashmiri Consciousness", excerpt: "Lalleshwari, the 14th-century mystic poet, composed vakhs that transcended religious boundaries. Her verses remain central to Kashmiri literary identity.", coverImage: '/heritage/walk-3.jpg', readTime: 14, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f8', slug: 'agha-shahid-ali', category: 'literature', title: "Agha Shahid Ali and the Country Without a Post Office", excerpt: "Agha Shahid Ali's ghazals and elegies brought Kashmir's pain and beauty to the world stage, redefining diasporic poetry.", coverImage: '/heritage/art-2.jpg', readTime: 10, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f9', slug: 'kashmiri-short-story', category: 'literature', title: "The Kashmiri Short Story Tradition", excerpt: "From Akhtar Mohiuddin to Hriday Kaul Bharati, Kashmir's short fiction captures the valley's joys, sorrows, and absurdities with startling intimacy.", coverImage: '/heritage/art-3.jpg', readTime: 8, author: { name: 'Kashmir Offbeat' } },
  // Poetry
  { _id: 'f10', slug: 'habba-khatoon-nightingale', category: 'poetry', title: "Habba Khatoon: The Nightingale of Kashmir", excerpt: "Habba Khatoon's songs of love and loss, composed in the 16th century, remain part of Kashmir's living oral tradition.", coverImage: '/heritage/walk-4.jpg', readTime: 7, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f11', slug: 'mahjoor-wordsworth-kashmir', category: 'poetry', title: "Mahjoor: The Wordsworth of Kashmir", excerpt: "Peerzada Ghulam Ahmad Mahjoor transformed Kashmiri poetry with his romantic nature verse. His poem 'Walo Ho Baagwano' is Kashmir's unofficial anthem.", coverImage: '/heritage/art-4.jpg', readTime: 9, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f12', slug: 'contemporary-kashmiri-poetry', category: 'poetry', title: "Contemporary Kashmiri Poetry: New Voices", excerpt: "A new generation of Kashmiri poets writes in English, Urdu, and Kashmiri — exploring identity, conflict, and belonging through verse.", coverImage: '/heritage/art-5.jpg', readTime: 6, author: { name: 'Kashmir Offbeat' } },
  // Travel Stories
  { _id: 'f13', slug: 'gurez-valley-week', category: 'travel-stories', title: "A Week in the Gurez Valley: Beyond the Line of Control", excerpt: "Gurez remains one of Kashmir's best-kept secrets — a high-altitude valley with Dard Shin villages, the Kishanganga River, and Habba Khatoon's peak.", coverImage: '/nature/eco-trail.jpg', readTime: 12, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f14', slug: 'srinagar-old-city-dawn', category: 'travel-stories', title: "Walking Through Srinagar's Old City at Dawn", excerpt: "The narrow lanes of downtown Srinagar come alive at dawn — bakers pulling out fresh lavasa, the call to prayer echoing off wooden balconies.", coverImage: '/heritage/downtown-1.jpg', readTime: 8, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f15', slug: 'frozen-lake-marsar', category: 'travel-stories', title: "The Frozen Lake Trek to Marsar", excerpt: "A winter trek to Marsar Lake offers a surreal landscape of frozen water, snow-laden pines, and absolute silence — a story of solitude and wonder.", coverImage: '/nature/1-6.jpg', readTime: 10, author: { name: 'Kashmir Offbeat' } },
  // Documentaries
  { _id: 'f16', slug: 'kashmir-beneath-snow', category: 'documentaries', title: "Kashmir: The Story Beneath the Snow", excerpt: "A visual journey into the winter life of Kashmir — from kangri warmth to frozen Dal Lake, capturing the resilience and beauty of life in sub-zero temperatures.", coverImage: '/nature/3-6.jpg', readTime: 45, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f17', slug: 'weavers-of-light-pashmina', category: 'documentaries', title: "Weavers of Light: The Pashmina Story", excerpt: "Following the complete lifecycle of a Pashmina shawl — from nomadic herders in Ladakh to master weavers in Srinagar.", coverImage: '/heritage/craftman-2.jpg', readTime: 38, author: { name: 'Kashmir Offbeat' } },
  { _id: 'f18', slug: 'last-shikara-makers', category: 'documentaries', title: "The Last Shikara Makers of Dal Lake", excerpt: "A portrait of the craftsmen who build Kashmir's iconic shikaras by hand. Will the craft survive another generation?", coverImage: '/heritage/downtown-3.jpg', readTime: 32, author: { name: 'Kashmir Offbeat' } },
];

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dbArticles, setDbArticles] = useState([]);
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
      setDbArticles(data);
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

  const filtered = filterCategory
    ? fallbackArticles.filter(a => a.category === filterCategory)
    : fallbackArticles;
  const articles = dbArticles.length > 0 ? dbArticles : filtered;

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
              tags={[article.category.replace('-', ' '), article.author?.name].filter(Boolean)}
              cta="Read now"
            />
          ))}
        </div>
      )}
    </div>
  );
}

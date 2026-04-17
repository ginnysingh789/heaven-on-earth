import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import ListingCard from '../components/ListingCard';

const categoryData = {
  '': {
    label: 'All Activities',
    icon: 'sports',
    color: 'bg-[#FF8C00]',
    textColor: 'text-[#FF8C00]',
    borderColor: 'border-[#FF8C00]',
    ringColor: 'ring-[#FF8C00]',
    bgLight: 'bg-orange-50',
    tagline: 'Adventure Sport',
    subtitle: 'Experience thrilling adventure sports in the heart of Kashmir — from snow-capped peaks to rushing rivers.',
    heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=2400&auto=format&fit=crop&q=80',
    highlights: [],
  },
  'himalayan-circuit': {
    label: 'Himalayan Circuit',
    icon: 'landscape',
    color: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-600',
    ringColor: 'ring-emerald-600',
    bgLight: 'bg-emerald-50',
    tagline: 'Kashmir Himalayan Circuit',
    subtitle: 'Traverse the legendary Himalayan routes connecting the most breathtaking valleys, alpine meadows, and glacial lakes of Kashmir.',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'route', title: 'Multi-Day Trails', desc: 'Curated circuits spanning 5–12 days through remote Himalayan passes' },
      { icon: 'photo_camera', title: 'Scenic Vistas', desc: 'Panoramic views of Nanga Parbat, Harmukh, and the Great Lakes' },
      { icon: 'local_florist', title: 'Alpine Meadows', desc: 'Walk through wildflower carpets at 12,000+ ft elevation' },
      { icon: 'groups', title: 'Expert Guides', desc: 'Local mountaineers with decades of Himalayan experience' },
    ],
  },
  skiing: {
    label: 'Skiing',
    icon: 'downhill_skiing',
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
    borderColor: 'border-sky-600',
    ringColor: 'ring-sky-600',
    bgLight: 'bg-sky-50',
    tagline: 'Ski the Himalayas',
    subtitle: 'Gulmarg is Asia\'s premier ski destination with the world\'s highest gondola. Glide through pristine powder on slopes from beginner to black diamond.',
    heroImage: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'ac_unit', title: 'Powder Paradise', desc: 'Average 14m annual snowfall — some of the deepest powder in Asia' },
      { icon: 'trending_up', title: 'All Skill Levels', desc: 'From gentle bunny slopes to extreme backcountry descents' },
      { icon: 'school', title: 'Professional Instructors', desc: 'Certified ski & snowboard coaches for every level' },
      { icon: 'cable', title: 'Gondola Access', desc: 'World\'s highest cable car to Apharwat Peak at 13,780 ft' },
    ],
  },
  offbeat: {
    label: 'Offbeat',
    icon: 'explore',
    color: 'bg-amber-600',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-600',
    ringColor: 'ring-amber-600',
    bgLight: 'bg-amber-50',
    tagline: 'Off The Beaten Path',
    subtitle: 'Discover Kashmir\'s hidden gems far from tourist trails — untouched villages, secret valleys, and experiences known only to locals.',
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'visibility_off', title: 'Hidden Destinations', desc: 'Places like Gurez, Lolab, and Bangus that few tourists ever see' },
      { icon: 'people', title: 'Local Immersion', desc: 'Stay with families, learn crafts, share meals with villagers' },
      { icon: 'nature', title: 'Pristine Nature', desc: 'Untouched meadows, crystal streams, and virgin forests' },
      { icon: 'auto_stories', title: 'Living History', desc: 'Ancient Silk Route paths and centuries-old village traditions' },
    ],
  },
  paragliding: {
    label: 'Paragliding',
    icon: 'paragliding',
    color: 'bg-violet-600',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-600',
    ringColor: 'ring-violet-600',
    bgLight: 'bg-violet-50',
    tagline: 'Fly Over Paradise',
    subtitle: 'Soar above the stunning Kashmir valley — glide over Dal Lake, rice paddies, and snow-kissed peaks with tandem and solo flights.',
    heroImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'air', title: 'Thermal Currents', desc: 'Perfect wind conditions for smooth, extended flights' },
      { icon: 'landscape', title: 'Aerial Views', desc: 'See Dal Lake, the Pir Panjal range, and Shankaracharya Temple from above' },
      { icon: 'verified_user', title: 'Safety First', desc: 'BHPA-certified pilots with tandem dual-control gliders' },
      { icon: 'photo_camera', title: 'GoPro Footage', desc: 'HD video and photos of your flight included' },
    ],
  },
  climbing: {
    label: 'Rock Climbing',
    icon: 'terrain',
    color: 'bg-orange-700',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-700',
    ringColor: 'ring-orange-700',
    bgLight: 'bg-orange-50',
    tagline: 'Conquer the Rocks',
    subtitle: 'From granite boulders in Aru Valley to challenging cliff faces in Pahalgam — test your limits on Kashmir\'s diverse rock formations.',
    heroImage: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'fitness_center', title: 'All Grades', desc: 'Routes from 5a to 8b+ across multiple crags' },
      { icon: 'hardware', title: 'Full Equipment', desc: 'Harnesses, ropes, helmets, and belay devices provided' },
      { icon: 'school', title: 'Certified Belayers', desc: 'Trained climbing instructors ensure safety at every pitch' },
      { icon: 'wb_sunny', title: 'Best Season', desc: 'April to October offers ideal conditions for climbing' },
    ],
  },
  'heli-skiing': {
    label: 'Heli Skiing',
    icon: 'flight',
    color: 'bg-indigo-600',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-600',
    ringColor: 'ring-indigo-600',
    bgLight: 'bg-indigo-50',
    tagline: 'The Ultimate Thrill',
    subtitle: 'Access untouched backcountry powder via helicopter — ski virgin slopes at 14,000+ ft that no lift can reach.',
    heroImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'flight', title: 'Helicopter Access', desc: 'Reach remote peaks impossible to access by any other means' },
      { icon: 'ac_unit', title: 'Untouched Powder', desc: 'Ski slopes that have never been tracked before' },
      { icon: 'shield', title: 'Avalanche Safety', desc: 'Professional avalanche guides and full rescue equipment' },
      { icon: 'star', title: 'Premium Experience', desc: 'Small groups of 4–6 skiers with dedicated helicopter' },
    ],
  },
  cycling: {
    label: 'Cycling',
    icon: 'directions_bike',
    color: 'bg-lime-600',
    textColor: 'text-lime-600',
    borderColor: 'border-lime-600',
    ringColor: 'ring-lime-600',
    bgLight: 'bg-lime-50',
    tagline: 'Pedal Through Paradise',
    subtitle: 'Cycle through saffron fields, along pristine rivers, and over mountain passes — Kashmir\'s diverse terrain is a cyclist\'s dream.',
    heroImage: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'map', title: 'Scenic Routes', desc: 'Curated trails from leisurely lakeside rides to challenging mountain passes' },
      { icon: 'pedal_bike', title: 'Premium Bikes', desc: 'Trek & Specialized mountain bikes maintained to pro standards' },
      { icon: 'restaurant', title: 'Chai Stops', desc: 'Refuel at local dhabas with authentic Kashmiri kahwa and noon chai' },
      { icon: 'speed', title: 'Guided Tours', desc: 'Lead riders, mechanic support, and SAG wagon on every expedition' },
    ],
  },
  rafting: {
    label: 'River Rafting',
    icon: 'rowing',
    color: 'bg-cyan-600',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-600',
    ringColor: 'ring-cyan-600',
    bgLight: 'bg-cyan-50',
    tagline: 'Ride the Rapids',
    subtitle: 'Navigate the roaring Lidder and Sindh rivers through pine-forested gorges — from gentle Grade II floats to intense Grade IV whitewater.',
    heroImage: 'https://images.unsplash.com/photo-1530866495561-507c83e8bae6?w=2400&auto=format&fit=crop&q=80',
    highlights: [
      { icon: 'waves', title: 'Grade II–IV Rapids', desc: 'Options for families, beginners, and adrenaline seekers' },
      { icon: 'shield', title: 'Full Safety Gear', desc: 'Life jackets, helmets, wetsuits, and certified rescue kayakers' },
      { icon: 'nature', title: 'Scenic Gorges', desc: 'Raft through pine forests with Himalayan peaks towering above' },
      { icon: 'group', title: 'Team Building', desc: 'Perfect for corporate groups and families — 6-8 person rafts' },
    ],
  },
};

const categories = [
  '', 'himalayan-circuit', 'offbeat', 'skiing', 'paragliding', 'climbing', 'heli-skiing', 'cycling', 'rafting',
];

export default function Activities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeCategory = searchParams.get('category') || '';
  const catInfo = categoryData[activeCategory] || categoryData[''];

  const setCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      setActivities(allActivities.filter(a => a.category === activeCategory));
    } else {
      setActivities(allActivities);
    }
  }, [activeCategory, allActivities]);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await api.getActivities('');
      setAllActivities(data);
    } catch (err) {
      console.error(err);
      setAllActivities([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Hero Header */}
      <div className="relative py-20 overflow-hidden transition-all duration-500">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${catInfo.heroImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">{catInfo.tagline}</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">{catInfo.subtitle}</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[52px] z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-3 py-5 scrollbar-hide -mx-2 px-2">
            {categories.map((cat) => {
              const info = categoryData[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? `${info.color} text-white shadow-lg scale-105`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span className="material-icons text-[18px]">{info.icon}</span>
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category-specific "What to Expect" section */}
      {activeCategory && catInfo.highlights.length > 0 && (
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-xl ${catInfo.bgLight} flex items-center justify-center`}>
                <span className={`material-icons ${catInfo.textColor} text-xl`}>{catInfo.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">What to Expect</h2>
                <p className="text-slate-500 text-sm">Here's what makes {catInfo.label.toLowerCase()} in Kashmir special</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {catInfo.highlights.map((h, i) => (
                <div key={i} className={`relative rounded-2xl border-2 border-dashed ${catInfo.borderColor}/30 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}>
                  <div className={`w-12 h-12 rounded-xl ${catInfo.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className={`material-icons ${catInfo.textColor} text-2xl`}>{h.icon}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{h.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Activity Listings */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {activeCategory ? catInfo.label : 'All'} Adventures
            </h2>
            <p className="text-slate-500 text-sm mt-1">{activities.length} experience{activities.length !== 1 ? 's' : ''} available</p>
          </div>
          {activeCategory && (
            <button
              onClick={() => setCategory('')}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all"
            >
              <span className="material-icons text-[16px]">close</span>
              Clear filter
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20">
            <div className={`w-20 h-20 mx-auto rounded-full ${catInfo.bgLight} flex items-center justify-center mb-4`}>
              <span className={`material-icons ${catInfo.textColor} text-4xl`}>{catInfo.icon}</span>
            </div>
            <p className="text-slate-600 text-lg font-medium mb-2">No {catInfo.label.toLowerCase()} activities found</p>
            <p className="text-slate-400 text-sm mb-6">Check back soon — new adventures are added regularly!</p>
            <button onClick={() => setCategory('')} className="px-6 py-2.5 bg-[#FF8C00] text-white font-bold text-sm rounded-full hover:bg-[#E67E00] transition-all">
              Browse All Activities
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ListingCard
                key={activity._id}
                to={`/activities/${activity.slug}`}
                image={activity.coverImage}
                title={activity.name}
                description={activity.overview}
                price={`₹${activity.pricing.perPerson.toLocaleString()}`}
                priceUnit="/person"
                tags={[activity.category, activity.location].filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

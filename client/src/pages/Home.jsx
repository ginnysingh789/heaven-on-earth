import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mountain, Home as HomeIcon, Ship, Bike, Landmark, BookOpen, Scissors, Users, MapPin, Package, Star, MessageCircle, Mail } from 'lucide-react';
import api from '../api';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';
import HotelCard from '../components/HotelCard';
import CustomSelect from '../components/CustomSelect';

export default function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [treks, setTreks] = useState([]);
  const [homestays, setHomestays] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchDest, setSearchDest] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState('2');
  const [loading, setLoading] = useState(true);
  const [newsletter, setNewsletter] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const sectionRefs = useRef({});

  // Hero images — highest-resolution local Kashmir photos from /public
  const heroImages = [
            // 55 MB — ultra high-res Kashmir landscape
    '/IMG_5959.JPG',             // 48 MB — ultra high-res Kashmir scene
    '/DJI_20250307210014_0030_D-HDR.JPG',  // 14 MB — DJI HDR drone shot
  ];

  // Auto-sliding background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Change image every 8 seconds
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    Promise.all([
      api.getDestinations().catch(() => []),
      api.getHotels('featured=true').catch(() => []),
      api.getPackages('featured=true').catch(() => []),
      api.getTreks('featured=true').catch(() => []),
      api.getHomestays('featured=true').catch(() => []),
      api.getArticles('featured=true').catch(() => [])
    ])
      .then(([dests, htls, pkgs, trks, homes, arts]) => {
        setDestinations(dests);
        setHotels(htls.slice(0, 3));
        setPackages(pkgs.slice(0, 3));
        setTreks(trks.slice(0, 3));
        setHomestays(homes.slice(0, 3));
        setArticles(arts.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDest) params.set('destination', searchDest);
    navigate(`/hotels?${params.toString()}`);
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletter) return;
    try {
      await api.createEnquiry({
        name: 'Newsletter Subscriber',
        email: newsletter,
        phone: '',
        enquiryType: 'general',
        message: 'Newsletter subscription request',
        groupSize: { adults: 0, children: 0, infants: 0 }
      });
      setNewsletterSubmitted(true);
      setNewsletter('');
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  const quickLinks = [
    { icon: Scissors, label: 'Kashmir Craft Safari', path: '/heritage/kashmir-craftsafari', color: 'bg-rose-500/10', iconColor: 'text-rose-400', delay: '0s' },
    { icon: Mountain, label: 'Trekking', path: '/trekking', color: 'bg-blue-500/10', iconColor: 'text-blue-400', delay: '0.1s' },
    { icon: HomeIcon, label: 'Homestays', path: '/homestays', color: 'bg-green-500/10', iconColor: 'text-green-400', delay: '0.2s' },
    { icon: Ship, label: 'Houseboats', path: '/houseboats', color: 'bg-cyan-500/10', iconColor: 'text-cyan-400', delay: '0.3s' },
    { icon: Bike, label: 'Adventure Sport', path: '/activities', color: 'bg-purple-500/10', iconColor: 'text-purple-400', delay: '0.4s' },
    { icon: Landmark, label: 'Heritage', path: '/heritage', color: 'bg-orange-500/10', iconColor: 'text-orange-400', delay: '0.5s' },
    { icon: BookOpen, label: 'Literature', path: '/literature', color: 'bg-pink-500/10', iconColor: 'text-pink-400', delay: '0.6s' }
  ];

  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 -mt-[72px] pt-[72px]">
        {/* Auto-sliding Background Images with Smooth Crossfade */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              zIndex: index === currentImageIndex ? 2 : 1,
            }}
          >
            <img
              src={img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'low'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
          </div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
            Experience the <span className="text-[#FF8C00] italic">Heaven</span> on Earth
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Curated luxury journeys across the valley, from floating palaces to snow-capped mountain retreats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/packages" className="px-10 py-4 rounded-xl font-bold uppercase tracking-wider bg-[#FF8C00] hover:bg-[#E67E00] text-white transition-all duration-300 shadow-2xl hover:scale-105">
              Explore Packages
            </Link>
            <Link to="/hotels" className="px-10 py-4 rounded-xl font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-all duration-300 backdrop-blur-sm">
              Browse Hotels
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Explore Kashmir</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {quickLinks.map((link, i) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={i}
                  to={link.path}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 text-center overflow-hidden transform hover:-translate-y-2"
                style={{ 
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: link.delay 
                }}
              >
                <div className="relative">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${link.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className={`w-8 h-8 ${link.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{link.label}</p>
                </div>
              </Link>
            );
          })}
          </div>
        </div>
      </section>

      {/* Destination Showcase */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">Discover Kashmir</h2>
              <h3 className="font-serif text-5xl text-slate-900 mb-6">Where Nature Meets Luxury</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                From the serene Dal Lake to the majestic Himalayan peaks, Kashmir offers an unparalleled blend of natural beauty and cultural richness. Experience the magic of this paradise on earth with our carefully curated journeys.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-[#FF8C00] mb-1">50+</div>
                  <div className="text-sm text-slate-600">Destinations</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-[#FF8C00] mb-1">100+</div>
                  <div className="text-sm text-slate-600">Tour Packages</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl shadow-2xl w-full h-64 overflow-hidden">
                <img src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1776174339/kashmir-travels/1000094508.jpg" alt="Dal Lake" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl shadow-2xl w-full h-64 overflow-hidden mt-8">
                <img src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1776174357/kashmir-travels/1000094717.jpg" alt="Gulmarg" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All-in-One Travel Support */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">All-in-One Travel Support</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Discover beautifully crafted Kashmir and Ladakh tours that blend convenience, culture, and extraordinary experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mountain Trails */}
            <div className="bg-white border-2 border-dashed border-[#FF8C00] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">terrain</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mountain Trails</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Guided Himalayan adventures crafted for every explorer.
              </p>
            </div>

            {/* Journeys */}
            <div className="bg-white border-2 border-dashed border-[#FF8C00] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">explore</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Journeys</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Handpicked Kashmir & Ladakh trips made simple.
              </p>
            </div>

            {/* Local Experiences */}
            <div className="bg-white border-2 border-dashed border-[#FF8C00] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">local_activity</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Local Experiences</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enjoy top activities that bring Kashmir's beauty to life.
              </p>
            </div>

            {/* Travel Essentials */}
            <div className="bg-white border-2 border-dashed border-[#FF8C00] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">luggage</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Travel Essentials</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Easy, reliable rentals for smooth travel across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Treasures of Kashmir */}
      <section className="py-20 bg-[#faf8f5] relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#FF8C00 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#FF8C00] font-serif italic text-lg mb-2">Featured Tours</p>
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 font-bold mb-4">Hidden Treasures Of Kashmir</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
              Kashmir is not just about its iconic landmarks; it's about the soul of its people, the tapestry of its history, and the richness of its culture. Our mission is to showcase Kashmir beyond the ordinary narrative, offering glimpses into the authentic heart of the region.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* North Kashmir */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#FFF3E0] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}>
                <svg className="w-10 h-10 text-[#FF8C00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21l4-10 4 10" /><path d="M2 21l4-10 4 10" /><path d="M14 21l4-10 4 10" /><path d="M6 11l2-4 2 4" /><path d="M14 11l2-4 2 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">North Kashmir</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Venture into picturesque villages like Bungus, Lolab, Keran, and the historic charm of Uri and Gurez, each with unique culture and heritage.</p>
            </div>
            {/* Central Kashmir */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#FFF3E0] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}>
                <svg className="w-10 h-10 text-[#FF8C00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M6 8h4v8H6z" /><path d="M14 8h4v8h-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Central Kashmir</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Explore the idyllic beauty of Yousmarg, the rustic charm of Lar, and the timeless village of Kangan.</p>
            </div>
            {/* South Kashmir */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#FFF3E0] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}>
                <svg className="w-10 h-10 text-[#FF8C00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">South Kashmir</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Delve into verdant valleys and cascading waterfalls in Tral, Dachsara, Hirpora, and Daksum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section 
        id="hotels-section"
        ref={el => sectionRefs.current['hotels'] = el}
        className={`bg-gray-50 py-16 transition-all duration-1000 ${visibleSections['hotels-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">Handpicked Stays</h2>
            <h3 className="font-serif text-4xl text-slate-900">Luxury Hotels & Resorts</h3>
          </div>
          <Link to="/hotels" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105 group">
            View All 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-20 text-slate-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)}
          </div>
        )}
        </div>
      </section>

      {/* Featured Packages */}
      {packages.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">Curated Experiences</h2>
              <h3 className="font-serif text-4xl text-slate-900">Tour Packages</h3>
            </div>
            <Link to="/packages" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105 group">
              View All 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <Link key={pkg._id} to={`/packages/${pkg.slug}`} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img src={pkg.coverImage} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <h4 className="text-base font-bold text-slate-900 leading-tight">{pkg.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{pkg.overview}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.8
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {pkg.duration.days}D / {pkg.duration.nights}N
                    </span>
                    {pkg.highlights && pkg.highlights[0] && (
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">{pkg.highlights[0]}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a href={buildWhatsAppUrl(pkg.name)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href={buildEmailUrl(pkg.name)} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200">
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Featured Treks */}
      {treks.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">Adventure Awaits</h2>
              <h3 className="font-serif text-4xl text-slate-900">Himalayan Treks</h3>
            </div>
            <Link to="/trekking" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105 group">
              View All 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treks.map(trek => (
              <Link key={trek._id} to={`/trekking/${trek.slug}`} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img src={trek.coverImage} alt={trek.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <h4 className="text-base font-bold text-slate-900 leading-tight">{trek.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{trek.overview}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.7
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">{trek.difficulty}</span>
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">{trek.duration.days} Day Trek</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a href={buildWhatsAppUrl(trek.name)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href={buildEmailUrl(trek.name)} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200">
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Featured Homestays */}
      {homestays.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">Authentic Living</h2>
              <h3 className="font-serif text-4xl text-slate-900">Local Homestays</h3>
            </div>
            <Link to="/homestays" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105 group">
              View All 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homestays.map(home => (
              <Link key={home._id} to={`/homestays/${home.slug}`} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img src={home.coverImage} alt={home.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <h4 className="text-base font-bold text-slate-900 leading-tight">{home.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{home.description || 'Experience authentic Kashmiri hospitality in the heart of the valley.'}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9
                    </span>
                    {home.isVerified && (
                      <span className="bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Verified</span>
                    )}
                    {home.amenities && home.amenities[0] && (
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">{home.amenities[0]}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a href={buildWhatsAppUrl(home.name)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href={buildEmailUrl(home.name)} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200">
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">Stories & Insights</h2>
              <h3 className="font-serif text-4xl text-slate-900">Travel Literature</h3>
            </div>
            <Link to="/articles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold text-sm rounded-full shadow-lg shadow-orange-200 transition-all duration-200 hover:scale-105 group">
              View All 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map(article => (
              <Link key={article._id} to={`/literature/${article.slug}`} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow">
                    {article.readTime} min read
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <h4 className="text-base font-bold text-slate-900 leading-tight line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{article.author.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.8
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                      {article.category.replace('-', ' ')}
                    </span>
                  </div>
                  <button className="mt-3 w-full py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200">
                    Read now
                  </button>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Why Choose Offbeat Kashmir Exploration */}
      <section className="bg-[#FF8C00] py-20 relative overflow-hidden">
        {/* Decorative orange texture overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image + Text */}
            <div>
              <p className="text-white/80 font-serif italic text-lg mb-2">Why Us</p>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-8">
                Why Choose Offbeat<br />Kashmir Exploration?
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/IMG_5959.JPG"
                  alt="Kashmir Snow Forest"
                  className="w-full h-72 md:h-80 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Right: 6 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: 'edit_note', title: 'Specialist-Led Tours', desc: 'Every tour is led by a local field expert, enriching your journey with deep insights and unique knowledge.' },
                { icon: 'explore', title: 'Offbeat Experiences', desc: 'Escape the usual tourist traps with our bespoke adventures, designed to uncover the hidden gems and lesser-known wonders of Kashmir.' },
                { icon: 'tune', title: 'Personalized Service', desc: "From your first enquiry to the moment you bid farewell, our personalized service ensures that your journey is tailored to your unique preferences." },
                { icon: 'menu_book', title: 'Local Insight', desc: "Benefit from the deep knowledge of our local guides, who bring Kashmir's rich culture and history to life, guiding you to places known only to those who call it home." },
                { icon: 'groups', title: 'Authentic Encounters', desc: "Immerse yourself in the true essence of Kashmir by engaging with local villagers, learning age-old traditions, and savoring authentic Kashmiri cuisine." },
                { icon: 'auto_awesome', title: 'Memorable Journeys', desc: 'Whether a scenic hike or a cultural exchange, our offbeat exploration promises memorable encounters that deepen your appreciation for this enchanting region.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-full bg-[#FFF3E0] flex items-center justify-center mb-3">
                    <span className="material-icons text-[#FF8C00] text-xl">{item.icon}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">Testimonials</h2>
            <h3 className="font-serif text-4xl text-slate-900">What Our Travelers Say</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', location: 'Mumbai', text: 'An absolutely magical experience! The houseboat stay on Dal Lake was beyond our expectations. The team arranged everything perfectly.', rating: 5 },
              { name: 'Rajesh Kumar', location: 'Delhi', text: 'The Kashmir Great Lakes trek was the adventure of a lifetime. Professional guides, stunning views, and impeccable organization.', rating: 5 },
              { name: 'Anita Desai', location: 'Bangalore', text: 'Stayed at a beautiful homestay in Pahalgam. The warmth of Kashmiri hospitality combined with modern amenities made it perfect.', rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="material-icons text-[#FF8C00] text-xl">star</span>
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6 leading-relaxed text-base">{testimonial.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                    <span className="material-icons text-primary">person</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-secondary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated with Kashmir Travels</h3>
          <p className="text-blue-100 mb-8">Get exclusive deals, travel tips, and stories from the valley delivered to your inbox.</p>
          {newsletterSubmitted ? (
            <div className="bg-success/20 border border-success/30 rounded-xl p-4 text-success animate-pulse">
              ✓ Thank you for subscribing! Check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/30">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

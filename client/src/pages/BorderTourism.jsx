import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Camera, ChevronLeft, ChevronRight, Video, Share2, MessageCircle, Mail } from 'lucide-react';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';

const borderTourismItems = [
  {
    id: 'border-tourism',
    title: 'Border Tourism',
    subtitle: 'Jammu & Kashmir',
    coverImage: 'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      '/tourism/border-1.jpg',
      '/tourism/border-2.jpg',
      '/tourism/border-3.jpg',
      '/tourism/border-4.jpg',
      '/tourism/border-5.jpg',
      '/tourism/border-6.jpg',
    ],
    videoCount: 1,
    photoCount: 6,
    description: "Amidst the conflict, the border areas of Kashmir have remained untouched and undiscovered by mainstream tourism. While many may hesitate to venture into these regions, they hold a unique allure that beckons the adventurous spirit. Join us as we embark on a journey to explore the lesser-known border areas of Gurez, Machil, Keran, Poonch, and Rajouri, where the untouched landscapes and preserved culture await.",
    sections: [
      {
        heading: 'Discover the Hidden Charms of Kashmir',
        items: [
          { title: 'Preserved Culture and Natural Splendor', body: 'The lack of intervention from the outside world has allowed these border areas to retain their traditional culture and pristine natural beauty. Here, amidst rugged mountains and verdant forests, ancient customs and traditions thrive, offering a glimpse into a way of life untouched by modernity.' },
          { title: 'Exploring the Uncharted', body: 'Venture off the beaten path and discover the hidden treasures of Gurez, Machil, Keran, Poonch, and Rajouri. Traverse winding trails that lead to remote villages, where unparalleled hospitality awaits from the warm-hearted locals. Immerse yourself in the tranquility of untouched forests and the serenity of secluded valleys.' },
          { title: 'Embracing Adventure', body: 'Embark on thrilling adventures as we journey through these border areas. From exhilarating treks amidst towering peaks to traversing rugged terrain, every moment promises an unforgettable experience. Feel the adrenaline rush as you conquer nature\'s challenges and forge unforgettable memories.' },
        ]
      },
      {
        heading: 'Why Choose Border Tourism with Us?',
        items: [
          { title: 'Local Expertise', body: 'Our experienced guides are intimately familiar with the border areas of Kashmir, ensuring a safe and enriching journey. Their insights into the local culture and geography will enhance your experience and deepen your appreciation for these hidden gems.' },
          { title: 'Responsible Travel', body: 'We prioritize sustainable and responsible travel practices, ensuring minimal impact on the environment and respect for local communities. By choosing border tourism with us, you contribute to the preservation of these pristine landscapes and cultures.' },
          { title: 'Cultural Exchange', body: 'Border tourism offers a unique opportunity to engage in meaningful cultural exchange with the resilient communities of Kashmir. Experience unparalleled hospitality from the locals and gain a deeper understanding of their way of life.' },
        ]
      },
    ],
  },
];

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=-sKTAtRELX4&t=3s';

function BorderTourismDetail({ item }) {
  const [slide, setSlide] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const gallery = item.images && item.images.length > 0 ? item.images : [item.coverImage];

  const prev = useCallback(() => setSlide(s => (s - 1 + gallery.length) % gallery.length), [gallery.length]);
  const next = useCallback(() => setSlide(s => (s + 1) % gallery.length), [gallery.length]);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % gallery.length), 4000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setLightboxIdx(i => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIdx, gallery.length]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-16">

        {/* Back link */}
        <Link
          to="/border-tourism"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Border Tourism
        </Link>

        {/* Title block */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" />
            {item.subtitle}
          </span>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-3 mb-6">
          {item.videoCount > 0 && (
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Video className="w-3.5 h-3.5 text-[#FF8C00]" /> View video
            </a>
          )}
          <button onClick={() => setLightboxIdx(0)} className="flex items-center gap-1.5 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Camera className="w-3.5 h-3.5 text-[#FF8C00]" /> {item.photoCount} photos
          </button>
          <a
            href={buildWhatsAppUrl(item.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Enquire Now
          </a>
          <a
            href={buildEmailUrl(item.title)}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> Email Query
          </a>
        </div>

        {/* 3-image carousel with smooth crossfade */}
        <div className="relative w-full mb-10 select-none">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((offset) => {
              const idx = (slide + offset) % gallery.length;
              return (
                <div key={offset} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 cursor-pointer" onClick={() => setLightboxIdx(idx)}>
                  {gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${item.title} ${i + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                        idx === i ? 'opacity-100' : 'opacity-0'
                      }`}
                      draggable={false}
                    />
                  ))}
                </div>
              );
            })}
          </div>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all z-10"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all z-10"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
          <div className="flex justify-center gap-1.5 mt-3">
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all duration-300 ${slide % gallery.length === i ? 'bg-[#FF8C00] w-6' : 'bg-slate-300 w-2'}`} />
            ))}
          </div>
        </div>

        {/* Article: orange bold main heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF8C00] leading-snug mb-5 font-serif">
          Border Tourism: Discovering the Untouched Beauty
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-10">{item.description}</p>

        {/* Sections rendered as bold-title bullet lists */}
        {item.sections.map((section, si) => (
          <div key={si} className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-5">{section.heading}</h3>
            <ul className="space-y-4">
              {section.items.map((entry, ei) => (
                <li key={ei} className="flex gap-3 text-base leading-relaxed">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#FF8C00] shrink-0" />
                  <span className="text-slate-600">
                    <strong className="text-slate-900 font-bold">{entry.title}:</strong>{' '}
                    {entry.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Closing CTA */}
        <div className="bg-orange-50 rounded-2xl p-8 text-center">
          <p className="text-base text-slate-700 leading-relaxed mb-6">
            Embark on an adventure of a lifetime as we journey into the heart of Kashmir's border areas. Let us unveil the hidden treasures and untapped potential of Gurez, Machil, Keran, Poonch, and Rajouri, where every moment is a testament to the beauty of the unexplored. Your border tourism adventure awaits!
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={buildWhatsAppUrl('Border Tourism')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
            </a>
            <a
              href={buildEmailUrl('Border Tourism')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all"
            >
              <Mail className="w-5 h-5" /> Email Query
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + gallery.length) % gallery.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all z-10">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <img src={gallery[lightboxIdx]} alt={item.title} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % gallery.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all z-10">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all">
            <span className="text-white text-xl font-bold">✕</span>
          </button>
          <div className="absolute bottom-6 text-white/70 text-sm">{lightboxIdx + 1} / {gallery.length}</div>
        </div>
      )}
    </div>
  );
}

export default function BorderTourism() {
  const { id } = useParams();
  const item = id ? borderTourismItems.find(h => h.id === id) : null;

  if (id && item) {
    return <BorderTourismDetail item={item} />;
  }

  // Single-item page — go straight to detail
  if (borderTourismItems.length === 1) {
    return <BorderTourismDetail item={borderTourismItems[0]} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&w=2400)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-icons text-[#FF8C00] text-sm">flag</span>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-300">Explore</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Border Tourism</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">
            Discover the untouched beauty and preserved culture of Kashmir's border areas.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borderTourismItems.map((item) => (
            <Link
              key={item.id}
              to={`/border-tourism/${item.id}`}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
                  <span className="material-icons text-[13px]">photo_library</span>
                  {item.photoCount} photos
                </div>
              </div>
              <div className="flex flex-col flex-1 p-4 gap-2">
                <h4 className="text-base font-bold text-slate-900 leading-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-icons text-[13px] text-[#FF8C00]">location_on</span>
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">Border Area</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <a
                    href={buildWhatsAppUrl(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={buildEmailUrl(item.title)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

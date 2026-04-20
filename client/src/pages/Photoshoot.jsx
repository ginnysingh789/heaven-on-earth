import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Camera, ChevronLeft, ChevronRight, Video, Share2, MessageCircle, Mail } from 'lucide-react';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';

const photoshootItems = [
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Photoshoot',
    subtitle: 'Jammu & Kashmir',
    coverImage: '/photoshoot/pre-1.jpg',
    images: [
      "/photoshoot/pre-1.jpg",
      "/photoshoot/pre-2.jpg",
      "/photoshoot/pre-3.jpg",
      "/photoshoot/pre-4.jpg",
      "/photoshoot/pre-5.jpg",
      "/photoshoot/pre-6.jpg",
     
    ],
    videoCount: 1,
    photoCount: 6,
    description: "Make your special day truly unforgettable with a destination wedding tour in the breathtaking landscapes of Jammu & Kashmir. Whether it's a pre-wedding photoshoot, post-wedding celebration, or mesmerizing outdoor wedding ceremony, choose the enchanting backdrop of Kashmir to enhance every moment of your wedding experience. Our professional team is dedicated to ensuring that your wedding extravaganza is nothing short of spellbinding.",
    sections: [
      {
        heading: 'Where Every Moment Becomes a Timeless Memory',
        items: [
          { title: 'Pre-Wedding Photoshoot', body: 'Capture the magic of your love story amidst the stunning vistas of Kashmir with a pre-wedding photoshoot like no other. From the picturesque valleys to the tranquil lakes, every frame will be infused with romance and beauty, creating memories that you will cherish for a lifetime.' },
          { title: 'Post-Wedding Celebration', body: 'After saying "I do," continue the celebrations in style against the backdrop of Kashmir\'s majestic mountains and serene landscapes. Whether it\'s a lavish reception or an intimate gathering, our team will curate every detail to perfection, ensuring that your post-wedding celebration is a dream come true.' },
          { title: 'Mesmerizing Outdoor Wedding Destinations', body: 'Exchange vows surrounded by the natural splendor of Jammu & Kashmir, where every corner offers a picturesque setting for your special day. From lush gardens to historic landmarks, from charming hill stations to luxurious resorts, the options for outdoor wedding destinations are endless. Our team will assist you in selecting the perfect venue and orchestrating a ceremony that exceeds your wildest dreams.' },
        ]
      },
      {
        heading: 'Why Choose Wedding Tours with Us?',
        items: [
          { title: 'Expert Planning', body: 'Our experienced team specializes in creating unforgettable wedding experiences, from concept to execution. We handle every detail with precision and care, ensuring that your wedding tour is seamless and stress-free.' },
          { title: 'Bespoke Experiences', body: 'Whether you envision a fairytale wedding in a palace or a rustic celebration in the mountains, we tailor our services to match your unique vision and preferences, making your dream wedding a reality.' },
          { title: 'Unparalleled Beauty', body: 'With its breathtaking landscapes and romantic ambiance, Jammu & Kashmir provides a naturally stunning backdrop for your wedding festivities. Let the beauty of Kashmir elevate your wedding experience to new heights.' },
        ]
      },
    ],
  },
  {
    id: 'photographers-paradise',
    title: "Photographer's Paradise",
    subtitle: 'Jammu & Kashmir',
    coverImage: '/photoshoot/paradise-4.jpg',
    images: [


     "/photoshoot/paradise-3.jpg",
     "/photoshoot/paradise-4.jpg",
     "/photoshoot/paradise-5.jpg",
     "/photoshoot/paradise-6.jpg",
    ],
    videoCount: 1,
    photoCount: 4,
    description: "Venture into the enchanting landscapes of Jammu & Kashmir, where every corner unveils a picturesque tableau waiting to be captured through the lens. From vast freshwater lakes to majestic mountains, from serene rivers to charming hill stations, and from ancient urban centers to culturally rich villages, Kashmir offers a plethora of photographic opportunities that are nothing short of breathtaking.",
    sections: [
      {
        heading: "Through the Lens: Immortalizing Jammu & Kashmir's Timeless Beauty",
        items: [
          { title: 'Scenic Wonders', body: 'Embark on a visual journey across the region\'s diverse landscapes, including the expansive freshwater lakes of Wular, Manasbal, and Dal, each reflecting the surrounding beauty in its own unique way. The fast-flowing rivers of Sindh, Lidder, Vishaw, and Chenab carve their paths through verdant valleys, while the slow meandering Jhelum adds a serene touch to the landscape.' },
          { title: 'Majestic Mountains', body: 'Capture the grandeur of the mighty Pir Panjal, Kazinag, and Trikuta hills as they tower over the landscape, their peaks shrouded in mist and mystery. These imposing mountains provide a dramatic backdrop for your photography, offering endless opportunities for stunning compositions.' },
          { title: 'Enchanting Meadows and Hill Stations', body: 'Explore the idyllic alpine meadows of Tosh Maidan and Rainuer, where carpets of wildflowers stretch as far as the eye can see, creating a painterly scene that begs to be captured. Journey to charming hill stations like Sonamarg, Gulmarg, Pahalgam, and Patnitop, where panoramic views and quaint architecture await your lens.' },
          { title: 'Ancient Urban Centers and Villages', body: 'Wander through the ancient streets of Srinagar, Jammu, Anantnag, and Baramulla, where time seems to stand still amidst historic architecture and bustling bazaars. Venture into the heart of rural Kashmir, where centuries-old villages preserve traditions and culture, providing a glimpse into the timeless way of life in the region.' },
        ]
      },
      {
        heading: 'Discover the Difference: Embark on Unforgettable Photography Trails with Us!',
        items: [
          { title: 'Expert Guidance', body: 'Our experienced guides are passionate about photography and the beauty of Kashmir, offering valuable insights and tips to help you capture the perfect shot.' },
          { title: 'Tailored Experiences', body: 'Whether you\'re a seasoned photographer or a novice enthusiast, our photography trails are designed to cater to all skill levels, ensuring a fulfilling and rewarding experience.' },
          { title: 'Unforgettable Memories', body: 'Join us as we explore the hidden gems and iconic landmarks of Kashmir, creating memories that will last a lifetime through the art of photography.' },
        ]
      },
    ],
  },
];

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=-sKTAtRELX4&t=3s';

function PhotoshootDetail({ item }) {
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
          to="/photoshoot"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Photoshoot
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
            target="_blank" rel="noopener noreferrer"
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

        {/* Article heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF8C00] leading-snug mb-5 font-serif">
          {item.id === 'pre-wedding'
            ? 'Elevate Your Wedding Experience: Destination Wedding Tours in Jammu & Kashmir'
            : "Capturing Jammu & Kashmir: A Photographer's Paradise"}
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
            {item.id === 'pre-wedding'
              ? 'Embark on a journey of love and celebration with our destination wedding tours in Jammu & Kashmir. Let us create a wedding experience that is as enchanting and unforgettable as your love story. Your happily ever after begins here!'
              : 'Embark on a photographic adventure through the stunning landscapes and cultural treasures of Jammu & Kashmir. Let your creativity soar as you capture the essence of this mesmerizing region, one frame at a time. Your journey into the visual wonders of Kashmir begins here!'}
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={buildWhatsAppUrl(item.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
            </a>
            <a
              href={buildEmailUrl(item.title)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all"
            >
              <Mail className="w-5 h-5" /> Email Query
            </a>
          </div>
        </div>

        {/* You May Also Like */}
        {photoshootItems.length > 1 && (
          <div className="mt-14 pt-8 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">You May Like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photoshootItems.filter(h => h.id !== item.id).slice(0, 3).map(other => (
                <Link key={other.id} to={`/photoshoot/${other.id}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img src={other.coverImage} alt={other.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#FF8C00] transition-colors">{other.title}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF8C00]" />{other.subtitle}
                    </p>
                    <button className="mt-2 w-full text-[11px] font-semibold text-white bg-[#FF8C00] hover:bg-[#E67E00] rounded-lg py-1 transition-colors">
                      Explore
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

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

export default function Photoshoot() {
  const { id } = useParams();
  const item = id ? photoshootItems.find(h => h.id === id) : null;

  if (id && item) {
    return <PhotoshootDetail item={item} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=2400)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-icons text-[#FF8C00] text-sm">photo_camera</span>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-300">Explore</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Photoshoot</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">
            Capture the ethereal beauty of Kashmir through destination weddings and guided photography tours.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoshootItems.map((item) => (
            <Link
              key={item.id}
              to={`/photoshoot/${item.id}`}
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
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">Photography</span>
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
                    target="_blank" rel="noopener noreferrer"
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

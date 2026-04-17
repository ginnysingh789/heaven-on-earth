import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bookmark, Star, ArrowLeft, MapPin, Camera, ChevronLeft, ChevronRight, Video, Share2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const heritageItems = [
  {
    id: 'downtown-heritage-walk',
    title: "Downtown Heritage Walk",
    location: "Srinagar",
    description: "Embark on a captivating journey through time as we unravel the layers of history that have shaped Srinagar into one of the oldest cities in the world.",
    coverImage: "/heritage/downtown-1.jpg",
    images: [
      "/heritage/downtown-1.jpg",
      "/heritage/downtown-2.jpg",
      "/heritage/downtown-3.jpg",
      "/heritage/downtown-4.jpg",
      
    ],
    photos: 4,
    tags: ["Architecture", "Islamic Heritage", "Mughal Era"],
    rating: 4.9,
    sections: [
      {
        heading: "Chronicles of Civilisation: Srinagar's Ever-Changing Landscape",
        items: [
          { title: "Buddhist Legacy", body: "Trace the footsteps of ancient civilisations as you explore Srinagar's rich heritage. From Buddhist influences to the rise of Hinduism, witness how each era has contributed to the city's cultural mosaic." },
          { title: "Islamic Architecture", body: "Marvel at the grandeur of Islamic architecture as we visit iconic landmarks such as Jamia Masjid, Khankah-i-Maula, Nakshband Sahib and more. These structures stand as testaments to the city's Muslim heritage, each telling a unique story of devotion and artistic brilliance." },
          { title: "Mughal Era Splendour", body: "Discover the remnants of Hindu architecture that have withstood the test of time. From ancient temples to sacred shrines, the Downtown Heritage Walk unveils the syncretism of diverse cultural influences." },
          { title: "Hindu Architectural Marvels", body: "Step into the opulent world of Mughal architecture with a visit to places like Hari Parbat fort. Admire the intricate details and strategic design that define this fortress, offering a glimpse into the grandeur of the Mughal era." },
        ],
      },
      {
        heading: "Every Lane, a City: Exploring the Microcosms of Downtown",
        items: [
          { title: "Traditional Houses", body: "Wander through the narrow lanes lined with century-old traditional houses. Admire the intricate woodwork, latticed windows, and unique architectural styles that have been passed down through generations." },
          { title: "Living Narratives", body: "Engage with the locals and listen to the living narratives that echo through the labyrinthine lanes. The people of Downtown embody the spirit of the city, each with their own stories to share about its evolution and resilience." },
        ],
      },
      {
        heading: "Expert-Guided Heritage Exploration",
        items: [
          { title: "Architectural Insights", body: "Our expert guides provide insightful commentary on the architectural marvels, offering a deeper understanding of the cultural, religious, and historical significance embedded in each structure." },
          { title: "Cultural Preservation", body: "Experience a commitment to cultural preservation as we explore heritage sites carefully maintained to retain their authenticity." },
        ],
      },
    ],
  },
  {
    id: 'kashmirs-craftsmanship',
    title: "Kashmir's Craftsmanship",
    location: "Kashmir",
    description: "Embark on a voyage of discovery through Kashmir's rich tradition of handicrafts, where skilled artisans weave tales of heritage and craftsmanship through their intricate creations.",
    coverImage: "/heritage/craftman-3.jpg",
    images: [
      "/heritage/craftman-1.jpg",
      "/heritage/craftman-2.jpg",
      "/heritage/craftman-3.jpg",
      "/heritage/craftman-4.jpg",
    ],
    photos: 4,
    tags: ["Handicrafts", "Textiles", "UNESCO Crafts"],
    rating: 4.8,
    sections: [
      {
        heading: "Unveiling Kashmir's Artistry",
        items: [
          { title: "A Wealth of Textiles", body: "Kashmir's textile heritage is as diverse as it is exquisite. Silk, wool, and tweed are masterfully transformed into luxurious fabrics, cherished for their softness, warmth, and timeless elegance. The intricate patterns and vibrant colours reflect centuries of artisanal expertise passed down through generations." },
          { title: "UNESCO Recognition", body: "Srinagar's inclusion in UNESCO's Creative Cities Network under the Crafts and Folk Arts category is a testament to the city's enduring legacy as a hub of creativity and craftsmanship." },
          { title: "Artisanal Excellence", body: "Explore the bustling markets and artisan workshops of Kashmir, where skilled craftsmen demonstrate their mastery over papier-mâché, wood carving, and embroidery. Each piece is a labour of love, showcasing the artisan's dedication to preserving age-old traditions while embracing innovation." },
          { title: "Supporting Sustainable Practices", body: "At the heart of Kashmir's craft culture lies a commitment to sustainability and ethical practices. Many artisans employ traditional methods and locally sourced materials, ensuring minimal environmental impact and supporting local communities." },
        ],
      },
      {
        heading: "Expert-Guided Craft Exploration",
        items: [
          { title: "Curated Experiences", body: "Our craft trails offer curated experiences that provide insight into the rich heritage and craftsmanship of Kashmir. From guided tours of artisan workshops to hands-on demonstrations, we ensure an immersive and educational journey." },
          { title: "Direct Support to Artisans", body: "We are committed to supporting local artisans and preserving traditional crafts. By participating in our craft trails, you directly contribute to the livelihoods of these skilled craftsmen and women." },
          { title: "Cultural Enrichment", body: "Beyond shopping, our craft trails provide opportunities for cultural exchange and enrichment. Gain a deeper understanding of Kashmir's artistic traditions and connect with the artisans who breathe life into these timeless creations." },
        ],
      },
    ],
  },
  {
    id: 'monuments',
    title: "Monuments",
    location: "Naranag",
    description: "Journey through the cultural resilience of Jammu & Kashmir — from Ashoka's legacy to Mughal grandeur, Sikh heritage, and the Dogra renaissance. Each monument narrates stories etched in stone.",
    coverImage: "/heritage/monument-3.jpg",
    images: [
      "/heritage/monument-1.png",
      "/heritage/monument-2.jpg",
      "/heritage/monument-4.jpg",
      "/heritage/monument-5.jpg"
     
    ],
    photos: 4,
    tags: ["History", "Archaeology", "Dynasties"],
    rating: 4.7,
    sections: [
      {
        heading: "Unveiling Ancient Monuments, One Stone at a Time",
        items: [
          { title: "Ashoka's Legacy", body: "As far back as the time of Ashoka, the Mauryan emperor, the region saw the establishment of monuments that reflected the imperial influence. These early structures laid the groundwork for the architectural journey that Jammu and Kashmir would embark upon." },
          { title: "Hindu and Buddhist Synthesis", body: "The subsequent centuries witnessed the synthesis of Hindu and Buddhist elements, giving rise to architectural marvels that seamlessly blended both influences. Monuments like temples and stupas from this period showcase the artistic excellence achieved through this cultural fusion." },
          { title: "Mughal Grandeur", body: "With the advent of the Mughals, Jammu and Kashmir became a canvas for grand architectural expressions. The Mughal gardens, forts, and mosques dotting the landscape stand as a testament to their refined taste and commitment to creating enduring monuments." },
          { title: "Sikh Heritage", body: "During the Sikh rule, monuments reflecting the Sikh architectural style were erected. Gurdwaras, showcasing the unique blend of Islamic and Hindu architectural elements, were constructed, adding another layer to the cultural narrative of the region." },
        ],
      },
      {
        heading: "Step into the Past, Walk Through History",
        items: [
          { title: "Dogra Renaissance", body: "The Dogra period marked a renaissance in architectural pursuits. Palaces, forts, and temples commissioned by the Dogra rulers became landmarks that celebrated the region's heritage. The impressive architecture from this era exemplifies a fusion of indigenous styles with influences from Central Asia." },
          { title: "Cultural Kaleidoscope", body: "The monuments across Jammu and Kashmir collectively form a cultural kaleidoscope, displaying influences from various dynasties. Each structure stands not only as a physical testament to the past but also as a living embodiment of the resilience of the region's culture." },
        ],
      },
    ],
  },
  {
    id: 'spiritual-walk',
    title: "Spiritual Walk",
    location: "Srinagar",
    description: "A transcendent journey through Sufi shrines, ancient temples, and sacred Gurudwaras across Jammu & Kashmir — where devotion transcends religious boundaries.",
    coverImage: "/heritage/walk-1.jpg",
    images: [
     "/heritage/walk-2.jpg",
     "/heritage/walk-3.jpg",
     "/heritage/walk-4.jpg",
     "/heritage/walk-5.jpg",
    ],
    photos: 4,
    tags: ["Sufi Circuit", "Temple Circuit", "Gurudwara"],
    rating: 4.9,
    sections: [
      {
        heading: "Sufi Circuit: Mystical Whispers of Devotion",
        items: [
          { title: "Chari Sharief Shrine", body: "Discover the divine aura of Chari Sharief, a revered Sufi shrine that draws devotees seeking spiritual solace." },
          { title: "Pakherpora Shrine", body: "Immerse yourself in the serenity of Pakherpora Shrine, where Sufi mysticism intertwines with the beauty of natural surroundings." },
          { title: "Aishmuqam Shrine", body: "Journey to Aishmuqam Shrine, a site steeped in Sufi traditions, and feel the palpable spirituality that resonates within its walls." },
          { title: "Dargah Hazratbal", body: "Witness the grace of Dargah Hazratbal, a sacred shrine on the shores of Dal Lake, radiating a sense of tranquillity and reverence." },
        ],
      },
      {
        heading: "Temple Circuit",
        items: [
          { title: "Payar Temple", body: "Discover the spiritual energy at Payar Temple, a place of worship ensconced amidst the breathtaking landscapes." },
          { title: "Martand Temple", body: "Step into the ruins of Martand Temple, an architectural marvel that echoes the glory of the area's Hindu past." },
          { title: "Tulmullah Temple", body: "Experience the divine vibrations of Tulmullah Temple, where centuries-old rituals intertwine with the scenic beauty of the region." },
          { title: "Ragunath Temple & Mata Vishno Devi", body: "Embark on a sacred pilgrimage to the revered temples, including Ragunath Temple and the sacred abode of Mata Vishno Devi." },
        ],
      },
      {
        heading: "Gurudwara Circuit: Tranquil Reflections of Faith",
        items: [
          { title: "Chatipadshahi Gurudwara", body: "Connect with the spiritual essence at Chatipadshahi Gurudwara, a place of serene contemplation amidst picturesque surroundings." },
          { title: "Shadimarg Gurudwara", body: "Visit Shadimarg Gurudwara, where the tranquil setting invites devotees to reflect on their spiritual journey." },
          { title: "Gurudwara at Baramula", body: "Discover the cultural harmony at Gurudwara in Baramula, where faith binds communities in a tapestry of shared spirituality." },
          { title: "Gurudwara at Poonch", body: "Experience the tranquillity of Gurudwara in Poonch, a place that resonates with the teachings of Sikh gurus." },
        ],
      },
    ],
  },
  {
    id: 'arts-and-music',
    title: "Arts & Music",
    location: "Jammu & Kashmir",
    description: "Explore the cultural symphony through renowned museums and galleries — SPS Museum, Shergarhi Art Gallery, Meeras Mahal, and Mubarak Mandi.",
    coverImage: "/heritage/art-1.jpg",
    images: [
      "/heritage/art-2.jpg",
      "/heritage/art-3.jpg",
      "/heritage/art-4.jpg",
      "/heritage/art-5.jpg",
    ],
    photos: 4,
    tags: ["Museums", "Music Festivals", "Cultural Arts"],
    rating: 4.8,
    sections: [
      {
        heading: "Museums & Galleries",
        items: [
          { title: "SPS Museum", body: "Step into the SPS Museum, a treasure trove of historical artifacts that narrate the stories of Jammu's rich past. From ancient manuscripts to royal artifacts, the museum offers a captivating journey through the corridors of time." },
          { title: "Shergarhi Art Gallery", body: "The Shergarhi Art Gallery stands as a testament to the thriving art scene in the region. Admire the brushstrokes of local and international artists, showcasing a kaleidoscope of emotions, traditions, and contemporary perspectives." },
          { title: "Meeras Mahal, Sopore", body: "Meeras Mahal in Sopore is not just a palace but a living testament to Kashmiri art and architecture. The intricate woodwork, vibrant carpets, and traditional artifacts within its walls provide a glimpse into the artistic opulence of the Kashmiri heritage." },
          { title: "Mubarak Mandi, Jammu", body: "Mubarak Mandi Palace in Jammu houses the Dogra Art Museum. Explore the royal art collection, showcasing paintings, sculptures, and artifacts that reflect the opulence of the Dogra dynasty." },
        ],
      },
      {
        heading: "Music, Festivals & Artisan Workshops",
        items: [
          { title: "Music and Cultural Festivals", body: "Jammu and Kashmir resonate with the melodious tunes of traditional and contemporary music. Immerse yourself in the cultural festivities by attending local music festivals that showcase the diversity and richness of the region's musical heritage." },
          { title: "Cultural Events and Artisan Workshops", body: "Engage with local artisans and artists during cultural events and workshops. Gain insights into the creative processes and traditions that shape the region's vibrant art scene. Participate in hands-on experiences to appreciate the craftsmanship firsthand." },
        ],
      },
    ],
  },
];

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=-sKTAtRELX4&t=3s';

function HeritageDetail({ item }) {
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
          to="/heritage"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Heritage
        </Link>

        {/* Title block */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" />
            {item.location}
          </span>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-3 mb-6">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Video className="w-3.5 h-3.5 text-[#FF8C00]" /> View video
          </a>
          <button onClick={() => setLightboxIdx(0)} className="flex items-center gap-1.5 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Camera className="w-3.5 h-3.5 text-[#FF8C00]" /> {item.photos} photos
          </button>
          <a
            href={buildWhatsAppUrl(item.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Enquire Now
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
          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all duration-300 ${slide % gallery.length === i ? 'bg-[#FF8C00] w-6' : 'bg-slate-300 w-2'}`} />
            ))}
          </div>
        </div>

        {/* Article: orange bold main heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF8C00] leading-snug mb-5 font-serif">
          {item.sections?.[0]?.heading
            ? `${item.title}: ${item.sections[0].heading}`
            : item.title}
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

        {/* You May Also Like */}
        <div className="mt-14 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-5">You May Like</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {heritageItems.filter(h => h.id !== item.id).slice(0, 4).map(other => (
              <Link key={other.id} to={`/heritage/${other.id}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all"
              >
                <div className="relative h-28 overflow-hidden">
                  <img src={other.coverImage} alt={other.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <Bookmark className="w-3 h-3 text-slate-600" />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#FF8C00] transition-colors">{other.title}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF8C00]" />{other.location}
                  </p>
                  <button className="mt-2 w-full text-[11px] font-semibold text-white bg-[#FF8C00] hover:bg-[#E67E00] rounded-lg py-1 transition-colors">
                    Explore
                  </button>
                </div>
              </Link>
            ))}
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

export default function Heritage() {
  const { id } = useParams();
  const item = id ? heritageItems.find(h => h.id === id) : null;

  if (id && item) {
    return <HeritageDetail item={item} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1587474260584-136574528ed5?w=2400&auto=format&fit=crop&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-icons text-[#FF8C00] text-sm">auto_stories</span>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-300">Explore</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Heritage & Culture</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">
            Discover the rich civilisations, spiritual traditions, and timeless craftsmanship of Jammu & Kashmir.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heritageItems.map((item) => (
            <Link
              key={item.id}
              to={`/heritage/${item.id}`}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* Bookmark */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-slate-700" />
                </div>
                {/* Photos pill */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
                  <span className="material-icons text-[13px]">photo_library</span>
                  {item.photos} photos
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-900 leading-tight">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-icons text-[13px] text-[#FF8C00]">location_on</span>
                  {item.location}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>

                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                  {item.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200">
                    Explore
                  </button>
                  <a
                    href={buildWhatsAppUrl(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire
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

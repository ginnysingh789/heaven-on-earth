import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bookmark, Star, ArrowLeft, MapPin, Camera, ChevronLeft, ChevronRight, Video, Share2 } from 'lucide-react';

const natureItems = [
  {
    id: 'eco-trail',
    title: 'Eco Trail',
    subtitle: 'Mahadev Peak - Shankaracharya',
    coverImage: '/nature/3-6.jpg',
    images: [
      '/nature/1-6.jpg',
      '/nature/3-6.jpg',
      '/nature/4-6.jpg',
      '/nature/eco-trail.jpg'
    ],
    videoCount: 1,
    photoCount: 4,
    description: "Step into the embrace of Kashmir's natural wonders, where every trail is a journey of discovery. Our Nature/Eco Trail Walk takes you through pristine landscapes, from the majestic Dachigam National Park to the tranquil shores of Dal Lake and beyond. Led by expert guides, each step unveils the ecological marvels that make Kashmir a haven for nature enthusiasts.",
    sections: [
      {
        heading: 'Dachigam National Park: A Symphony of Wilderness',
        items: [
          { title: 'Enchanting Wilderness', body: 'Begin your Nature Trail Walk at Dachigam National Park, a sanctuary where nature weaves its magic. Traverse through lush greenery, where every tree stands as a testament to the region\'s biodiversity.' },
          { title: 'Kashmiri Hangul Encounter', body: 'As you navigate the trails, keep an eye out for the elusive Kashmiri Hangul. Our expert guides share insights into the conservation efforts dedicated to preserving this rare and endangered species.' },
        ]
      },
      {
        heading: 'Dal Lake Stroll: Tranquil Beauty Unveiled',
        items: [
          { title: 'Shores of Tranquility', body: 'Embark on a leisurely walk around the iconic Dal Lake, where the shimmering waters reflect the surrounding mountains. Let the gentle lapping of waves and the vibrant Shikaras create a symphony of serenity.' },
          { title: 'Floating Gardens and Avian Delights', body: 'Explore the unique floating gardens and witness the dance of migratory birds. From the call of the majestic swans to the vibrant hues of kingfishers, Dal Lake becomes a canvas of natural art.' },
        ]
      },
      {
        heading: 'Shankaracharya Srinagar: A Spiritual Sojourn Amidst Nature',
        items: [
          { title: 'Elevated Perspectives', body: 'Ascend to the heights of Shankaracharya Temple for a panoramic view of Srinagar. The Nature Trail Walk combines spiritual rejuvenation with breathtaking vistas, providing a holistic experience.' },
        ]
      },
      {
        heading: 'Mahadev Peak Trail: Peaks and Valleys Unexplored',
        items: [
          { title: 'Sculpted Peaks', body: 'Venture into the Mahadev Peak Trail, where sculpted peaks and pristine valleys paint a mesmerizing landscape. Our guides share the geological tales etched in every rock, connecting you with the ancient heart of Kashmir.' },
        ]
      },
      {
        heading: 'Why Choose the Nature/Eco Trail Walk with Us?',
        items: [
          { title: 'Customized Experiences', body: 'Tailor your Nature Trail Walk to match your preferences, whether you seek a leisurely stroll, a birdwatching adventure, or a more challenging hike. Our customizable experiences cater to all levels of nature enthusiasts.' },
          { title: 'Conservation Commitment', body: 'We are stewards of the environment. Our Nature Trail Walks prioritize responsible and sustainable practices, ensuring minimal impact on the ecosystems we explore.' },
          { title: 'Unforgettable Memories', body: 'Immerse yourself in the beauty of Kashmir\'s landscapes, creating memories that linger long after the trail ends. Every Nature/Eco Trail Walk is a celebration of the natural wonders that define the region.' },
        ]
      },
    ]
  },
  {
    id: 'birding',
    title: 'Birding',
    subtitle: 'Dachigam',
    coverImage:   'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=1200&auto=format&fit=crop&q=80',
    images: [
      "/nature/Bird-1.jpg",
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=1200&auto=format&fit=crop&q=80',
    ],
    videoCount: 1,
    photoCount: 3,
    description: "Embark on an enchanting journey into the heart of Kashmir's avian wonders with our specialized birding experiences. Nestled amidst breathtaking landscapes, Kashmir is a haven for bird enthusiasts, offering a diverse and thriving birdlife that sets it apart.",
    sections: [
      {
        heading: 'Destinations of Feathered Majesty',
        items: [
          { title: 'Gulmarg', body: 'A picturesque haven where every tree seems to hum with the melodies of feathered companions. Explore the meadows and woodlands as you encounter a kaleidoscope of bird species, making Gulmarg a birder\'s paradise.' },
          { title: 'Dachigam', body: 'Venture into the wild terrains of Dachigam, home to rare and endangered species like the Hangul deer. As you navigate through this protected area, let our experienced team unveil the secrets of the avian residents that call Dachigam home.' },
          { title: 'Migratory Marvels', body: 'Kashmir transforms into a temporary refuge for migratory birds during certain seasons. Witness the awe-inspiring spectacle of thousands of winged travelers at places like Hokersar, Chatlam, and the expansive Wular Lake.' },
        ]
      },
      {
        heading: 'Expert-Guided Birding Excursion',
        items: [
          { title: 'Your Guides in the World of Feathers', body: 'Meet our team of seasoned birding enthusiasts, passionate about unraveling the mysteries of Kashmir\'s avian residents. Their keen eyes and extensive knowledge transform every birding excursion into an immersive educational experience.' },
        ]
      },
      {
        heading: 'Why Choose Us?',
        items: [
          { title: 'Exclusive Focus on Birds', body: 'We are not just a travel agency; we are your gateway to the avian wonders of Kashmir. Our exclusive focus on birding ensures an in-depth and personalized experience for every enthusiast.' },
          { title: 'Tailored Birding Packages', body: 'Choose from our meticulously crafted birding packages, designed to cater to various interests and expertise levels. Whether you\'re a seasoned birder or a beginner, we have the perfect itinerary for you.' },
          { title: 'Conservation Ethos', body: 'We are not just observers; we are advocates for conservation. Engage in responsible birding practices with us, supporting the preservation of Kashmir\'s rich biodiversity.' },
        ]
      },
    ]
  },
  {
    id: 'wildlife',
    title: 'Wildlife',
    subtitle: 'Dachigam',
    coverImage: '/nature/wildlife-1.jpg',
    images: [
      '/nature/wildlife-1.jpg',
      '/nature/wildlife-2.jpg',
      '/nature/wildlife-3.jpg'
    ],
    videoCount: 1,
    photoCount: 3,
    description: "Immerse in Kashmir's wild landscapes, where every sound tells a story. Our wildlife experiences unveil rare species, turning your journey into a mesmerizing encounter with nature.",
    sections: [
      {
        heading: 'Follow the Trail to Wildlife Wonder',
        items: [
          { title: 'Dachigam: Sanctuary of Tranquility', body: 'Explore Dachigam National Park, a haven for the endangered Kashmiri Hangul. Our expert guides lead you through dense forests, tracing the footsteps of this majestic deer, a living testament to conservation.' },
          { title: 'Hirpora Wildlife Sanctuary: Markhor\'s Realm', body: 'Step into Hirpora, where the regal Markhor reigns. Join us to witness the largest antelope in India against a rugged backdrop, an impressive sight.' },
          { title: 'Kazinag Wildlife Sanctuary: Markhor\'s Abundance', body: 'Venture into Kazinag, where Markhor thrives abundantly. Our team ensures you witness this enigmatic species in its full glory, against the panoramic landscapes of Kashmir.' },
        ]
      },
      {
        heading: 'Wilderness Awaits',
        items: [
          { title: 'Wildlife Spectacle: Bears, Leopards, and More', body: 'Encounter elusive brown bears and witness the stealthy presence of leopards. Traverse terrains where these creatures roam freely, providing unforgettable sightings.' },
          { title: 'Himalayan Serow and Musk Deer', body: 'Delight in sightings of the elusive Himalayan Serow and shy Musk Deer. Our guides unveil the secrets of these lesser-known species, adding mystery to your wildlife adventure.' },
        ]
      },
      {
        heading: 'Why Choose Us for Wildlife Encounters?',
        items: [
          { title: 'Expert-Led Safaris', body: 'Our wildlife experts guide you, sharing knowledge and passion, ensuring an immersive experience through Kashmir\'s diverse ecosystems.' },
          { title: 'Conservation Commitment', body: 'We\'re stewards of conservation. Engage in responsible wildlife tourism, supporting the preservation of Kashmir\'s diverse ecosystem.' },
          { title: 'Tailored Adventures', body: 'Choose from curated wildlife packages, crafted for both seasoned enthusiasts and first-time explorers. Your perfect journey awaits.' },
        ]
      },
    ]
  },
  {
    id: 'apple-trail',
    title: 'Apple Trail',
    subtitle: 'Shopian',
    coverImage:   '/nature/Apple-1.jpg',
    images: [
      '/nature/Apple-1.jpg',
      '/nature/Apple-2.jpg',
      '/nature/Apple-3.jpg',
      '/nature/Apple-4.jpg'
   
    ],
    videoCount: 1,
    photoCount: 4,
    description: "Welcome to Shopian, Kashmir's apple haven! Immerse in the Apple Trail, where each step unfolds the story of a town deeply immersed in apple cultivation.",
    sections: [
      {
        heading: 'Seasonal Wonders: The Apple\'s Tale',
        items: [
          { title: 'Blossom Beauty', body: 'In spring, witness the magic of apple blossoms, a delicate canvas of petals in the orchards.' },
          { title: 'Summer Glow', body: 'Feel the warmth of summer as apples soak in golden sunlight, nurtured with a blend of ancient practices and modern tech.' },
          { title: 'Harvest Buzz', body: 'As autumn arrives, join the harvest buzz in lively orchards, plucking juicy apples hands-on.' },
        ]
      },
      {
        heading: 'Tradition Meets Tech: Future Orchards',
        items: [
          { title: 'Smart Farming', body: 'Marvel at the fusion of tradition and technology, from age-old irrigation to cutting-edge agriculture in Shopian.' },
          { title: 'Culinary Feast: Apple-Infused Delights', body: 'Indulge in Kashmiri flavors amidst orchards. Our curated experiences offer dishes like Rogan Josh and Yakhni.' },
          { title: 'Sunset Retreat: Kehwa and Kulcha Magic', body: 'Sip traditional Kahwa, enjoy warm Kulcha during a serene Shopian sunset, surrounded by apple orchards.' },
        ]
      },
      {
        heading: 'Why Us for the Apple Trail?',
        items: [
          { title: 'Local Stories', body: 'Our guides, rooted in Shopian\'s apple legacy, share authentic insights for a genuine experience.' },
          { title: 'Tailored Adventures', body: 'Customize your Apple Trail—orchard exploration, culinary delights, or a tranquil sunset retreat.' },
          { title: 'Community Connection', body: 'Engage with locals, learn their way of life, and contribute to Shopian\'s sustainable apple culture.' },
        ]
      },
    ]
  },
  {
    id: 'fossil-trail',
    title: 'Fossil Trail',
    subtitle: 'Kashmir',
    coverImage:'/nature/fossil-1.jpg',
    images: [
      '/nature/fossil-1.jpg',
      '/nature/fossil-2.jpg',
      '/nature/fossil-3.jpg'
    ],
    videoCount: 1,
    photoCount: 3,
    description: "Take a 252-million-year leap into Kashmir's Guryul Ravines, a geological marvel unveiling evidence of the Permian–Triassic extinction, a pivotal era in Earth's history.",
    sections: [
      {
        heading: 'A Journey through Time, Science, and Discovery',
        items: [
          { title: 'Ancient Marvels', body: 'Explore rocks narrating a time when Earth faced challenges, setting the stage for new species – a journey to a world before dinosaurs.' },
          { title: 'Tsunami Hints', body: 'Imagine discovering proof of the world\'s first tsunami! In Khanmoh, evidence of a dramatic Earth-shaping event millions of years ago lies buried.' },
          { title: 'Global Appeal', body: 'Top scientists from the U.S., U.K., China, and more flock to Guryul Ravines for its ancient rocks, making it a global hub for research.' },
          { title: 'Kashmir\'s Giant Fossil Hub', body: 'Kashmir\'s fossil site outshines China\'s. A must-visit for millions of tourists craving a glimpse of ancient wonders.' },
        ]
      },
    ]
  },
  {
    id: 'flora-trail',
    title: 'Flora Trail',
    subtitle: 'Tulip Garden',
    coverImage: '/nature/flora-4.jpg',
    images: [
      '/nature/flora-1.jpg',
      '/nature/flora-3.jpg',
      '/nature/flora-4.jpg',
    ],
    videoCount: 1,
    photoCount: 4,
    description: "Join us on an enchanting journey through the vibrant tapestry of Kashmir's floral wonders. Our Floral Trail promises a kaleidoscope of colors, from the rare Himalayan Blue Poppy to the regal Crown Imperial. Immerse yourself in the breathtaking beauty of Tulip Gardens, wander through fragrant Lavender Fields, and discover the secrets of Wild Mushrooms in the captivating Mushroom Trails.",
    sections: [
      {
        heading: 'A Symphony of Blossoms: Exploring Rare Floral Jewels',
        items: [
          { title: 'Himalayan Blue Poppy', body: 'Begin your Floral Trail with the ethereal Himalayan Blue Poppy. Marvel at the delicate petals of this elusive and rare flower, nestled in the valleys of Kashmir. Our expert guides unveil the mysteries surrounding this floral gem.' },
          { title: 'Jogi Padshah (Saussurea gossypiphora)', body: 'Venture into the realm of Jogi Padshah. Discover the unique characteristics of this high-altitude flower, thriving amidst the majestic landscapes of Kashmir.' },
          { title: 'Crown Imperial Elegance', body: 'Behold the regal Crown Imperial, a flower that stands as a symbol of majestic beauty. The Floral Trail takes you to gardens adorned with these majestic blooms, creating a scene reminiscent of a royal procession.' },
        ]
      },
      {
        heading: 'Tulip Garden Extravaganza',
        items: [
          { title: 'Colorful Tulip Gardens', body: 'Step into a world of vibrant hues at the renowned Tulip Gardens. Acres of tulips in a mesmerizing array of colors create a breathtaking panorama. Our guided tour ensures you don\'t miss a single bloom in this floral paradise.' },
        ]
      },
      {
        heading: 'Lavender Fields: A Fragrant Retreat',
        items: [
          { title: 'Aromatic Lavender Fields', body: 'Indulge your senses in the soothing fragrance of Lavender Fields. Wander through rows of blooming lavender, where the air is filled with the calming aroma. Our Floral Trail invites you to experience the serenity of these fragrant landscapes.' },
        ]
      },
      {
        heading: 'Mushroom Trails: Wild Guchi Adventures',
        items: [
          { title: 'Wild Mushroom Guchi', body: 'Embark on a fascinating Mushroom Trail and uncover the world of Wild Mushrooms, including the prized Guchi. Our guides, well-versed in the art of foraging, lead you through forests where these culinary treasures hide.' },
        ]
      },
      {
        heading: 'Why Choose the Floral Trail with Us?',
        items: [
          { title: 'Tailored Floral Experiences', body: 'Customize your Floral Trail to match your botanical interests, whether it\'s rare blooms, gardens, or mushroom foraging. Our tailored experiences cater to both enthusiasts and casual admirers.' },
          { title: 'Conservation Commitment', body: 'We are dedicated to preserving Kashmir\'s floral diversity. Our Floral Trail practices responsible tourism, ensuring that the beauty we explore remains for generations to come.' },
          { title: 'Floral Photography Delight', body: 'Capture the essence of Kashmir\'s blooms with our guided photography sessions. From macro shots of delicate petals to panoramic views of lavender fields, your floral journey becomes a visual masterpiece.' },
        ]
      },
    ]
  },
];

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=-sKTAtRELX4&t=3s';

function NatureDetail({ item }) {
  const [slide, setSlide] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const gallery = item.images.length >= 3
    ? item.images
    : [...item.images, ...item.images, ...item.images].slice(0, 3);

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
          to="/nature"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Nature Trails
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {natureItems.filter(h => h.id !== item.id).slice(0, 3).map(other => (
              <Link key={other.id} to={`/nature/${other.id}`}
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

export default function Nature() {
  const { id } = useParams();
  const item = id ? natureItems.find(h => h.id === id) : null;

  if (id && item) {
    return <NatureDetail item={item} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2400&auto=format&fit=crop&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-widest text-orange-300 font-bold mb-3">Kashmiroffbeat</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Nature Trails</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Explore Kashmir's pristine ecosystems, rare wildlife, and breathtaking floral wonders</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {natureItems.map((item) => (
            <Link
              key={item.id}
              to={`/nature/${item.id}`}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-slate-700" />
                </div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-2.5 py-1 rounded-full text-xs font-bold shadow">
                    {item.photoCount} photos
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-4 gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" /> {item.subtitle}
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9
                  </span>
                  <span className="bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Nature</span>
                </div>
                <button className="mt-3 w-full py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200">
                  Enquiry on WhatsApp
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

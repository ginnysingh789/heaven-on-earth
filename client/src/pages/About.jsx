import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Film, Linkedin } from 'lucide-react';

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const experienceTabs = [
  {
    key: 'nature',
    label: 'Nature',
    icon: 'park',
    title: 'Nature',
    desc: "Discover the untouched natural beauty of Kashmir's serene landscapes, where tranquility meets breathtaking scenery.",
    tags: ['Birding', 'Wildlife', 'Apple Trail', 'Forest Trail', 'Angling', 'Eco Trail', 'Floral Trail'],
    image: 'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    key: 'heritage',
    label: 'Heritage',
    icon: 'account_balance',
    title: 'Heritage',
    desc: "Explore the rich cultural legacy of Kashmir — from centuries-old temples and mosques to Mughal gardens and ancient shrines.",
    tags: ['Mughal Gardens', 'Temples', 'Mosques', 'Sufi Shrines', 'Old City Walks', 'Craft Villages'],
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    key: 'adventure',
    label: 'Adventure',
    icon: 'terrain',
    title: 'Adventure',
    desc: "Push your limits with thrilling adventure sports across the Himalayan terrain — from skiing to white-water rafting.",
    tags: ['Skiing', 'Trekking', 'Rafting', 'Paragliding', 'Rock Climbing', 'Mountain Biking'],
    image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    key: 'border-tourism',
    label: 'Border Tourism',
    icon: 'flag',
    title: 'Border Tourism',
    desc: "Visit the frontier regions of Kashmir — experience the unique culture and pristine beauty of border areas like Gurez and Keran.",
    tags: ['Gurez Valley', 'Keran', 'Teetwal', 'Uri', 'Tangdhar', 'LoC Viewpoints'],
    image: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    key: 'photography',
    label: 'Photography',
    icon: 'photo_camera',
    title: 'Photography',
    desc: "Capture the ethereal beauty of Kashmir through guided photography tours to the most photogenic locations.",
    tags: ['Landscape Shoots', 'Golden Hour Tours', 'Bird Photography', 'Cultural Portraits', 'Astro Photography'],
    image: 'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const teamMembers = [
  {
    name: 'Tufail Shah', role: 'Photography & Film Making', image: '/about/Mask-group-15.png',
    socials: [
      { icon: 'twitter', url: 'https://x.com/Tufailshahh' },
      { icon: 'facebook', url: 'https://www.facebook.com/tufail.shah' },
      { icon: 'instagram', url: 'https://www.instagram.com/outdoorshortz' },
      { icon: 'imdb', url: 'https://pro.imdb.com/name/nm14314067/public/' },
    ],
  },
  {
    name: 'Avijit Kohli', role: 'Photography & Film Making', image: '/about/Mask-group-16.png',
    socials: [
      { icon: 'facebook', url: 'https://www.facebook.com/avijitkohli' },
      { icon: 'instagram', url: 'https://www.instagram.com/avijitkohli' },
    ],
  },
  {
    name: 'Sahran Malik', role: 'Photography & Film Making', image: '/about/Mask-group-17.png',
    socials: [
      { icon: 'twitter', url: 'https://x.com/sahranmalik' },
      { icon: 'facebook', url: 'https://www.facebook.com/Sahran.Malik/' },
      { icon: 'instagram', url: 'https://www.instagram.com/sahran_malik' },
    ],
  },
  {
    name: 'Sameer Hamdani', role: 'Architectural historian', image: '/about/Mask-group-18.png',
    socials: [
      { icon: 'twitter', url: 'https://x.com/SameerHamdani' },
    ],
  },
  {
    name: 'Hazik Shah', role: 'Admin', image: '/about/admin.png',
    socials: [
      { icon: 'linkedin', url: 'https://www.linkedin.com/in/hazik-shah-554069199' },
      { icon: 'instagram', url: 'https://www.instagram.com/hazikshah_' },
    ],
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('nature');
  const activeExp = experienceTabs.find(t => t.key === activeTab);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Banner */}
      <div className="relative h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/IMG_5977.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-700/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-3">About Us</h1>
          <p className="text-white/80 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>About us</span>
          </p>
        </div>
      </div>

      {/* Delve Into Kashmir's Hidden Wonders */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle orange pattern background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#FF8C00 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div>
              {/* Compass icon */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-slate-300 flex items-center justify-center">
                  <span className="material-icons text-slate-600 text-3xl">explore</span>
                </div>
              </div>
              <p className="text-[#FF8C00] font-serif italic text-lg mb-2">Begin Your Adventure</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                Delve Into Kashmir's Hidden Wonders
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Kashmir Offbeat is an innovative tourism venture uncovering Kashmir's hidden gems through expert-curated offbeat tours. We offer specialized guides and immersive experiences beyond the ordinary, with bespoke adventures in Border Tourism, Nature, Heritage, Adventure, and Wedding photography. Explore Kashmir like never before, embracing the road less traveled to discover its rich culture and natural beauty.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kashmir Offbeat was born out of a passion for discovery and a deep love for the region's untold stories. We wanted to create a platform where travelers could experience the true essence of Kashmir — its serene landscapes, rich heritage, and warm hospitality. Our bespoke tours are carefully crafted to take you on a journey through lesser-known villages, historic sites, and breathtaking natural wonders, all while immersing you in the vibrant culture of this extraordinary land.
              </p>
            </div>
            {/* Right: Image with badge */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/IMG_5977.jpg"
                  alt="Kashmir Waterfall"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              {/* Kashmir's Hidden Gems badge */}
              <div className="absolute -top-6 -left-6 lg:top-8 lg:-left-8 bg-[#FF8C00] text-white rounded-2xl p-5 shadow-xl w-40">
                <span className="material-icons text-3xl mb-2 block">flight_takeoff</span>
                <p className="text-sm font-bold leading-snug">Kashmir's<br />Hidden Gems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Expert Team */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FF8C00 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#FF8C00] font-serif italic text-lg mb-2">Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Meet Our Expert Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="group">
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] bg-slate-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Social icons overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      {member.socials?.map((s, si) => (
                        <a
                          key={si}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-white/20 hover:bg-[#FF8C00] rounded-full flex items-center justify-center transition-all duration-200"
                        >
                          {s.icon === 'twitter' && <XIcon className="w-4 h-4 text-white" />}
                          {s.icon === 'facebook' && <Facebook className="w-4 h-4 text-white" />}
                          {s.icon === 'instagram' && <Instagram className="w-4 h-4 text-white" />}
                          {s.icon === 'imdb' && <Film className="w-4 h-4 text-white" />}
                          {s.icon === 'linkedin' && <Linkedin className="w-4 h-4 text-white" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-slate-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offbeat Experiences */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        {/* Subtle dark pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#FF8C00] font-serif italic text-lg mb-2">Go And Discover</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Offbeat Experiences</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Tabs sidebar */}
            <div className="lg:col-span-3 bg-white rounded-2xl overflow-hidden shadow-lg">
              {experienceTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-[#FF8C00] text-white'
                      : 'text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  <span className={`material-icons text-xl ${activeTab === tab.key ? 'text-white' : 'text-[#FF8C00]'}`}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Center: Description + tags */}
            <div className="lg:col-span-5 text-white">
              <div className="mb-4">
                <span className="material-icons text-[#FF8C00] text-4xl">{activeExp.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{activeExp.title}</h3>
              <p className="text-whitetext-sm leading-relaxed mb-6">{activeExp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {activeExp.tags.map((tag, i) => (
                  <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-full ${i % 2 === 0 ? 'bg-white/10 text-white/80' : 'bg-[#FF8C00]/20 text-[#FF8C00]'}`}>
                    • {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={activeExp.image}
                  alt={activeExp.title}
                  className="w-full h-[300px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#FF8C00] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-white/30 flex items-center justify-center">
              <span className="material-icons text-white text-3xl">explore</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Explore Kashmir?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Let us craft your perfect Kashmir adventure. Contact us today to begin your journey into the extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-3.5 bg-white text-[#FF8C00] font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg">
              Contact Us
            </Link>
            <Link to="/packages" className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

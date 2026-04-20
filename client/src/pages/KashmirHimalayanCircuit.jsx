import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle, Mail, Send } from 'lucide-react';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';

const navLinks = [
  { id: 'about', label: 'About KHC' },
  { id: 'route', label: 'The Route' },
  { id: 'map', label: 'Map' },
  { id: 'media', label: 'Media' },
  { id: 'blog', label: 'Blog' },
  { id: 'basecamp', label: 'Base Camp' },
];

const sectionData = {
  about: {
    title: 'About the KHC',
    subtitle: 'The KHC provides an opportunity to re-establish Kashmir\'s rightful place on the Himalayan map',
    heroImage: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/c1174e88-47e1-4aff-8e31-c94130c9a0ce/AA+suran+katori+sar.jpg',
  },
  route: {
    title: 'The Route',
    subtitle: 'A brief enticing description of that the KHC has to offer.',
    heroImage: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/b40ae2ae-3020-4f80-a9c6-4c63e5e1fa5a/Pir+Panjal+from+Dawa+.jpg',
  },
  map: {
    title: 'The Map',
    subtitle: 'Kashmir Himalayan Circuit: Stages',
    heroImage: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/06f11de6-b746-4924-9e57-b9c4d5624b68/pexels-aliaksei-lepik-17955368.jpg',
  },
  media: {
    title: 'Coming soon',
    subtitle: 'Whatever it is, the way you tell your story online can make all the difference.',
    heroImage: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/d256a2a9-915c-428c-a56e-555a3d701e5e/Media+alternative+.JPG',
  },
  blog: {
    title: 'Blog',
    subtitle: 'We welcome blogs from trekkers who have completed some of the remoter sections of the KHC.',
    heroImage: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/7a3f2bdd-cedd-4700-a8e1-cf7e678808b0/The+BlogJPG.JPG',
  },
  basecamp: {
    title: 'Base Camp',
    subtitle: 'The KHC concept is a joint initiative of Mahmood Ahmad Shah and Garry Weare.',
    heroImage: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/7bf76c27-6498-4846-ab05-19f3ab5e9920/Base+camp+1.JPG',
  },
};

const stageImages = [
  'https://vargiskhan.com/log/wp-content/uploads/2021/06/mughal-road-3.jpg',
  'https://thekashmirhorizon.com/wp-content/uploads/Mughal-Road-remains.webp',
  'https://www.jktdc.co.in/img/places/sinthan.jpg',
  'https://kashmirdmc.com/wp-content/uploads/2021/02/margantop.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/13/61/e0/wular-lake.jpg?w=1200&h=-1&s=1',
];

function EnquiryForm({ sectionTitle }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-8 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Send className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Enquire About {sectionTitle}</h3>
          <p className="text-slate-500 text-sm">Send us a message or reach out directly</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-emerald-100 border border-emerald-300 rounded-xl p-6 text-center">
          <span className="material-icons text-emerald-600 text-4xl mb-2">check_circle</span>
          <p className="text-emerald-800 font-semibold">Thank you! We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text" required placeholder="Your Name"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
            <input
              type="email" required placeholder="Email Address"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          <input
            type="tel" placeholder="Phone Number (optional)"
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
          <textarea
            required rows={4} placeholder={`I'm interested in the Kashmir Himalayan Circuit (${sectionTitle})...`}
            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
          />
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl">
              <Send className="w-4 h-4" /> Send Enquiry
            </button>
            <a
              href={buildWhatsAppUrl(`Kashmir Himalayan Circuit - ${sectionTitle}`)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white text-sm font-bold rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={buildEmailUrl(`Kashmir Himalayan Circuit - ${sectionTitle}`)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

function HeroSlider({ images, title, subtitle }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <img
        src={images[idx]}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6">
        <h1 className="font-serif text-5xl md:text-7xl mb-4 drop-shadow-lg">{title}</h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl">{subtitle}</p>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="prose prose-slate prose-lg max-w-none text-slate-900">
        <p>The Kashmir Himalayan Circuit (KHC) offers an opportunity to re-establish Kashmir on the trekking map in the position it held until the outbreak of political instability in 1989. Compared to Nepal, Kashmir attracts only a handful of trekkers each year – mostly domestic adventurers heading to the popular Lidder Valley and Great Lake treks. Currently the travel advisories preclude most international trekkers from England, Europe, America and Australia from visiting Kashmir.</p>
        <p>KHC is comparable to Nepal's Great Himalaya Trek (GHT). However, the KHC can be completed in a month to five weeks. Sections of the trek can be completed in five days to ten days which will appeal to both domestic and foreign tourists.</p>
        <p>The KHC will take the pressure off the more overcrowded trails in Kashmir. It will set the benchmark for environmental and eco-friendly adventures. It also offers a timely opportunity to revisit the raft of regulations currently in place for trekking in Kashmir.</p>
        <p className="font-semibold text-slate-900">The KHC will incorporate snapshots of Kashmir's rich cultural history including:</p>
        <ul className="space-y-3 list-none pl-0">
          {[
            'Pir Panjal pass crossed by the Moghul Emperor Akbar in May 1589',
            'Banihal Pass was crossed by pilgrims, traders & armies over the centuries',
            'Migration routes of the Bakharval on route to their summer pastures',
            'The Wadvan valley that the Dogra army led by General Zorawar Singh followed en route to invading Ladakh in 1834',
            'The ancient pilgrimage to the Amarnath cave revered by thousands of Hindu devotees',
            'The flanks of Harimukh – where the Gt Himalayan Survey first viewed the Karakoram and identified K2 in September 1856',
            'Mohand Marg – the serene campsite favoured by Aurel Stein when translating the Rajatarangini between 1895 and 1900',
            'Erstwhile watch towers that were used to keep an eye on invaders',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="material-icons text-emerald-600 text-lg mt-0.5 shrink-0">place</span>
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <EnquiryForm sectionTitle="About the KHC" />
    </div>
  );
}

const stages = [
  {
    title: 'Stage 1: Tangmarg to Moghul Road',
    grade: 'moderate',
    duration: 'five to six stages',
    desc: 'A fine introduction to the KHC. From Tangmarg we head to the vast, verdant meadow at Tosamidan following shepherd trails that wind through alpine meadows, and forest glades with the snow-capped peaks of the Pir Panjal including Tattakuti (4745m) providing an impressive backdrop. We cross several passes in the vicinity of 4000m as we head to the historic Moghul Road.',
  },
  {
    title: 'Stage 2: Moghul Road to Banihal',
    grade: 'moderate',
    duration: 'six to seven stages',
    desc: 'Heading south we are afforded an ever-changing alpine landscape interspersed with oak and conifer forest, flowered meadows and rushing streams flowing from unseen snow fields. The sacred lake at Konsarnag is a fitting highlight as we cross a number of minor passes to reach the Banihal Pass (2832 m). This historic pass into the Kashmir Valley was traversed by armies, pilgrims and traders and more recently by Bakharval shepherds as they lead their flocks of sheep and goats to their summer grazing pastures.',
  },
  {
    title: 'Stage 3: Banihal to Simthan and Margan Top',
    grade: 'moderate',
    duration: 'six to seven stages',
    desc: 'A descent to the famous spring at Verinag is highly recommended as we prepare to cross a series of passes rarely marked on trekking maps. We gain unrivalled views across the Kashmir Valley and share camps with Gujar shepherds who graze their buffalo in forest glades in this secluded corner of the Pir Panjal. We complete this stage as we approach the Simthan Pass (3748m). From here it\'s a further day to the Margan Top (3609m) and views of the 7000 metre Nun and Kun, the highest peaks in the West Himalaya.',
  },
  {
    title: 'Stage 4: Margan Top to Sonamarg',
    grade: 'moderate to challenging',
    duration: 'eight to ten stages',
    desc: 'The longest and most challenging stage of the KHC as the trail extends from the outer rim of the Pir Panjal to the main Himalaya range. We follow less well-defined winding trails wind across high ridges and passing glacial lakes that drain into the upper Lidder Valley before descending steeply to Sukhani, the highest village in the upper Wadvan Valley. We then ascend to the Bakharval encampments at Ranmarg in preparation for crossing the Gul Gali (4406m) to Shesnag and the trail to the Amarnath Cave. In the company of Hindu devotees, we cross the Mahagunas Pass (4218m) to Panchtarni where after a brief diversion to visit the Cave we descend to Baltal to the camping sites on the outskirts of Sonamarg.',
    note: 'En route to Ranmarg consider a diversion to the Boktol Pass (4980 m) that leads to the Suru Valley and Ladakh. The pass was crossed when the renowned General Zorawar Singh led the Dogra armies\' first foray to Ladakh in 1834.',
  },
  {
    title: 'Stage 5: Sonamarg to Bandipura and Wular Lake',
    grade: 'moderate to challenging',
    duration: 'five to seven stages',
    desc: 'After completing the strenuous stages to reach Sonamarg we undertake the Kashmir Great Lakes trek that offers a fitting highlight to the KHC. The well-defined trail winds past the serene lakes of Vishensar, Krishensar and Gadsar while the flowering meadows are frequently acclaimed as the finest in the Indian Himalaya. The sacred mountain of Harimukh (5148m) with its glaciers tumbling into the serene waters of Gangabal (Nudhkohl) offer a further bonus on this outstanding trek. Beyond Harimukh we gain ever-impressive views of the Kashmir Valley and glimpses of Nanga Parbat and the Karakoram range as we traverse the Gang Gali (4052m) and descend to Kudara in Bandipora and the shores of Wular Lake.',
    note: 'From Kudara in Bandipora there is an exhilarating option to cross back to the Sindh Valley. It includes camping at Mohand Marg where the famous explorer and academic Auriel Stein translated the Rajatarangini into English. From Mohand Marg we savour the magnificent panorama of the Pir Panjal range and trace our route along the initial stages of the Kashmir Himalayan Circuit.',
  },
];

function RouteSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="prose prose-slate prose-lg max-w-none mb-12 text-slate-900">
        <p>Details of the stages will be progressively uploaded with GPS readings, contour maps and a comprehensive summary to help prospective trekking groups to successfully complete the Circuit. A 'mud map' is included to gain an overall appreciation of the direction of the Circuit.</p>
      </div>

      {/* Stage Image Slider */}
      <div className="relative rounded-2xl overflow-hidden mb-12 h-[40vh] md:h-[50vh]">
        <img
          src={stageImages[activeStage]}
          alt={stages[activeStage].title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          onClick={() => setActiveStage(i => (i - 1 + stages.length) % stages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveStage(i => (i + 1) % stages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="absolute bottom-6 left-6 z-10">
          <h3 className="text-white text-2xl md:text-3xl font-serif drop-shadow-lg">{stages[activeStage].title}</h3>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-10 scrollbar-hide pb-2">
        {stages.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStage(i)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeStage === i
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Stage {i + 1}
          </button>
        ))}
      </div>

      {/* Active Stage Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{stages[activeStage].title}</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
            <span className="material-icons text-[14px]">terrain</span>
            Trek grade: {stages[activeStage].grade}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
            <span className="material-icons text-[14px]">schedule</span>
            Duration: {stages[activeStage].duration}
          </span>
        </div>
        <p className="text-slate-700 leading-relaxed text-base">{stages[activeStage].desc}</p>
        {stages[activeStage].note && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-800 text-sm leading-relaxed">
              <span className="font-bold">Note: </span>{stages[activeStage].note}
            </p>
          </div>
        )}
      </div>

      <EnquiryForm sectionTitle="The Route" />
    </div>
  );
}

const timingData = {
  headers: ['Stage', 'Quick', 'Realistic', 'Relaxed'],
  rows: [
    ['Stage 1: Tangmarg to Moghul Road', '4', '5', '6 to 7'],
    ['Stage 2: Moghul Road to Banihal', '4', '5', '6 to 7'],
    ['Stage 3: Banihal to Margan Top', '7', '8', '9 to 10'],
    ['Stage 4: Margan Top to Sonamarg', '6', '8', '9 to 10'],
    ['Stage 5: Sonamarg to Bandipur via Great Lake', '6', '7', '10'],
  ],
  totals: ['Total', '26 Days (4 Weeks)', '33 Days (5 Weeks)', '40–42 Days (6 Weeks)'],
};

function MapSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-slate-900 mb-12">The Map Circuit</h2>

      {/* Map Image Placeholder */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-16">
        <img
          src="https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/abe87e32-afed-4eab-84c1-a2ef2a1cdf24/Map.jpg"
          alt="Kashmir Himalayan Circuit Map"
          className="w-full h-auto"
        />
      </div>

      {/* Timing Table */}
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Expected Timing</h3>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-emerald-600 text-white">
                {timingData.headers.map((h, i) => (
                  <th key={i} className="px-5 py-4 text-left font-bold text-sm">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timingData.rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-4 ${j === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
              <tr className="bg-emerald-50 font-bold">
                {timingData.totals.map((cell, i) => (
                  <td key={i} className="px-5 py-4 text-emerald-800">{cell}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <EnquiryForm sectionTitle="The Map" />
    </div>
  );
}

function MediaSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
        <span className="material-icons text-slate-400 text-4xl">newspaper</span>
      </div>
      <h2 className="font-serif text-3xl text-slate-900 mb-4">Coming Soon</h2>
      <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto mb-12">Whatever it is, the way you tell your story online can make all the difference. Articles and stories from the press will be featured here.</p>

      <div className="max-w-2xl mx-auto text-left">
        <EnquiryForm sectionTitle="Media" />
      </div>
    </div>
  );
}

function BlogSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-4">
        <span className="text-slate-400 text-sm">30 Aug &nbsp;·&nbsp; Written By Guest User</span>
      </div>
      <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-10 leading-tight">Kashmir Himalayan Circuit – a simple origin</h2>

      <div className="prose prose-slate prose-lg max-w-none text-slate-700">
        <p className="font-semibold text-slate-00">Sometimes a passing comment can lead to a great idea</p>

        <p>A few years ago when Mahmood Shah was the Director General of Tourism he would regularly catch up after work on my houseboat moored on Nagin Lake. While we shared kahwa chai (actually I had a beer) we would look across the lake to the snow-capped peaks of the Pir Panjal Range.</p>

        <p>You know Mahmood speculated I have often thought that it would be possible to trek around Kashmir, starting from Tangmarg then heading to the Moghul Road and then onto the Banihal pass. After that to the Simthan pass and Margan top. As Mahmood paused for breath I interrupted. Then to the Wardvan valley, Gul Gali and the Amarnath trail to Baltal and Sonamarg, the Great lakes trek to Harimukh before descending to Wular Lake.</p>

        <p>We felt pleased with ourselves and by the following morning a plan of action had been drawn up under the working title of the Kashmir Himalayan Circuit (KHC). A classic trek that had all the makings, for Kashmir at least in a more modest way, to compare with the Great Himalayan Trail across the roof of Nepal.</p>

        <p className="font-semibold text-slate-700">A passing comment can sometimes lead to a great idea.</p>

        <p className="text-slate-400 italic">Guest User</p>
      </div>

      <EnquiryForm sectionTitle="Blog" />
    </div>
  );
}

function BaseCampSection() {
  const founders = [
    {
      name: 'Mahmood Ahmad Shah',
      image: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/b0c8a907-60ad-4fd2-ae4a-58846085c46d/Mahmood+Ahmad+Shah.png',
      bio: 'Mahmood Ahmad Shah is currently Director Handicrafts for J & K and former Director Tourism for Kashmir and Ladakh. Mahmood is the Chair of the venerable J & K Mountaineering & Adventure Club who has amassed an impressive trekking CV while exploring the remote valleys, lakes and passes of Kashmir. Mahmood is ideally placed to promote the KHC.',
    },
    {
      name: 'Garry Weare',
      image: 'https://images.squarespace-cdn.com/content/v1/64d82289391a252015f03974/6a9680ae-b8fe-43d7-9d9f-113f293c60e9/Garry+Weare.png',
      bio: 'Garry Weare is an Australian adventurer and author. He is a Founding Director of the Australian Himalayan Foundation and former director now Himalayan consultant to the adventure travel company World Expeditions. He wrote all editions of Lonely Planet\'s Trekking in the Indian Himalaya as well as his acclaimed Long walk in the Himalaya that concludes in Kashmir. Garry offers a lifetime of experience to help promote the KHC.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-center text-slate-500 text-lg mb-12">The KHC concept is a joint initiative of Mahmood Ahmad Shah and Garry Weare.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {founders.map((f, i) => (
          <div key={i} className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white">
              <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{f.bio}</p>
          </div>
        ))}
      </div>

      <EnquiryForm sectionTitle="Base Camp" />
    </div>
  );
}

export default function KashmirHimalayanCircuit() {
  const { section } = useParams();
  const navigate = useNavigate();
  const activeSection = section || 'about';
  const info = sectionData[activeSection] || sectionData.about;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <HeroSlider images={[info.heroImage]} title={info.title} subtitle={info.subtitle} />

      {/* Section Nav */}
      <div className="sticky top-[52px] z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            <Link
              to="/activities?category=himalayan-circuit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="w-px bg-slate-200 mx-1 shrink-0" />
            {navLinks.map(link => (
              <Link
                key={link.id}
                to={`/khc/${link.id}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeSection === link.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeSection === 'about' && <AboutSection />}
      {activeSection === 'route' && <RouteSection />}
      {activeSection === 'map' && <MapSection />}
      {activeSection === 'media' && <MediaSection />}
      {activeSection === 'blog' && <BlogSection />}
      {activeSection === 'basecamp' && <BaseCampSection />}
    </div>
  );
}

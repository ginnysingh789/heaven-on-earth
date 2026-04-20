const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Activity = require('./models/Activity');

const seedActivities = [
  {
    name: 'Gulmarg Skiing',
    slug: 'gulmarg-skiing',
    category: 'skiing',
    description: 'Experience world-class skiing at Gulmarg — Asia\'s premier ski resort with the highest gondola in the world.',
    overview: 'Experience world-class skiing at Gulmarg — Asia\'s premier ski resort with the highest gondola in the world, offering runs from beginner to expert.',
    highlights: ['World\'s highest gondola', 'Beginner to expert runs', 'Professional instructors', 'Equipment rental available'],
    location: 'Gulmarg',
    duration: '4–6 Hours',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Ski equipment', 'Instructor', 'Gondola pass'],
    exclusions: ['Travel to Gulmarg', 'Meals', 'Personal insurance'],
    coverImage: 'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['December', 'January', 'February', 'March'],
    difficulty: 'moderate',
    tags: ['skiing', 'gulmarg', 'winter sports'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Heli Skiing Expedition',
    slug: 'heli-skiing-kashmir',
    category: 'heli-skiing',
    description: 'Access untouched backcountry slopes via helicopter — ski virgin powder at 14,000+ ft on peaks no lift can reach.',
    overview: 'Access untouched backcountry slopes via helicopter — ski virgin powder at 14,000+ ft on peaks no lift can reach.',
    highlights: ['Helicopter access', 'Virgin powder slopes', 'Avalanche safety team', 'Small groups of 4–6'],
    location: 'Gulmarg',
    duration: 'Full Day',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Helicopter rides', 'Guide', 'Safety gear', 'Ski equipment'],
    exclusions: ['Travel to base', 'Accommodation', 'Personal insurance'],
    coverImage: 'https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['January', 'February', 'March'],
    difficulty: 'challenging',
    tags: ['heli-skiing', 'extreme', 'backcountry'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Tandem Paragliding over Dal Lake',
    slug: 'paragliding-srinagar',
    category: 'paragliding',
    description: 'Soar above the iconic Dal Lake and Zabarwan hills with certified tandem pilots.',
    overview: 'Soar above the iconic Dal Lake and Zabarwan hills with certified tandem pilots — a breathtaking aerial view of Kashmir\'s heart.',
    highlights: ['Tandem flight', 'Dal Lake aerial view', 'Certified pilots', 'GoPro footage included'],
    location: 'Srinagar',
    duration: '20–30 Min',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Tandem pilot', 'Safety gear', 'GoPro video'],
    exclusions: ['Travel to launch site', 'Personal insurance'],
    coverImage: 'https://images.pexels.com/photos/163491/pexels-photo-163491.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/163491/pexels-photo-163491.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['April', 'May', 'June', 'September', 'October'],
    difficulty: 'easy',
    tags: ['paragliding', 'dal lake', 'aerial'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Rock Climbing at Aru Valley',
    slug: 'rock-climbing-aru',
    category: 'climbing',
    description: 'Test your skills on granite cliff faces in Aru Valley — routes for beginners to advanced climbers.',
    overview: 'Test your skills on granite cliff faces in Aru Valley — routes for beginners to advanced climbers with full safety equipment provided.',
    highlights: ['Multiple difficulty routes', 'Full equipment provided', 'Certified instructors', 'Scenic valley setting'],
    location: 'Aru Valley',
    duration: '3–5 Hours',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Equipment', 'Instructor', 'Safety gear'],
    exclusions: ['Travel', 'Meals'],
    coverImage: 'https://images.pexels.com/photos/6542684/pexels-photo-6542684.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/6542684/pexels-photo-6542684.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['April', 'May', 'June', 'September', 'October'],
    difficulty: 'moderate',
    tags: ['rock climbing', 'aru valley', 'adventure'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Srinagar to Gulmarg Cycle Tour',
    slug: 'cycling-srinagar-gulmarg',
    category: 'cycling',
    description: 'Pedal through saffron fields, apple orchards, and pine forests on a scenic 50 km ride.',
    overview: 'Pedal through saffron fields, apple orchards, and pine forests on a scenic 50 km ride from Srinagar to the ski town of Gulmarg.',
    highlights: ['50 km scenic ride', 'Saffron fields', 'Apple orchards', 'Support vehicle'],
    location: 'Srinagar – Gulmarg',
    duration: 'Full Day',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Mountain bike', 'Guide', 'Support vehicle', 'Lunch'],
    exclusions: ['Personal gear', 'Insurance'],
    coverImage: 'https://images.pexels.com/photos/5970286/pexels-photo-5970286.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5970286/pexels-photo-5970286.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['April', 'May', 'June', 'September', 'October'],
    difficulty: 'moderate',
    tags: ['cycling', 'mountain biking', 'scenic'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Lidder River Rafting',
    slug: 'river-rafting-lidder',
    category: 'rafting',
    description: 'Navigate Grade II–III rapids on the Lidder River through pine-forested gorges.',
    overview: 'Navigate Grade II–III rapids on the Lidder River through pine-forested gorges — suitable for families and first-timers.',
    highlights: ['Grade II–III rapids', 'Family friendly', 'Pine forest gorges', 'Full safety gear'],
    location: 'Pahalgam',
    duration: '2–3 Hours',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Raft', 'Guide', 'Life jacket', 'Helmet'],
    exclusions: ['Travel', 'Change of clothes'],
    coverImage: 'https://images.pexels.com/photos/1732370/pexels-photo-1732370.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1732370/pexels-photo-1732370.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['May', 'June', 'July', 'August', 'September'],
    difficulty: 'easy',
    tags: ['rafting', 'lidder river', 'family'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Kashmir Great Lakes Circuit',
    slug: 'kashmir-great-lakes',
    category: 'himalayan-circuit',
    description: 'A 7-day trek through 7 alpine lakes at 12,000+ ft elevation.',
    overview: 'A 7-day trek through 7 alpine lakes at 12,000+ ft — Vishansar, Krishansar, Gadsar, Satsar, and more through pristine meadows.',
    highlights: ['7 alpine lakes', '12,000+ ft elevation', 'Pristine meadows', 'Expert mountain guides'],
    location: 'Sonamarg – Naranag',
    duration: '7 Days',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Camping gear', 'Guide', 'Meals on trek', 'Porter support'],
    exclusions: ['Travel to base', 'Personal gear', 'Insurance'],
    coverImage: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['July', 'August', 'September'],
    difficulty: 'challenging',
    tags: ['great lakes', 'himalayan circuit', 'alpine'],
    isActive: true,
    isFeatured: true,
  },
  {
    name: 'Gurez Valley Expedition',
    slug: 'gurez-valley-expedition',
    category: 'offbeat',
    description: 'Explore one of Kashmir\'s most remote and stunning valleys — home to the Dard-Shin people.',
    overview: 'Explore one of Kashmir\'s most remote and stunning valleys — Gurez is home to the Dard-Shin people, ancient watchtowers, and pristine Kishanganga River.',
    highlights: ['Dard-Shin culture', 'Ancient watchtowers', 'Kishanganga River', 'Remote valley'],
    location: 'Gurez',
    duration: '3 Days',
    pricing: { perPerson: 0, currency: 'INR' },
    inclusions: ['Transport', 'Guide', 'Accommodation', 'Meals'],
    exclusions: ['Personal expenses', 'Insurance'],
    coverImage: 'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&w=800'],
    bestSeason: ['May', 'June', 'July', 'August', 'September'],
    difficulty: 'moderate',
    tags: ['gurez', 'offbeat', 'remote', 'border'],
    isActive: true,
    isFeatured: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    for (const activity of seedActivities) {
      const exists = await Activity.findOne({ slug: activity.slug });
      if (exists) {
        console.log(`⏭  Skipping "${activity.name}" (already exists)`);
      } else {
        await Activity.create(activity);
        console.log(`✅ Created "${activity.name}"`);
      }
    }

    console.log('\nSeed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();

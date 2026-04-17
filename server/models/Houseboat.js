const mongoose = require('mongoose');

const houseboatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['deluxe', 'super-deluxe', 'luxury', 'standard']
  },
  description: { type: String, required: true },
  overview: { type: String, required: true },
  lake: { 
    type: String, 
    required: true,
    enum: ['dal-lake', 'nagin-lake', 'other']
  },
  location: { type: String, required: true },
  locationOnLake: { type: String },
  coordinates: {
    lat: Number,
    lng: Number
  },
  pricing: {
    perNight: { type: Number, required: true },
    perWeek: Number,
    offSeasonDiscount: Number,
    currency: { type: String, default: 'INR' }
  },
  rooms: {
    bedrooms: { type: Number, required: true },
    bathrooms: Number,
    livingRooms: Number
  },
  capacity: {
    guests: { type: Number, required: true }
  },
  mealsIncluded: {
    breakfast: { type: Boolean, default: true },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: true }
  },
  amenities: [String],
  features: [String],
  highlights: [String],
  houseRules: [String],
  images: [String],
  coverImage: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  checkIn: { type: String, default: '12:00 PM' },
  checkOut: { type: String, default: '10:00 AM' },
  availability: {
    type: String,
    enum: ['available', 'limited', 'booked'],
    default: 'available'
  },
  season: {
    peak: [String],
    offPeak: [String]
  },
  shikaraRide: { type: Boolean, default: true },
  cancellationPolicy: { type: String },
  contactPhone: String,
  contactEmail: String,
  tags: [String],
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

houseboatSchema.index({ slug: 1 });
houseboatSchema.index({ lake: 1, category: 1, isActive: 1 });
houseboatSchema.index({ isFeatured: 1 });
houseboatSchema.index({ 'pricing.perNight': 1 });

module.exports = mongoose.model('Houseboat', houseboatSchema);

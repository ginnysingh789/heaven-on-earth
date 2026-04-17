const mongoose = require('mongoose');

const homestaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  hostName: { type: String, required: true },
  hostFamily: { type: String },
  description: { type: String, required: true },
  overview: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number
  },
  pricing: {
    perNight: { type: Number, required: true },
    perWeek: Number,
    currency: { type: String, default: 'INR' }
  },
  rooms: {
    total: { type: Number, required: true },
    types: [String]
  },
  capacity: {
    guests: { type: Number, required: true },
    bedrooms: Number,
    bathrooms: Number
  },
  mealsIncluded: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false }
  },
  amenities: [String],
  languages: [String],
  houseRules: [String],
  highlights: [String],
  images: [String],
  coverImage: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  checkIn: { type: String, default: '2:00 PM' },
  checkOut: { type: String, default: '11:00 AM' },
  cancellationPolicy: { type: String },
  contactPhone: String,
  contactEmail: String,
  tags: [String],
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

homestaySchema.index({ slug: 1 });
homestaySchema.index({ region: 1, isActive: 1 });
homestaySchema.index({ isFeatured: 1 });
homestaySchema.index({ 'pricing.perNight': 1 });

module.exports = mongoose.model('Homestay', homestaySchema);

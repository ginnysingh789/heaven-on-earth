const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['popular-kashmir', 'offbeat', 'ladakh']
  },
  subCategory: { type: String, required: true },
  description: { type: String, required: true },
  highlights: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    meals: String,
    accommodation: String
  }],
  duration: {
    nights: { type: Number, required: true },
    days: { type: Number, required: true }
  },
  pricing: {
    perPerson: { type: Number, required: true },
    perCouple: Number,
    perFamily: Number,
    currency: { type: String, default: 'INR' }
  },
  inclusions: [String],
  exclusions: [String],
  images: [String],
  coverImage: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['easy', 'moderate', 'challenging'],
    default: 'moderate'
  },
  bestSeason: [String],
  groupSize: {
    min: { type: Number, default: 2 },
    max: { type: Number, default: 15 }
  },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

tourPackageSchema.index({ slug: 1 });
tourPackageSchema.index({ category: 1, isActive: 1 });
tourPackageSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('TourPackage', tourPackageSchema);

const mongoose = require('mongoose');

const trekSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  overview: { type: String, required: true },
  highlights: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    distance: String,
    altitude: String,
    duration: String,
    meals: String,
    accommodation: String
  }],
  duration: {
    nights: { type: Number, required: true },
    days: { type: Number, required: true }
  },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['easy', 'moderate', 'difficult', 'challenging']
  },
  altitude: {
    max: { type: Number, required: true },
    unit: { type: String, default: 'meters' }
  },
  distance: {
    total: Number,
    unit: { type: String, default: 'km' }
  },
  pricing: {
    perPerson: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  inclusions: [String],
  exclusions: [String],
  whatToBring: [String],
  images: [String],
  coverImage: { type: String, required: true },
  bestSeason: [String],
  groupSize: {
    min: { type: Number, default: 4 },
    max: { type: Number, default: 12 }
  },
  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  fitnessLevel: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  tags: [String],
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

trekSchema.index({ slug: 1 });
trekSchema.index({ difficulty: 1, isActive: 1 });
trekSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Trek', trekSchema);

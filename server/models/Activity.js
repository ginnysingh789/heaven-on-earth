const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['skiing', 'snowboarding', 'paragliding', 'water-sports', 'climbing', 'cycling', 'rafting', 'other']
  },
  description: { type: String, required: true },
  overview: { type: String, required: true },
  highlights: [String],
  location: { type: String, required: true },
  duration: { type: String, required: true },
  pricing: {
    perPerson: { type: Number, required: true },
    perGroup: Number,
    currency: { type: String, default: 'INR' }
  },
  inclusions: [String],
  exclusions: [String],
  requirements: [String],
  safetyGuidelines: [String],
  images: [String],
  coverImage: { type: String, required: true },
  bestSeason: [String],
  ageLimit: {
    min: Number,
    max: Number
  },
  groupSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 10 }
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'moderate', 'challenging'],
    default: 'moderate'
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

activitySchema.index({ slug: 1 });
activitySchema.index({ category: 1, isActive: 1 });
activitySchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Activity', activitySchema);

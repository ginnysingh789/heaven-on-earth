const mongoose = require('mongoose');

const rentalServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['taxi', 'self-drive-car', 'bike', 'route-specific']
  },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  overview: { type: String, required: true },
  features: [String],
  vehicleDetails: {
    type: String,
    model: String,
    capacity: Number,
    fuelType: String,
    transmission: String
  },
  pricing: {
    perDay: Number,
    perKm: Number,
    perTrip: Number,
    currency: { type: String, default: 'INR' }
  },
  routes: [{
    from: String,
    to: String,
    distance: String,
    duration: String,
    price: Number
  }],
  inclusions: [String],
  exclusions: [String],
  terms: [String],
  images: [String],
  coverImage: { type: String, required: true },
  availability: {
    type: String,
    enum: ['available', 'limited', 'unavailable'],
    default: 'available'
  },
  locations: [String],
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  metaTitle: String,
  metaDescription: String
}, { timestamps: true });

rentalServiceSchema.index({ slug: 1 });
rentalServiceSchema.index({ category: 1, isActive: 1 });
rentalServiceSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('RentalService', rentalServiceSchema);

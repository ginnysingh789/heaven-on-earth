const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    default: 2
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  totalRooms: {
    type: Number,
    default: 10
  },
  availableRooms: {
    type: Number,
    default: 10
  },
  bedType: {
    type: String,
    default: 'King Bed'
  },
  view: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['luxury', 'resort', 'houseboat', 'boutique', 'budget'],
    default: 'resort'
  },
  badge: {
    text: { type: String, default: '' },
    icon: { type: String, default: 'star' }
  },
  locationTag: {
    text: { type: String, default: '' },
    icon: { type: String, default: 'map' }
  },
  startingPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  amenities: [{
    type: String
  }],
  roomTypes: [roomTypeSchema],
  address: {
    type: String,
    default: ''
  },
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

hotelSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Hotel', hotelSchema);

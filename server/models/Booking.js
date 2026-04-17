const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  roomType: {
    name: { type: String, required: true },
    price: { type: Number, required: true }
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 }
  },
  nights: {
    type: Number,
    required: true
  },
  addOns: [{
    name: { type: String },
    price: { type: Number }
  }],
  pricing: {
    roomTotal: { type: Number, required: true },
    addOnsTotal: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'card', 'pay_at_hotel'],
    default: 'card'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'],
    default: 'pending'
  },
  guestDetails: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' }
  },
  specialRequests: {
    type: String,
    default: ''
  },
  bookingRef: {
    type: String,
    unique: true
  }
}, { timestamps: true });

bookingSchema.pre('save', function(next) {
  if (!this.bookingRef) {
    this.bookingRef = 'KT' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);

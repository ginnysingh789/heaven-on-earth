const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['poetry', 'fiction', 'non-fiction', 'history', 'culture', 'travel', 'biography', 'anthology']
  },
  language: { 
    type: String, 
    required: true,
    enum: ['english', 'kashmiri', 'urdu', 'hindi', 'bilingual']
  },
  description: { type: String, required: true },
  excerpt: String,
  coverImage: { type: String, required: true },
  publishedYear: Number,
  publisher: String,
  isbn: String,
  pages: Number,
  price: {
    amount: Number,
    currency: { type: String, default: 'INR' }
  },
  purchaseLinks: {
    amazon: String,
    flipkart: String,
    other: String
  },
  availability: {
    type: String,
    enum: ['available', 'out-of-print', 'upcoming'],
    default: 'available'
  },
  rating: { type: Number, default: 4.0 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isClassic: { type: Boolean, default: false },
  tags: [String],
  relatedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  seo: {
    metaTitle: String,
    metaDescription: String
  }
}, { timestamps: true });

bookSchema.index({ slug: 1 });
bookSchema.index({ category: 1, language: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ isFeatured: 1 });
bookSchema.index({ tags: 1 });

module.exports = mongoose.model('Book', bookSchema);

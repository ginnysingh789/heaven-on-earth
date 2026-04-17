const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['heritage', 'culture', 'history', 'literature', 'poetry', 'travel-stories', 'documentaries']
  },
  subCategory: String,
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    bio: String,
    image: String,
    isGuest: { type: Boolean, default: false }
  },
  coverImage: { type: String, required: true },
  images: [String],
  tags: [String],
  readTime: { type: Number, default: 5 },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  publishedAt: Date,
  relatedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

articleSchema.index({ slug: 1 });
articleSchema.index({ category: 1, isPublished: 1 });
articleSchema.index({ isFeatured: 1, isPublished: 1 });
articleSchema.index({ tags: 1 });
articleSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('Article', articleSchema);

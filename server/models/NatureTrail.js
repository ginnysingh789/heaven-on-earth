const mongoose = require('mongoose');

const sectionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { _id: false });

const sectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  items: [sectionItemSchema],
}, { _id: false });

const natureTrailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  images: [String],
  videoCount: { type: Number, default: 0 },
  photoCount: { type: Number, default: 0 },
  sections: [sectionSchema],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

natureTrailSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

natureTrailSchema.index({ slug: 1 });

module.exports = mongoose.model('NatureTrail', natureTrailSchema);

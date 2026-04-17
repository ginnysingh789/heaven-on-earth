const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { protect, admin } = require('../middleware/auth');

// Get all published articles (public)
router.get('/', async (req, res) => {
  try {
    const { category, tag, featured, search } = req.query;
    const filter = { isPublished: true };
    
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { excerpt: regex },
        { content: regex },
        { tags: regex }
      ];
    }
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (featured === 'true') filter.isFeatured = true;

    const articles = await Article.find(filter)
      .select('-content')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(50);
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single article by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, isPublished: true })
      .populate('relatedArticles', 'title slug excerpt coverImage category author readTime');
    
    if (!article) return res.status(404).json({ message: 'Article not found' });
    
    // Increment views
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like article
router.post('/:slug/like', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, isPublished: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    
    article.likes += 1;
    await article.save();
    
    res.json({ likes: article.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const article = new Article(req.body);
    if (article.isPublished && !article.publishedAt) {
      article.publishedAt = new Date();
    }
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    
    // Set publishedAt if publishing for first time
    if (req.body.isPublished && !article.isPublished && !article.publishedAt) {
      req.body.publishedAt = new Date();
    }
    
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

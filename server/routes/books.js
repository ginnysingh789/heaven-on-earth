const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, admin } = require('../middleware/auth');

// Get all books (public)
router.get('/', async (req, res) => {
  try {
    const { category, language, author, featured, search } = req.query;
    const filter = {};
    
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { author: regex },
        { description: regex },
        { tags: regex }
      ];
    }
    if (category) filter.category = category;
    if (language) filter.language = language;
    if (author) filter.author = new RegExp(author, 'i');
    if (featured === 'true') filter.isFeatured = true;

    const books = await Book.find(filter)
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(100);
    
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single book by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug })
      .populate('relatedBooks', 'title slug author coverImage category language rating');
    
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

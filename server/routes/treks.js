const express = require('express');
const router = express.Router();
const Trek = require('../models/Trek');
const { protect, admin } = require('../middleware/auth');

// Get all treks (public)
router.get('/', async (req, res) => {
  try {
    const { difficulty, featured, minPrice, maxPrice, search } = req.query;
    const filter = { isActive: true };
    
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { tags: regex }
      ];
    }
    if (difficulty) filter.difficulty = difficulty;
    if (featured === 'true') filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter['pricing.perPerson'] = {};
      if (minPrice) filter['pricing.perPerson'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.perPerson'].$lte = Number(maxPrice);
    }

    const treks = await Trek.find(filter)
      .populate('destinations', 'name slug image')
      .sort({ isFeatured: -1, createdAt: -1 });
    
    res.json(treks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single trek by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const trek = await Trek.findOne({ slug: req.params.slug, isActive: true })
      .populate('destinations', 'name slug image description');
    
    if (!trek) return res.status(404).json({ message: 'Trek not found' });
    res.json(trek);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const treks = await Trek.find()
      .populate('destinations', 'name slug')
      .sort({ createdAt: -1 });
    res.json(treks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const trek = new Trek(req.body);
    const saved = await trek.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const trek = await Trek.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trek) return res.status(404).json({ message: 'Trek not found' });
    res.json(trek);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const trek = await Trek.findByIdAndDelete(req.params.id);
    if (!trek) return res.status(404).json({ message: 'Trek not found' });
    res.json({ message: 'Trek deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

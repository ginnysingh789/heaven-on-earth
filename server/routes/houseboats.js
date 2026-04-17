const express = require('express');
const router = express.Router();
const Houseboat = require('../models/Houseboat');
const { protect, admin } = require('../middleware/auth');

// Get all houseboats (public)
router.get('/', async (req, res) => {
  try {
    const { lake, category, featured, minPrice, maxPrice, availability, search } = req.query;
    const filter = { isActive: true };
    
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { location: regex },
        { tags: regex }
      ];
    }
    if (lake) filter.lake = lake;
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (availability) filter.availability = availability;
    if (minPrice || maxPrice) {
      filter['pricing.perNight'] = {};
      if (minPrice) filter['pricing.perNight'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.perNight'].$lte = Number(maxPrice);
    }

    const houseboats = await Houseboat.find(filter)
      .populate('destination', 'name slug image')
      .sort({ isFeatured: -1, createdAt: -1 });
    
    res.json(houseboats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single houseboat by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const houseboat = await Houseboat.findOne({ slug: req.params.slug, isActive: true })
      .populate('destination', 'name slug image description');
    
    if (!houseboat) return res.status(404).json({ message: 'Houseboat not found' });
    res.json(houseboat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const houseboats = await Houseboat.find()
      .populate('destination', 'name slug')
      .sort({ createdAt: -1 });
    res.json(houseboats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const houseboat = new Houseboat(req.body);
    const saved = await houseboat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const houseboat = await Houseboat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!houseboat) return res.status(404).json({ message: 'Houseboat not found' });
    res.json(houseboat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const houseboat = await Houseboat.findByIdAndDelete(req.params.id);
    if (!houseboat) return res.status(404).json({ message: 'Houseboat not found' });
    res.json({ message: 'Houseboat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

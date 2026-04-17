const express = require('express');
const router = express.Router();
const Homestay = require('../models/Homestay');
const { protect, admin } = require('../middleware/auth');

// Get all homestays (public)
router.get('/', async (req, res) => {
  try {
    const { region, featured, minPrice, maxPrice, mealsIncluded, search } = req.query;
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
    if (region) filter.region = region;
    if (featured === 'true') filter.isFeatured = true;
    if (mealsIncluded) {
      if (mealsIncluded === 'breakfast') filter['mealsIncluded.breakfast'] = true;
      if (mealsIncluded === 'all') {
        filter['mealsIncluded.breakfast'] = true;
        filter['mealsIncluded.dinner'] = true;
      }
    }
    if (minPrice || maxPrice) {
      filter['pricing.perNight'] = {};
      if (minPrice) filter['pricing.perNight'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.perNight'].$lte = Number(maxPrice);
    }

    const homestays = await Homestay.find(filter)
      .populate('destination', 'name slug image')
      .sort({ isFeatured: -1, createdAt: -1 });
    
    res.json(homestays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single homestay by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const homestay = await Homestay.findOne({ slug: req.params.slug, isActive: true })
      .populate('destination', 'name slug image description');
    
    if (!homestay) return res.status(404).json({ message: 'Homestay not found' });
    res.json(homestay);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const homestays = await Homestay.find()
      .populate('destination', 'name slug')
      .sort({ createdAt: -1 });
    res.json(homestays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const homestay = new Homestay(req.body);
    const saved = await homestay.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!homestay) return res.status(404).json({ message: 'Homestay not found' });
    res.json(homestay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndDelete(req.params.id);
    if (!homestay) return res.status(404).json({ message: 'Homestay not found' });
    res.json({ message: 'Homestay deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const TourPackage = require('../models/TourPackage');
const { protect, admin } = require('../middleware/auth');

// Get all packages (public)
router.get('/', async (req, res) => {
  try {
    const { category, subCategory, featured, difficulty, minPrice, maxPrice, search } = req.query;
    const filter = { isActive: true };
    
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { tags: regex }
      ];
    }
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (featured === 'true') filter.isFeatured = true;
    if (difficulty) filter.difficulty = difficulty;
    if (minPrice || maxPrice) {
      filter['pricing.perPerson'] = {};
      if (minPrice) filter['pricing.perPerson'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.perPerson'].$lte = Number(maxPrice);
    }

    const packages = await TourPackage.find(filter)
      .populate('destinations', 'name slug image')
      .sort({ isFeatured: -1, createdAt: -1 });
    
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single package by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const pkg = await TourPackage.findOne({ slug: req.params.slug, isActive: true })
      .populate('destinations', 'name slug image description');
    
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const packages = await TourPackage.find()
      .populate('destinations', 'name slug')
      .sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const pkg = new TourPackage(req.body);
    const saved = await pkg.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const pkg = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const pkg = await TourPackage.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

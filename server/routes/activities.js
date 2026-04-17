const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { protect, admin } = require('../middleware/auth');

// Get all activities (public)
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, featured, minPrice, maxPrice, search } = req.query;
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
    if (difficulty) filter.difficulty = difficulty;
    if (featured === 'true') filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter['pricing.perPerson'] = {};
      if (minPrice) filter['pricing.perPerson'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.perPerson'].$lte = Number(maxPrice);
    }

    const activities = await Activity.find(filter)
      .populate('destinations', 'name slug image')
      .sort({ isFeatured: -1, createdAt: -1 });
    
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single activity by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const activity = await Activity.findOne({ slug: req.params.slug, isActive: true })
      .populate('destinations', 'name slug image description');
    
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('destinations', 'name slug')
      .sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const RentalService = require('../models/RentalService');
const { protect, admin } = require('../middleware/auth');

// Get all rental services (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const filter = { isActive: true };
    
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { serviceType: regex },
        { tags: regex }
      ];
    }
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const rentals = await RentalService.find(filter)
      .populate('destinations', 'name slug image')
      .sort({ isFeatured: -1, createdAt: -1 });
    
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single rental service by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const rental = await RentalService.findOne({ slug: req.params.slug, isActive: true })
      .populate('destinations', 'name slug image description');
    
    if (!rental) return res.status(404).json({ message: 'Rental service not found' });
    res.json(rental);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const rentals = await RentalService.find()
      .populate('destinations', 'name slug')
      .sort({ createdAt: -1 });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const rental = new RentalService(req.body);
    const saved = await rental.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const rental = await RentalService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rental) return res.status(404).json({ message: 'Rental service not found' });
    res.json(rental);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const rental = await RentalService.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!rental) return res.status(404).json({ message: 'Rental service not found' });
    res.json({ message: 'Rental service deactivated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const NatureTrail = require('../models/NatureTrail');
const { protect, admin } = require('../middleware/auth');

// Get all active nature trail items (public)
router.get('/', async (req, res) => {
  try {
    const items = await NatureTrail.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single nature trail by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const item = await NatureTrail.findOne({ slug: req.params.slug, isActive: true });
    if (!item) return res.status(404).json({ message: 'Nature trail not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all nature trail items
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const items = await NatureTrail.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: create nature trail item
router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const item = new NatureTrail(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: update nature trail item
router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const updated = await NatureTrail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Nature trail not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: delete nature trail item
router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const item = await NatureTrail.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Nature trail not found' });
    res.json({ message: 'Nature trail deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

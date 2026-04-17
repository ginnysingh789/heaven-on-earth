const express = require('express');
const router = express.Router();
const Heritage = require('../models/Heritage');
const { protect, admin } = require('../middleware/auth');

// Get all active heritage items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Heritage.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single heritage item by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const item = await Heritage.findOne({ slug: req.params.slug, isActive: true });
    if (!item) return res.status(404).json({ message: 'Heritage item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all heritage items
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const items = await Heritage.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: create heritage item
router.post('/admin/create', protect, admin, async (req, res) => {
  try {
    const item = new Heritage(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: update heritage item
router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Heritage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Heritage item not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: delete heritage item
router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const item = await Heritage.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Heritage item not found' });
    res.json({ message: 'Heritage item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

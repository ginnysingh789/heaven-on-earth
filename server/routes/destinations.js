const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// GET /api/destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find({ isActive: true });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/destinations/:slug
router.get('/:slug', async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug, isActive: true });
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// GET /api/hotels
router.get('/', async (req, res) => {
  try {
    const { destination, category, minPrice, maxPrice, featured, search } = req.query;
    const filter = { isActive: true };
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { category: regex },
        { address: regex },
        { 'amenities': regex }
      ];
    }
    if (destination) filter.destination = destination;
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.startingPrice = {};
      if (minPrice) filter.startingPrice.$gte = Number(minPrice);
      if (maxPrice) filter.startingPrice.$lte = Number(maxPrice);
    }
    if (featured === 'true') filter.isFeatured = true;

    const hotels = await Hotel.find(filter).populate('destination', 'name slug');
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/hotels/:slug
router.get('/:slug', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ slug: req.params.slug, isActive: true })
      .populate('destination', 'name slug');
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/hotels/destination/:destinationSlug
router.get('/destination/:destinationSlug', async (req, res) => {
  try {
    const Destination = require('../models/Destination');
    const dest = await Destination.findOne({ slug: req.params.destinationSlug });
    if (!dest) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    const hotels = await Hotel.find({ destination: dest._id, isActive: true })
      .populate('destination', 'name slug');
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

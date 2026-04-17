const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const { protect } = require('../middleware/auth');
const { sendBookingConfirmation } = require('../utils/emailService');

// POST /api/bookings - Create a booking
router.post('/', protect, async (req, res) => {
  try {
    const {
      hotelId, roomTypeName, checkIn, checkOut, guests,
      addOns, paymentMethod, guestDetails, specialRequests
    } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const room = hotel.roomTypes.find(r => r.name === roomTypeName);
    if (!room) {
      return res.status(404).json({ message: 'Room type not found' });
    }

    if (room.availableRooms <= 0) {
      return res.status(400).json({ message: 'No rooms available for this type' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    const roomTotal = room.price * nights;
    const addOnsTotal = addOns ? addOns.reduce((sum, a) => sum + a.price, 0) : 0;
    const taxes = Math.round((roomTotal + addOnsTotal) * 0.18);
    const totalAmount = roomTotal + addOnsTotal + taxes;

    const booking = await Booking.create({
      user: req.user._id,
      hotel: hotelId,
      roomType: { name: room.name, price: room.price },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests || { adults: 1, children: 0, infants: 0 },
      nights,
      addOns: addOns || [],
      pricing: { roomTotal, addOnsTotal, taxes, discount: 0, totalAmount },
      paymentMethod: paymentMethod || 'card',
      paymentStatus: paymentMethod === 'pay_at_hotel' ? 'pending' : 'completed',
      status: 'confirmed',
      guestDetails: guestDetails || {},
      specialRequests: specialRequests || ''
    });

    // Decrease available rooms
    room.availableRooms = Math.max(0, room.availableRooms - 1);
    await hotel.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('hotel', 'name image destination location')
      .populate('user', 'name email');

    // Send booking confirmation email
    try {
      await sendBookingConfirmation(populatedBooking, hotel, guestDetails);
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Don't fail the booking if email fails
    }

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/bookings/my - Get user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hotel', 'name image destination')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/bookings/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('hotel', 'name image destination address')
      .populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

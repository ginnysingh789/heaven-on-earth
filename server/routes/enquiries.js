const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { protect, admin } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Create enquiry (public)
router.post('/', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const saved = await enquiry.save();

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New ${enquiry.enquiryType} Enquiry - ${enquiry.name}`,
        html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Type:</strong> ${enquiry.enquiryType}</p>
          <p><strong>Travel Date:</strong> ${enquiry.travelDate ? new Date(enquiry.travelDate).toLocaleDateString() : 'Not specified'}</p>
          <p><strong>Group Size:</strong> ${enquiry.groupSize.adults} adults, ${enquiry.groupSize.children} children, ${enquiry.groupSize.infants} infants</p>
          <p><strong>Message:</strong></p>
          <p>${enquiry.message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin routes
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (type) filter.enquiryType = type;

    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

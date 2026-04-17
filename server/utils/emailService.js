const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
const createTransporter = () => {
  // For development, use ethereal email (fake SMTP service)
  // For production, use real SMTP service like Gmail, SendGrid, etc.
  
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Production configuration
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development fallback - logs to console
    console.warn('⚠️  Email service not configured. Emails will be logged to console only.');
    return null;
  }
};

const sendBookingConfirmation = async (booking, hotel, guestDetails) => {
  const transporter = createTransporter();
  
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF8C00 0%, #FFA500 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-ref { font-size: 28px; font-weight: bold; color: #FF8C00; text-align: center; margin: 20px 0; letter-spacing: 2px; }
        .details-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF8C00; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .total { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .total-amount { font-size: 32px; font-weight: bold; color: #FF8C00; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #FF8C00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏔️ Kashmir Travels</h1>
          <h2>Booking Confirmation</h2>
        </div>
        
        <div class="content">
          <p>Dear ${guestDetails.name},</p>
          <p>Thank you for booking with Kashmir Travels! Your reservation has been confirmed.</p>
          
          <div class="booking-ref">${booking.bookingRef}</div>
          <p style="text-align: center; color: #666;">Your Booking Reference Number</p>
          
          <div class="details-box">
            <h3 style="margin-top: 0; color: #FF8C00;">📍 Hotel Details</h3>
            <div class="detail-row">
              <span class="detail-label">Hotel Name:</span>
              <span class="detail-value">${hotel.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-value">${hotel.location || hotel.destination?.name || 'Kashmir'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Room Type:</span>
              <span class="detail-value">${booking.roomType.name}</span>
            </div>
          </div>
          
          <div class="details-box">
            <h3 style="margin-top: 0; color: #FF8C00;">📅 Stay Details</h3>
            <div class="detail-row">
              <span class="detail-label">Check-in:</span>
              <span class="detail-value">${new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-out:</span>
              <span class="detail-value">${new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">${booking.nights} Night${booking.nights > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Guests:</span>
              <span class="detail-value">${booking.guests.adults} Adult${booking.guests.adults > 1 ? 's' : ''}${booking.guests.children > 0 ? `, ${booking.guests.children} Child${booking.guests.children > 1 ? 'ren' : ''}` : ''}</span>
            </div>
          </div>
          
          <div class="details-box">
            <h3 style="margin-top: 0; color: #FF8C00;">👤 Guest Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span class="detail-value">${guestDetails.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${guestDetails.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">${guestDetails.phone}</span>
            </div>
          </div>
          
          <div class="details-box">
            <h3 style="margin-top: 0; color: #FF8C00;">💰 Payment Summary</h3>
            <div class="detail-row">
              <span class="detail-label">Room Charges:</span>
              <span class="detail-value">₹${booking.pricing.roomTotal.toLocaleString()}</span>
            </div>
            ${booking.pricing.addOnsTotal > 0 ? `
            <div class="detail-row">
              <span class="detail-label">Add-ons:</span>
              <span class="detail-value">₹${booking.pricing.addOnsTotal.toLocaleString()}</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">Taxes & Fees:</span>
              <span class="detail-value">₹${booking.pricing.taxes.toLocaleString()}</span>
            </div>
          </div>
          
          <div class="total">
            <p style="margin: 0; color: #666; font-size: 14px;">TOTAL AMOUNT PAID</p>
            <div class="total-amount">₹${booking.pricing.totalAmount.toLocaleString()}</div>
            <p style="margin: 0; color: #666; font-size: 12px;">All taxes included</p>
          </div>
          
          <div style="text-align: center;">
            <p style="color: #666;">Payment Status: <strong style="color: #4CAF50;">${booking.paymentStatus === 'completed' ? 'Paid' : 'Pending'}</strong></p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <h3 style="color: #FF8C00;">📋 Important Information</h3>
          <ul style="color: #666;">
            <li>Please carry a valid ID proof at the time of check-in</li>
            <li>Check-in time: 2:00 PM | Check-out time: 11:00 AM</li>
            <li>For any changes or cancellations, please contact us at least 48 hours before check-in</li>
            <li>Keep this booking reference number for future correspondence</li>
          </ul>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 30px;">
            <strong>Kashmir Travels Team</strong><br>
            📧 support@kashmirtravels.com<br>
            📞 +91 XXXXXXXXXX<br>
            🌐 www.kashmirtravels.com
          </p>
        </div>
        
        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
          <p>© 2026 Kashmir Travels. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Kashmir Travels" <noreply@kashmirtravels.com>',
    to: guestDetails.email,
    subject: `Booking Confirmed - ${booking.bookingRef} - Kashmir Travels`,
    html: emailHTML,
    text: `
      Dear ${guestDetails.name},
      
      Your booking has been confirmed!
      
      Booking Reference: ${booking.bookingRef}
      Hotel: ${hotel.name}
      Check-in: ${new Date(booking.checkIn).toLocaleDateString()}
      Check-out: ${new Date(booking.checkOut).toLocaleDateString()}
      Total Amount: ₹${booking.pricing.totalAmount.toLocaleString()}
      
      Thank you for choosing Kashmir Travels!
      
      Best regards,
      Kashmir Travels Team
    `
  };

  if (transporter) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Booking confirmation email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending email:', error.message);
      return { success: false, error: error.message };
    }
  } else {
    // Log email to console in development
    console.log('\n📧 ===== BOOKING CONFIRMATION EMAIL =====');
    console.log('To:', guestDetails.email);
    console.log('Subject:', mailOptions.subject);
    console.log('Booking Ref:', booking.bookingRef);
    console.log('Guest:', guestDetails.name);
    console.log('Hotel:', hotel.name);
    console.log('Amount:', `₹${booking.pricing.totalAmount.toLocaleString()}`);
    console.log('========================================\n');
    return { success: true, dev: true };
  }
};

module.exports = {
  sendBookingConfirmation
};

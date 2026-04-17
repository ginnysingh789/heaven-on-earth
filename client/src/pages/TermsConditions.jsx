import { Link } from 'react-router-dom';

export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <Link to="/" className="text-primary hover:text-primary/80 text-sm mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
        <p className="text-slate-400">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-300 leading-relaxed">
            By accessing and using the Kashmir Travels website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            Kashmir Travels provides travel and tourism services including but not limited to:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Hotel and accommodation bookings</li>
            <li>Houseboat reservations</li>
            <li>Homestay arrangements</li>
            <li>Tour package bookings</li>
            <li>Trekking and adventure activity arrangements</li>
            <li>Vehicle rental services</li>
            <li>Travel consultation and itinerary planning</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Booking and Reservations</h2>
          <h3 className="text-xl font-bold text-white mb-3">3.1 Booking Process</h3>
          <p className="text-slate-300 leading-relaxed">
            All bookings are subject to availability and confirmation. A booking is only confirmed once you receive a confirmation email from Kashmir Travels with booking details and payment receipt.
          </p>

          <h3 className="text-xl font-bold text-white mb-3 mt-6">3.2 Pricing</h3>
          <p className="text-slate-300 leading-relaxed">
            All prices are listed in Indian Rupees (INR) unless otherwise stated. Prices are subject to change without notice until booking is confirmed. The price you pay is the price displayed at the time of booking confirmation.
          </p>

          <h3 className="text-xl font-bold text-white mb-3 mt-6">3.3 Payment</h3>
          <p className="text-slate-300 leading-relaxed">
            Payment must be made in full at the time of booking unless otherwise agreed. We accept payments via credit/debit cards, UPI, net banking, and other payment methods as displayed on our website. All payments are processed securely through authorized payment gateways.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Cancellation and Refunds</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            Cancellation and refund policies vary by service type and provider. Please refer to our <Link to="/cancellation-policy" className="text-primary hover:text-primary/80">Cancellation Policy</Link> for detailed information. General guidelines:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Cancellations must be made in writing via email or through your account</li>
            <li>Refund amounts depend on the timing of cancellation</li>
            <li>Some bookings may be non-refundable</li>
            <li>Refunds are processed within 7-14 business days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. User Responsibilities</h2>
          <p className="text-slate-300 leading-relaxed mb-3">As a user of our services, you agree to:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Provide accurate and complete information during booking</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect local customs and traditions in Kashmir</li>
            <li>Follow safety guidelines provided by tour operators and guides</li>
            <li>Carry valid identification and travel documents</li>
            <li>Arrive on time for scheduled activities and transfers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Travel Documents and Permits</h2>
          <p className="text-slate-300 leading-relaxed">
            You are responsible for ensuring you have all necessary travel documents, permits, and visas required for your trip. Kashmir Travels can assist with obtaining permits where applicable, but ultimate responsibility lies with the traveler. We are not liable for any issues arising from incomplete or invalid documentation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Force Majeure</h2>
          <p className="text-slate-300 leading-relaxed">
            Kashmir Travels is not liable for any failure to perform its obligations due to circumstances beyond our reasonable control, including but not limited to: natural disasters, weather conditions, political unrest, strikes, pandemics, government restrictions, or any other force majeure events. In such cases, we will work with you to reschedule or provide alternative arrangements where possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            Kashmir Travels acts as an intermediary between travelers and service providers (hotels, tour operators, etc.). While we strive to ensure quality services:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>We are not liable for the acts, errors, or omissions of third-party service providers</li>
            <li>Our liability is limited to the amount paid for the specific service</li>
            <li>We are not responsible for personal injury, property damage, or loss unless caused by our negligence</li>
            <li>Travel insurance is strongly recommended for all bookings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
          <p className="text-slate-300 leading-relaxed">
            All content on the Kashmir Travels website, including text, graphics, logos, images, and software, is the property of Kashmir Travels or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. User-Generated Content</h2>
          <p className="text-slate-300 leading-relaxed">
            By submitting reviews, photos, or other content to our website, you grant Kashmir Travels a non-exclusive, royalty-free, perpetual license to use, reproduce, and display such content for marketing and promotional purposes. You warrant that you own the rights to any content you submit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">11. Privacy</h2>
          <p className="text-slate-300 leading-relaxed">
            Your use of our services is also governed by our <Link to="/privacy-policy" className="text-primary hover:text-primary/80">Privacy Policy</Link>. Please review it to understand how we collect, use, and protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">12. Dispute Resolution</h2>
          <p className="text-slate-300 leading-relaxed">
            Any disputes arising from these Terms and Conditions or your use of our services shall be governed by the laws of India. The courts of Srinagar, Jammu & Kashmir shall have exclusive jurisdiction over any disputes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">13. Modifications</h2>
          <p className="text-slate-300 leading-relaxed">
            Kashmir Travels reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any modifications constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            For questions about these Terms and Conditions, please contact us:
          </p>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-300"><strong className="text-white">Kashmir Travels</strong></p>
            <p className="text-slate-300">Email: support@kashmirtravels.com</p>
            <p className="text-slate-300">Phone: +91 194 2501234</p>
            <p className="text-slate-300">Address: Srinagar, Jammu & Kashmir, India</p>
          </div>
        </section>

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
          <p className="text-slate-300 text-sm">
            <strong className="text-white">Important:</strong> By using Kashmir Travels services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

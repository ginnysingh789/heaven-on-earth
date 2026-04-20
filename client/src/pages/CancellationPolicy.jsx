import { Link } from 'react-router-dom';

export default function CancellationPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <Link to="/" className="text-primary hover:text-primary/80 text-sm mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-white mb-4">Cancellation & Refund Policy</h1>
        <p className="text-slate-400">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. General Policy</h2>
          <p className="text-slate-300 leading-relaxed">
            At Kashmir Travels, we understand that travel plans can change. This Cancellation and Refund Policy outlines the terms and conditions for canceling bookings and requesting refunds. Please read this policy carefully before making a booking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Hotel & Resort Bookings</h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-white mb-3">Cancellation Timeline</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">30+ days:</span>
                <span>Full refund minus 10% processing fee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">15-29 days:</span>
                <span>75% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">7-14 days:</span>
                <span>50% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">Less than 7 days:</span>
                <span>No refund</span>
              </li>
            </ul>
          </div>

          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">Note:</strong> Peak season bookings (April-June, December-January) may have stricter cancellation policies. Please check your booking confirmation for specific terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Houseboat Reservations</h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-white mb-3">Cancellation Timeline</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">21+ days:</span>
                <span>Full refund minus 15% processing fee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">14-20 days:</span>
                <span>60% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">7-13 days:</span>
                <span>40% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">Less than 7 days:</span>
                <span>No refund</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Tour Packages</h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-white mb-3">Cancellation Timeline</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">45+ days:</span>
                <span>Full refund minus 20% processing fee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">30-44 days:</span>
                <span>70% refund of total package cost</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">15-29 days:</span>
                <span>50% refund of total package cost</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">7-14 days:</span>
                <span>25% refund of total package cost</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">Less than 7 days:</span>
                <span>No refund</span>
              </li>
            </ul>
          </div>

          <p className="text-slate-300 leading-relaxed">
            Tour packages include multiple components (accommodation, transport, activities). Partial cancellations are not permitted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Trekking & Adventure Activities</h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-white mb-3">Cancellation Timeline</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">30+ days:</span>
                <span>Full refund minus 25% processing fee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">15-29 days:</span>
                <span>60% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">7-14 days:</span>
                <span>30% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">Less than 7 days:</span>
                <span>No refund</span>
              </li>
            </ul>
          </div>

          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">Weather Cancellations:</strong> If a trek is canceled by the operator due to adverse weather or safety concerns, you will receive a full refund or the option to reschedule.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Vehicle Rentals</h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-white mb-3">Cancellation Timeline</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">48+ hours:</span>
                <span>Full refund minus 10% processing fee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">24-48 hours:</span>
                <span>50% refund of rental amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">Less than 24 hours:</span>
                <span>No refund</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Homestay Bookings</h2>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-white mb-3">Cancellation Timeline</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">14+ days:</span>
                <span>Full refund minus 10% processing fee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">7-13 days:</span>
                <span>60% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">3-6 days:</span>
                <span>40% refund of total booking amount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold min-w-[120px]">Less than 3 days:</span>
                <span>No refund</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. How to Cancel</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            To cancel a booking, please follow these steps:
          </p>
          <ol className="list-decimal list-inside text-slate-300 space-y-2 ml-4">
            <li>Log in to your Kashmir Travels account</li>
            <li>Go to "My Bookings" section</li>
            <li>Select the booking you wish to cancel</li>
            <li>Click "Cancel Booking" and follow the prompts</li>
            <li>You will receive a cancellation confirmation email</li>
          </ol>
          <p className="text-slate-300 leading-relaxed mt-3">
            Alternatively, you can email us at <a href="mailto:cancellations@kashmirtravels.com" className="text-primary hover:text-primary/80">cancellations@kashmirtravels.com</a> with your booking reference number.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Refund Process</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Refunds are processed within 7-14 business days from the date of cancellation approval</li>
            <li>Refunds will be credited to the original payment method used for booking</li>
            <li>Bank processing times may vary (3-7 business days additional)</li>
            <li>You will receive an email notification once the refund is processed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. Modification of Bookings</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            If you wish to modify your booking instead of canceling:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Date changes are subject to availability and may incur additional charges</li>
            <li>Modifications must be requested at least 7 days before check-in/start date</li>
            <li>A modification fee may apply depending on the service type</li>
            <li>Differences (if any) will be adjusted accordingly</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">11. Force Majeure & Exceptional Circumstances</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            In case of unforeseen circumstances beyond our control, including:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Natural disasters (earthquakes, floods, landslides)</li>
            <li>Political unrest or security concerns</li>
            <li>Government-imposed travel restrictions</li>
            <li>Pandemics or health emergencies</li>
          </ul>
          <p className="text-slate-300 leading-relaxed mt-3">
            Kashmir Travels will work with you to provide one of the following options:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-2">
            <li>Full refund of the booking amount</li>
            <li>Credit voucher valid for 12 months</li>
            <li>Rescheduling to alternative dates without penalty</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">12. No-Show Policy</h2>
          <p className="text-slate-300 leading-relaxed">
            If you fail to show up for your booking without prior cancellation, the entire booking amount will be forfeited. No refunds will be provided for no-shows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">13. Travel Insurance</h2>
          <p className="text-slate-300 leading-relaxed">
            We strongly recommend purchasing comprehensive travel insurance that covers trip cancellations, medical emergencies, and other unforeseen events. Travel insurance can provide additional protection beyond our cancellation policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">14. Contact Us</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            For questions about cancellations and refunds:
          </p>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-300"><strong className="text-white">Kashmir Travels - Cancellations Department</strong></p>
            <p className="text-slate-300">Email: cancellations@kashmirtravels.com</p>
            <p className="text-slate-300">Phone: +91 194 2501234 (Mon-Sat, 9 AM - 6 PM IST)</p>
            <p className="text-slate-300">WhatsApp: +91 9876543210</p>
          </div>
        </section>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mt-8">
          <p className="text-slate-300 text-sm">
            <strong className="text-red-400">Important:</strong> Please read the cancellation policy carefully before making a booking. By completing a booking, you acknowledge that you have read and agree to this Cancellation and Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

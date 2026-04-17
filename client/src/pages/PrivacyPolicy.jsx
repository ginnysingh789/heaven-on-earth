import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <Link to="/" className="text-primary hover:text-primary/80 text-sm mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p className="text-slate-300 leading-relaxed">
            Kashmir Travels ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website kashmirtravels.com and use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-bold text-white mb-3">2.1 Personal Information</h3>
          <p className="text-slate-300 leading-relaxed mb-3">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Register for an account</li>
            <li>Make a booking or reservation</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us for customer support</li>
            <li>Submit reviews or testimonials</li>
          </ul>
          <p className="text-slate-300 leading-relaxed mt-3">
            This information may include: name, email address, phone number, postal address, payment information, travel preferences, and passport details (when required for bookings).
          </p>

          <h3 className="text-xl font-bold text-white mb-3 mt-6">2.2 Automatically Collected Information</h3>
          <p className="text-slate-300 leading-relaxed">
            When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device. We also collect information about your browsing behavior and interactions with our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
          <p className="text-slate-300 leading-relaxed mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Process and fulfill your bookings and reservations</li>
            <li>Send you booking confirmations and travel documents</li>
            <li>Communicate with you about your bookings and inquiries</li>
            <li>Provide customer support and respond to your requests</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraudulent transactions and protect against security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li><strong>Service Providers:</strong> Hotels, houseboats, tour operators, and other service providers necessary to fulfill your bookings</li>
            <li><strong>Payment Processors:</strong> Third-party payment gateways to process your transactions securely</li>
            <li><strong>Business Partners:</strong> Travel insurance providers and other partners (with your consent)</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
          </ul>
          <p className="text-slate-300 leading-relaxed mt-3">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
          <p className="text-slate-300 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
          <p className="text-slate-300 leading-relaxed mb-3">You have the right to:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li>Access and receive a copy of your personal data</li>
            <li>Correct inaccurate or incomplete personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your personal data</li>
            <li>Withdraw consent for marketing communications</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
          <p className="text-slate-300 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Links</h2>
          <p className="text-slate-300 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
          <p className="text-slate-300 leading-relaxed">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
          <p className="text-slate-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any modifications indicates your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
          <p className="text-slate-300 leading-relaxed mb-3">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-300"><strong className="text-white">Kashmir Travels</strong></p>
            <p className="text-slate-300">Email: privacy@kashmirtravels.com</p>
            <p className="text-slate-300">Phone: +91 194 2501234</p>
            <p className="text-slate-300">Address: Srinagar, Jammu & Kashmir, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}

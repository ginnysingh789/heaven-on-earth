import { useState } from 'react';
import api from '../api';
import { getContactConfig } from '../utils/whatsapp';

export default function Contact() {
  const { contactPhone, contactEmail } = getContactConfig();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createEnquiry({
        ...form,
        enquiryType: 'general',
        groupSize: { adults: 0, children: 0, infants: 0 }
      });
      alert('Thank you for contacting us! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert(err.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-600">Get in touch with us for any queries or bookings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2">Message *</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00]"
                placeholder="Tell us about your travel plans or any questions you have..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:shadow-xl text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-[#FF8C00]/20"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-icons text-primary text-[24px]">location_on</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Office Address</h3>
                  <p className="text-slate-600">Dal Lake, Srinagar<br />Jammu & Kashmir, India - 190001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-icons text-primary text-[24px]">phone</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                  <p className="text-slate-600">{contactPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-icons text-primary text-[24px]">email</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">{contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-icons text-primary text-[24px]">schedule</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Working Hours</h3>
                  <p className="text-slate-600">Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/kashmiroffbeat" target="_blank" rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-orange-50 p-3 rounded-lg transition-all border-2 border-gray-200 hover:border-[#FF8C00]">
                <span className="material-icons text-slate-700">facebook</span>
              </a>
              <a href="https://www.instagram.com/kash_offbeat" target="_blank" rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-orange-50 p-3 rounded-lg transition-all border-2 border-gray-200 hover:border-[#FF8C00]">
                <span className="material-icons text-slate-700">camera_alt</span>
              </a>
              <a href="https://x.com/kash_offbeat" target="_blank" rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-orange-50 p-3 rounded-lg transition-all border-2 border-gray-200 hover:border-[#FF8C00]">
                <span className="material-icons text-slate-700">tag</span>
              </a>
              <a href="https://www.youtube.com/@kmrOffbeat" target="_blank" rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-orange-50 p-3 rounded-lg transition-all border-2 border-gray-200 hover:border-[#FF8C00]">
                <span className="material-icons text-slate-700">play_circle</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

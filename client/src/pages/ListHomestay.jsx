import { useState } from 'react';
import api from '../api';

export default function ListHomestay() {
  const [form, setForm] = useState({
    name: '', hostName: '', email: '', phone: '', location: '', region: '',
    description: '', rooms: '', guests: '', mealsBreakfast: false, mealsDinner: false,
    pricePerNight: '', amenities: '', languages: '', images: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createEnquiry({
        name: form.hostName,
        email: form.email,
        phone: form.phone,
        enquiryType: 'general',
        message: `HOMESTAY LISTING REQUEST\n\nHomestay Name: ${form.name}\nHost: ${form.hostName}\nLocation: ${form.location}, ${form.region}\nRooms: ${form.rooms}\nGuests: ${form.guests}\nPrice: ₹${form.pricePerNight}/night\nMeals: ${form.mealsBreakfast ? 'Breakfast' : ''} ${form.mealsDinner ? 'Dinner' : ''}\nAmenities: ${form.amenities}\nLanguages: ${form.languages}\nImages: ${form.images}\n\nDescription: ${form.description}\n\nAdditional Message: ${form.message}`,
        groupSize: { adults: 0, children: 0, infants: 0 }
      });
      setSubmitted(true);
      setForm({
        name: '', hostName: '', email: '', phone: '', location: '', region: '',
        description: '', rooms: '', guests: '', mealsBreakfast: false, mealsDinner: false,
        pricePerNight: '', amenities: '', languages: '', images: '', message: ''
      });
    } catch (err) {
      alert(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
          <span className="material-icons text-green-500 text-6xl mb-4 block">check_circle</span>
          <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-slate-300 mb-6">
            Your homestay listing request has been submitted successfully. Our team will review your submission and contact you within 2-3 business days.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setSubmitted(false)} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold">
              Submit Another
            </button>
            <a href="/homestays" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold">
              Browse Homestays
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-white mb-2">List Your Homestay</h1>
        <p className="text-slate-400">Join our community and share your home with travelers</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Homestay Name *</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="e.g., Cozy Mountain View Homestay"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Host Name *</label>
              <input type="text" required value={form.hostName} onChange={e => setForm({...form, hostName: e.target.value})}
                placeholder="Your full name"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Email *</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                placeholder="your.email@example.com"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Phone *</label>
              <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Location *</label>
              <input type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                placeholder="e.g., Dal Lake Road, Srinagar"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Region *</label>
              <select required value={form.region} onChange={e => setForm({...form, region: e.target.value})}
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white">
                <option value="">Select region</option>
                <option value="Srinagar">Srinagar</option>
                <option value="Gulmarg">Gulmarg</option>
                <option value="Pahalgam">Pahalgam</option>
                <option value="Sonamarg">Sonamarg</option>
                <option value="Gurez">Gurez Valley</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Description *</label>
            <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Describe your homestay, what makes it special, nearby attractions..."
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Number of Rooms *</label>
              <input type="number" required min="1" value={form.rooms} onChange={e => setForm({...form, rooms: e.target.value})}
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Guest Capacity *</label>
              <input type="number" required min="1" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})}
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Price per Night (₹) *</label>
              <input type="number" required min="0" value={form.pricePerNight} onChange={e => setForm({...form, pricePerNight: e.target.value})}
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Meals Included</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" checked={form.mealsBreakfast} onChange={e => setForm({...form, mealsBreakfast: e.target.checked})}
                  className="w-4 h-4" />
                Breakfast
              </label>
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" checked={form.mealsDinner} onChange={e => setForm({...form, mealsDinner: e.target.checked})}
                  className="w-4 h-4" />
                Dinner
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Amenities</label>
            <input type="text" value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})}
              placeholder="e.g., WiFi, Parking, Garden, Heater (comma separated)"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Languages Spoken</label>
            <input type="text" value={form.languages} onChange={e => setForm({...form, languages: e.target.value})}
              placeholder="e.g., English, Hindi, Kashmiri (comma separated)"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Image URLs</label>
            <input type="text" value={form.images} onChange={e => setForm({...form, images: e.target.value})}
              placeholder="Paste image URLs separated by commas (we'll contact you for more photos)"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Additional Message</label>
            <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              placeholder="Any additional information you'd like to share..."
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-slate-300">
              <strong className="text-white">Note:</strong> After submission, our team will review your homestay details and contact you within 2-3 business days to complete the listing process.
            </p>
          </div>

          <button type="submit" disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Homestay Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

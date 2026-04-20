import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';
import { DetailPageSkeleton } from '../components/Skeleton';

export default function HomestayDetail() {
  const { slug } = useParams();
  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', email: '', phone: '', travelDate: '', groupSize: { adults: 2, children: 0, infants: 0 }, message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadHomestay();
  }, [slug]);

  const loadHomestay = async () => {
    setLoading(true);
    try {
      const data = await api.getHomestay(slug);
      setHomestay(data);
    } catch (err) {
      setHomestay(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createEnquiry({
        ...enquiryForm,
        enquiryType: 'hotel',
        relatedItem: homestay._id
      });
      alert('Enquiry submitted successfully! We will contact you soon.');
      setShowEnquiry(false);
      setEnquiryForm({ name: '', email: '', phone: '', travelDate: '', groupSize: { adults: 2, children: 0, infants: 0 }, message: '' });
    } catch (err) {
      alert(err.message || 'Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <DetailPageSkeleton />;
  if (!homestay) return <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]"><span className="text-slate-500 font-light tracking-widest uppercase text-xs">Homestay not found</span></div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 page-enter">
      <main className="pt-10 pb-32 flex flex-col items-center px-6">

        {/* Editorial Header */}
        <div className="w-full max-w-6xl mb-10 text-center">
          <Link to="/homestays" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-600 hover:text-slate-700 transition-colors mb-4">
            <span className="material-icons text-sm">arrow_back</span> Back to Homestays
          </Link>
          <span className="font-sans uppercase tracking-widest text-[10px] text-slate-600 font-bold mb-2 block">
            Homestay · {homestay.location}
            {homestay.isVerified && <span className="ml-2 text-green-600">✓ Verified</span>}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-slate-900">{homestay.name}</h2>
        </div>

        {/* Bento Article Grid */}
        <article className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Image — 7 cols */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={homestay.images?.length > 0 ? homestay.images[currentImageIndex] : homestay.coverImage}
              alt={homestay.name}
              className="w-full aspect-[4/5] md:aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {homestay.images?.length > 1 && (
              <>
                <button onClick={() => setCurrentImageIndex(p => p === 0 ? homestay.images.length - 1 : p - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button onClick={() => setCurrentImageIndex(p => p === homestay.images.length - 1 ? 0 : p + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                  <span className="material-icons">chevron_right</span>
                </button>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-2 text-white mb-2">
                <span className="material-icons text-sm">location_on</span>
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold">{homestay.location}, Kashmir</span>
              </div>
              {homestay.hostName && (
                <div className="flex items-center gap-2 text-white/80">
                  <span className="material-icons text-sm">person</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold">Host: {homestay.hostName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content — 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-8 py-4">
            <header>
              <h3 className="font-serif text-4xl font-bold text-slate-900 mb-4">{homestay.name}</h3>
              <p className="text-slate-700 text-lg leading-relaxed">{homestay.overview || homestay.description}</p>
            </header>

            {/* Stats */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-4 block">Property Details</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'bed', label: 'Rooms', val: homestay.rooms?.total || homestay.capacity?.bedrooms || '—' },
                  { icon: 'groups', label: 'Capacity', val: `${homestay.capacity?.guests || '—'} guests` },
                  { icon: 'meeting_room', label: 'Bedrooms', val: homestay.capacity?.bedrooms || homestay.rooms?.total || '—' },
                  { icon: 'bathroom', label: 'Bathrooms', val: homestay.capacity?.bathrooms || 1 },
                ].map((s, i) => (
                  <div key={i} className="bg-[#eceef0] rounded-md p-3 flex items-center gap-3">
                    <span className="material-icons text-slate-500 text-sm">{s.icon}</span>
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-widest text-slate-600 font-bold">{s.label}</p>
                      <p className="font-sans text-sm font-bold text-slate-900">{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {homestay.amenities?.length > 0 && (
              <div>
                <span className="price-label mb-3">The Experience</span>
                <div className="flex flex-wrap gap-2">
                  {homestay.amenities.map((a, i) => (
                    <div key={i} className="tag-pill">
                      <span className="material-icons">check</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-8 border-t border-slate-200">
              <div className="mb-8 text-[10px] font-sans font-bold text-slate-600 uppercase tracking-widest">
                <div>Check-in {homestay.checkIn || '2 PM'}</div>
                <div>Check-out {homestay.checkOut || '11 AM'}</div>
              </div>
              <a href={buildWhatsAppUrl(homestay.name)} target="_blank" rel="noopener noreferrer"
                className="btn-cta mb-4 no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                ENQUIRY ON WHATSAPP
                <span className="material-icons text-lg">arrow_right_alt</span>
              </a>
              <a href={buildEmailUrl(homestay.name)}
                className="btn-cta mb-4 no-underline" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                <span className="material-icons text-lg">email</span>
                ENQUIRY VIA EMAIL
                <span className="material-icons text-lg">arrow_right_alt</span>
              </a>
            </div>
          </div>
        </article>

        {/* Highlights */}
        {homestay.highlights?.length > 0 && (
          <section className="w-full max-w-6xl mt-16 bg-white border border-slate-200 rounded-2xl p-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-icons text-[#FF8C00] text-lg">favorite</span>
              <span className="font-sans text-sm uppercase tracking-widest text-slate-700 font-bold">Why Stay Here</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {homestay.highlights.slice(0, 6).map((h, i) => {
                const icons = ['architecture','restaurant','directions_walk','nature','wifi','local_parking'];
                return (
                  <div key={i} className="flex gap-4 p-5 bg-orange-50 border border-orange-100 rounded-xl">
                    <span className="material-icons text-[#FF8C00] text-2xl flex-shrink-0 mt-0.5">{icons[i % icons.length]}</span>
                    <p className="text-slate-800 text-base font-medium leading-snug">{h}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>

      {showEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-slate-900">Book Homestay</h2>
              <button onClick={() => setShowEnquiry(false)} className="p-1 hover:bg-[#eceef0] rounded-md"><span className="material-icons">close</span></button>
            </div>
            <form onSubmit={handleEnquiry} className="space-y-4">
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-600 block mb-1">Name *</label>
                <input type="text" required value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} className="w-full bg-[#eceef0] border-none rounded-md px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-600 block mb-1">Email *</label>
                  <input type="email" required value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} className="w-full bg-[#eceef0] border-none rounded-md px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400" />
                </div>
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-600 block mb-1">Phone *</label>
                  <input type="tel" required value={enquiryForm.phone} onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})} className="w-full bg-[#eceef0] border-none rounded-md px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400" />
                </div>
              </div>
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-600 block mb-1">Check-in Date</label>
                <input type="date" value={enquiryForm.travelDate} onChange={e => setEnquiryForm({...enquiryForm, travelDate: e.target.value})} className="w-full bg-[#eceef0] border-none rounded-md px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-600 block mb-1">Number of Guests</label>
                <input type="number" min="1" value={enquiryForm.groupSize.adults} onChange={e => setEnquiryForm({...enquiryForm, groupSize: {...enquiryForm.groupSize, adults: Number(e.target.value)}})} className="w-full bg-[#eceef0] border-none rounded-md px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-600 block mb-1">Message *</label>
                <textarea required rows={3} value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})} className="w-full bg-[#eceef0] border-none rounded-md px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400" />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-slate-900 text-white py-4 rounded-md font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-slate-700 transition-colors disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

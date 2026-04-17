import { useState } from 'react';
import api from '../api';

export default function SubmitArticle() {
  const [form, setForm] = useState({
    title: '', category: 'literature', authorName: '', authorEmail: '', authorBio: '',
    excerpt: '', content: '', tags: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createEnquiry({
        name: form.authorName,
        email: form.authorEmail,
        phone: '',
        enquiryType: 'general',
        message: `GUEST ARTICLE SUBMISSION\n\nTitle: ${form.title}\nCategory: ${form.category}\nAuthor: ${form.authorName}\nAuthor Bio: ${form.authorBio}\n\nExcerpt:\n${form.excerpt}\n\nContent:\n${form.content}\n\nTags: ${form.tags}\n\nAdditional Message:\n${form.message}`,
        groupSize: { adults: 0, children: 0, infants: 0 }
      });
      setSubmitted(true);
      setForm({
        title: '', category: 'literature', authorName: '', authorEmail: '', authorBio: '',
        excerpt: '', content: '', tags: '', message: ''
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
          <h1 className="text-3xl font-bold text-white mb-4">Thank You for Your Submission!</h1>
          <p className="text-slate-300 mb-6">
            Your article has been submitted successfully. Our editorial team will review your submission and contact you within 5-7 business days.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setSubmitted(false)} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold">
              Submit Another Article
            </button>
            <a href="/articles" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold">
              Browse Articles
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-white mb-2">Submit Your Article</h1>
        <p className="text-slate-400">Share your story, poem, or article about Kashmir with our community</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Article Title *</label>
            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Enter a compelling title for your article"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Category *</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})}
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white">
              <option value="heritage">Heritage & Culture</option>
              <option value="history">History</option>
              <option value="literature">Literature</option>
              <option value="poetry">Poetry</option>
              <option value="travel-stories">Travel Stories</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Your Name *</label>
              <input type="text" required value={form.authorName} onChange={e => setForm({...form, authorName: e.target.value})}
                placeholder="Full name"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Email *</label>
              <input type="email" required value={form.authorEmail} onChange={e => setForm({...form, authorEmail: e.target.value})}
                placeholder="your.email@example.com"
                className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Author Bio *</label>
            <textarea required rows={3} value={form.authorBio} onChange={e => setForm({...form, authorBio: e.target.value})}
              placeholder="Tell us about yourself in 2-3 sentences"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Excerpt *</label>
            <textarea required rows={3} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})}
              placeholder="A brief summary of your article (150-200 characters)"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Article Content *</label>
            <textarea required rows={12} value={form.content} onChange={e => setForm({...form, content: e.target.value})}
              placeholder="Write your article here... (minimum 500 words recommended)"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
            <p className="text-xs text-slate-500 mt-2">Word count: {form.content.split(/\s+/).filter(Boolean).length}</p>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Tags</label>
            <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
              placeholder="e.g., Kashmir, Culture, Poetry (comma separated)"
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 uppercase block mb-2">Additional Message</label>
            <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              placeholder="Any additional information or special requests..."
              className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white" />
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-slate-300">
              <strong className="text-white">Submission Guidelines:</strong>
            </p>
            <ul className="text-sm text-slate-300 mt-2 space-y-1 list-disc list-inside">
              <li>Articles should be original and not published elsewhere</li>
              <li>Minimum 500 words recommended</li>
              <li>Include proper citations for any references</li>
              <li>Our team will review within 5-7 business days</li>
            </ul>
          </div>

          <button type="submit" disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Article for Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

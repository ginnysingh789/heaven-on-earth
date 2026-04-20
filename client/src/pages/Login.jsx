import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (returnTo) {
        navigate(returnTo.pathname, { state: returnTo.state });
      } else {
        navigate(data.role === 'admin' ? '/admin' : '/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 to-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
          <div className="text-center mb-8">
            <img src="/Asset 5@300x.png" alt="Kashmir Offbeat" className="h-14 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900">Sign into KashmirOffBeat Account</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00] transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#FF8C00]/20 focus:border-[#FF8C00] transition-all" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:shadow-xl text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-[#FF8C00]/20">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account? <Link to="/register" className="text-[#FF8C00] font-semibold hover:underline">Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

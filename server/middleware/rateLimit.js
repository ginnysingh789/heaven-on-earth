// Lightweight, dependency-free in-memory rate limiter for sensitive endpoints
// (login / register). It is intentionally generous so it never affects real
// users, and it FAILS OPEN: any internal error just lets the request through,
// so the limiter can never take the site down.
//
// NOTE: requires `app.set('trust proxy', 1)` so req.ip is the real client IP
// behind the nginx reverse proxy (otherwise every visitor shares one IP).

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // per IP per window

const hits = new Map(); // ip -> { count, resetAt }

// Periodically drop expired entries so the map can't grow unbounded.
const sweep = setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(ip);
  }
}, WINDOW_MS);
if (sweep.unref) sweep.unref(); // don't keep the process alive

const authRateLimiter = (req, res, next) => {
  try {
    const now = Date.now();
    const ip = req.ip || (req.connection && req.connection.remoteAddress) || 'unknown';

    let entry = hits.get(ip);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + WINDOW_MS };
      hits.set(ip, entry);
    }
    entry.count += 1;

    if (entry.count > MAX_REQUESTS) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
    next();
  } catch (err) {
    // Never block legitimate traffic because of a limiter bug.
    next();
  }
};

module.exports = { authRateLimiter };

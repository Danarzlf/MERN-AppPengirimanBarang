// middlewares/rateLimit.js
const rateLimit = require('express-rate-limit');

// Set the rate limit: 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 detik
  limit: 2, // batasi setiap IP hingga 1 permintaan per windowMs
  message: {
    status: 429,
    error: 'Terlalu banyak permintaan, silakan coba lagi nanti.',
  },
});

module.exports = apiLimiter;

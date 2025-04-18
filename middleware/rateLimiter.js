const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, 
  message: {
    message: 'Too many attempts, please try again later.',
  },
});

module.exports = { authLimiter };

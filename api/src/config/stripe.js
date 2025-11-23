const Stripe = require('stripe');
const env = require('./env');
const logger = require('../utils/logger');

// Initialize Stripe with provided secret key
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: false,
});

logger.info('✅ Stripe initialized successfully');

module.exports = stripe;

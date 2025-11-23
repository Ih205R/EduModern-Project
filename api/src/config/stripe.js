const Stripe = require('stripe');
const env = require('./env');
const logger = require('../utils/logger');

if (!env.STRIPE_SECRET_KEY) {
  logger.error('STRIPE_SECRET_KEY is not defined in environment variables');
  throw new Error('STRIPE_SECRET_KEY is required');
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

logger.info('✅ Stripe client initialized');

module.exports = stripe;

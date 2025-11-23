const Joi = require('joi');
require('dotenv').config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  API_VERSION: Joi.string().default('v1'),
  
  // Database - Supabase PostgreSQL
  DATABASE_URL: Joi.string().required(),
  
  // Supabase
  SUPABASE_URL: Joi.string().uri().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
  
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  
  // Stripe (Your Keys)
  STRIPE_SECRET_KEY: Joi.string().default('sk_test_51SWBzFEL42zCNFEU0voMYBcUoKLJAuLZmg4JcC2HusHcORcX2WAEWJXO2X8J9hy8rA25lgeHDvR4qDW4of9s8nGS00vbVa17Cl'),
  STRIPE_PUBLISHABLE_KEY: Joi.string().default('pk_test_51SWBzFEL42zCNFEUp50HI8EljXvr4NeXAMMcvzx6Atjetodvq79YHV47zxMATKIuDQ5Sg2kEp4HHOIzNj8B0gKT100pOXODelJ'),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  STRIPE_CURRENCY: Joi.string().default('eur'),
  
  OPENAI_API_KEY: Joi.string().required(),
  OPENAI_MODEL: Joi.string().default('gpt-4-turbo-preview'),
  
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().default(587),
  EMAIL_SECURE: Joi.boolean().default(false),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().email().required(),
  EMAIL_FROM_NAME: Joi.string().default('EduModern'),
  
  REDIS_URL: Joi.string().uri().required(),
  
  FRONTEND_URL: Joi.string().uri().required(),
  
  BCRYPT_ROUNDS: Joi.number().default(12),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),
  
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
}).unknown();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

module.exports = env;
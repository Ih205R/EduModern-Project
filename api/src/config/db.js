const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

// Create Prisma client instance with logging
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    logger.debug('Query: ' + e.query);
    logger.debug('Duration: ' + e.duration + 'ms');
  });
}

// Log errors
prisma.$on('error', (e) => {
  logger.error('Prisma Error:', e);
});

// Log warnings
prisma.$on('warn', (e) => {
  logger.warn('Prisma Warning:', e);
});

// Test database connection
const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully (Supabase PostgreSQL)');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const disconnectDB = async () => {
  await prisma.$disconnect();
  logger.info('Database disconnected');
};

module.exports = {
  prisma,
  connectDB,
  disconnectDB,
};

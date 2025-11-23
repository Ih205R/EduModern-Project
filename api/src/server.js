const app = require('./app');
const { connectDatabase, disconnectDatabase } = require('./config/db');
const logger = require('./utils/logger');
const env = require('./config/env');

// Start PDF job processor
require('./jobs/pdfJob');

const PORT = env.PORT || 5000;

let server;

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
      logger.info(`📚 API docs: http://localhost:${PORT}/api/${env.API_VERSION}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
async function shutdown() {
  logger.info('Shutting down gracefully...');
  
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      await disconnectDatabase();
      process.exit(0);
    });
  }
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown();
});

// Start the server
startServer();
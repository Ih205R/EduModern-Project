const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const corsMiddleware = require('./middlewares/cors.middleware');
const { apiLimiter } = require('./middlewares/rateLimit.middleware');
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const logger = require('./utils/logger');
const env = require('./config/env');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const workbookRoutes = require('./routes/workbook.routes');
const orderRoutes = require('./routes/order.routes');
const pdfRoutes = require('./routes/pdf.routes');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(corsMiddleware);

// Body parsing (except for webhook route)
app.use((req, res, next) => {
  if (req.originalUrl === `/api/${env.API_VERSION}/orders/webhook`) {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
if (env.NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
} else {
  app.use(morgan('dev'));
}

// Rate limiting
app.use(`/api/${env.API_VERSION}`, apiLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/workbooks', workbookRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/pdf', pdfRoutes);

app.use(`/api/${env.API_VERSION}`, apiRouter);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
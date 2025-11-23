const express = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');

const router = express.Router();

// Validation rules
const createCheckoutValidation = [
  body('workbookIds').isArray({ min: 1 }),
  body('workbookIds.*').isUUID(),
];

// Stripe webhook (public, no auth, raw body needed)
router.post('/webhook', express.raw({ type: 'application/json' }), orderController.handleWebhook);

// Protected routes
router.post('/checkout', authenticate, validate(createCheckoutValidation), orderController.createCheckoutSession);
router.get('/', authenticate, orderController.getUserOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.get('/:orderId/download/:workbookId', authenticate, orderController.generateDownloadLink);

module.exports = router;
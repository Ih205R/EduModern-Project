const express = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

const router = express.Router();

// Validation schemas
const createCheckoutSchema = Joi.object({
  workbookId: Joi.string().uuid().required(),
});

// Stripe webhook (public, no auth)
router.post('/webhook', express.raw({ type: 'application/json' }), orderController.handleWebhook);

// Protected routes
router.post('/create-checkout', authenticate, validate(createCheckoutSchema), orderController.createCheckout);
router.get('/:id', authenticate, orderController.getOrder);
router.get('/:id/download', authenticate, orderController.getDownloadLink);

module.exports = router;
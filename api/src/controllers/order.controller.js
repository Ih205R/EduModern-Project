const orderService = require('../services/order.service');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Create checkout session
 */
const createCheckoutSession = async (req, res, next) => {
  try {
    const { workbookIds } = req.body;
    
    if (!workbookIds || !Array.isArray(workbookIds) || workbookIds.length === 0) {
      return errorResponse(res, 'Workbook IDs are required', 400);
    }

    const session = await orderService.createCheckoutSession(req.user.id, workbookIds);
    
    return successResponse(res, session, 'Checkout session created successfully');
  } catch (error) {
    logger.error('Create checkout session error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Handle Stripe webhook
 */
const handleWebhook = async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    
    await orderService.handleStripeWebhook(req.body, sig);
    
    return res.status(200).json({ received: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Get user orders
 */
const getUserOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await orderService.getUserOrders(req.user.id, parseInt(page), parseInt(limit));
    
    return paginatedResponse(
      res,
      result.orders,
      page,
      limit,
      result.total,
      'Orders retrieved successfully'
    );
  } catch (error) {
    logger.error('Get user orders error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get order by ID
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id, req.user.id);
    
    return successResponse(res, order, 'Order retrieved successfully');
  } catch (error) {
    logger.error('Get order error:', error);
    return errorResponse(res, error.message, 404);
  }
};

/**
 * Generate download link
 */
const generateDownloadLink = async (req, res, next) => {
  try {
    const { orderId, workbookId } = req.params;
    const downloadUrl = await orderService.generateDownloadLink(orderId, workbookId, req.user.id);
    
    return successResponse(res, { downloadUrl }, 'Download link generated successfully');
  } catch (error) {
    logger.error('Generate download link error:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getUserOrders,
  getOrderById,
  generateDownloadLink,
};

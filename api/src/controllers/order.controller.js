const { prisma } = require('../config/db');
const stripe = require('../config/stripe');
const { generateOrderNumber } = require('../utils/crypto');
const { sendOrderConfirmationEmail } = require('../services/email.service');
const { generateSignedDownloadUrl } = require('../services/storage.service');
const {
  successResponse,
  createdResponse,
  badRequestResponse,
  notFoundResponse,
  forbiddenResponse,
} = require('../utils/response');
const logger = require('../utils/logger');
const env = require('../config/env');

/**
 * Create checkout session
 */
async function createCheckoutSession(req, res) {
  try {
    const { workbookId } = req.body;

    // Get workbook
    const workbook = await prisma.workbook.findUnique({
      where: { id: workbookId },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    if (!workbook.isPublished) {
      return badRequestResponse(res, 'This workbook is not available for purchase');
    }

    // Check if user already purchased
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: req.user.id,
        workbookId: workbook.id,
        status: 'COMPLETED',
      },
    });

    if (existingOrder) {
      return badRequestResponse(res, 'You have already purchased this workbook');
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: req.user.id,
        workbookId: workbook.id,
        amount: workbook.price,
        currency: env.STRIPE_CURRENCY || 'eur',
        status: 'PENDING',
      },
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: env.STRIPE_CURRENCY || 'eur',
            product_data: {
              name: workbook.title,
              description: workbook.description,
              images: workbook.coverImage ? [workbook.coverImage] : [],
            },
            unit_amount: Math.round(parseFloat(workbook.price) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_URL}/checkout/cancel`,
      client_reference_id: order.id,
      customer_email: req.user.email,
      metadata: {
        orderId: order.id,
        userId: req.user.id,
        workbookId: workbook.id,
      },
    });

    // Update order with session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    logger.info(`Checkout session created: ${session.id} for order ${orderNumber}`);

    return successResponse(res, {
      sessionId: session.id,
      sessionUrl: session.url,
      orderId: order.id,
    }, 'Checkout session created');
  } catch (error) {
    logger.error('Create checkout session error:', error);
    throw error;
  }
}

/**
 * Handle Stripe webhook
 */
async function handleWebhook(req, res) {
  try {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      logger.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutComplete(session) {
  try {
    const orderId = session.metadata.orderId;

    if (!orderId) {
      logger.error('Order ID not found in session metadata');
      return;
    }

    // Update order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'COMPLETED',
        stripePaymentIntent: session.payment_intent,
      },
      include: {
        workbook: true,
        user: true,
      },
    });

    // Update workbook purchase count
    await prisma.workbook.update({
      where: { id: order.workbookId },
      data: { purchaseCount: { increment: 1 } },
    });

    // Generate download URL
    const downloadExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    let downloadUrl = null;

    if (order.workbook.pdfUrl) {
      downloadUrl = await generateSignedDownloadUrl(order.workbook.pdfUrl, 24 * 60 * 60);
    }

    // Update order with download URL
    await prisma.order.update({
      where: { id: orderId },
      data: {
        downloadUrl,
        downloadExpiry,
      },
    });

    // Send confirmation email
    await sendOrderConfirmationEmail(
      order.user.email,
      order.user.name,
      order.workbook.title,
      order.orderNumber,
      downloadUrl
    );

    logger.info(`Order completed: ${order.orderNumber}`);
  } catch (error) {
    logger.error('Handle checkout complete error:', error);
  }
}

/**
 * Handle payment succeeded
 */
async function handlePaymentSucceeded(paymentIntent) {
  try {
    logger.info(`Payment succeeded: ${paymentIntent.id}`);
    // Additional logic if needed
  } catch (error) {
    logger.error('Handle payment succeeded error:', error);
  }
}

/**
 * Handle payment failed
 */
async function handlePaymentFailed(paymentIntent) {
  try {
    logger.info(`Payment failed: ${paymentIntent.id}`);

    // Find order by payment intent
    const order = await prisma.order.findFirst({
      where: { stripePaymentIntent: paymentIntent.id },
    });

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'FAILED' },
      });
    }
  } catch (error) {
    logger.error('Handle payment failed error:', error);
  }
}

/**
 * Get order by ID
 */
async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        workbook: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            price: true,
          },
        },
      },
    });

    if (!order) {
      return notFoundResponse(res, 'Order not found');
    }

    // Check if user owns the order
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to view this order');
    }

    return successResponse(res, { order });
  } catch (error) {
    logger.error('Get order by ID error:', error);
    throw error;
  }
}

/**
 * Get order by session ID
 */
async function getOrderBySession(req, res) {
  try {
    const { sessionId } = req.params;

    const order = await prisma.order.findFirst({
      where: { stripeSessionId: sessionId },
      include: {
        workbook: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            price: true,
          },
        },
      },
    });

    if (!order) {
      return notFoundResponse(res, 'Order not found');
    }

    // Check if user owns the order
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to view this order');
    }

    return successResponse(res, { order });
  } catch (error) {
    logger.error('Get order by session error:', error);
    throw error;
  }
}

/**
 * Get download link for purchased workbook
 */
async function getDownloadLink(req, res) {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        workbook: true,
      },
    });

    if (!order) {
      return notFoundResponse(res, 'Order not found');
    }

    if (order.userId !== req.user.id) {
      return forbiddenResponse(res, 'You do not have permission to download this workbook');
    }

    if (order.status !== 'COMPLETED') {
      return badRequestResponse(res, 'Order is not completed');
    }

    if (!order.workbook.pdfUrl) {
      return badRequestResponse(res, 'PDF is not yet available');
    }

    // Check download limits
    if (order.downloadCount >= order.maxDownloads) {
      return badRequestResponse(res, 'Download limit exceeded');
    }

    // Generate signed URL
    const downloadUrl = await generateSignedDownloadUrl(order.workbook.pdfUrl, 60 * 60); // 1 hour

    // Increment download count
    await prisma.order.update({
      where: { id: orderId },
      data: { downloadCount: { increment: 1 } },
    });

    logger.info(`Download link generated for order: ${order.orderNumber}`);

    return successResponse(res, { downloadUrl });
  } catch (error) {
    logger.error('Get download link error:', error);
    throw error;
  }
}

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getOrderById,
  getOrderBySession,
  getDownloadLink,
};

const { prisma } = require('../config/db');
const stripe = require('../config/stripe');
const { getPresignedUrl } = require('../config/s3');
const env = require('../config/env');
const emailService = require('./email.service');

/**
 * Create Stripe checkout session
 */
async function createCheckoutSession(userId, workbookId) {
  const workbook = await prisma.workbook.findUnique({
    where: { id: workbookId },
  });

  if (!workbook || workbook.status !== 'published') {
    const error = new Error('Workbook not available');
    error.statusCode = 404;
    throw error;
  }

  // Create order
  const order = await prisma.order.create({
    data: {
      userId,
      workbookId,
      amountCents: workbook.priceCents,
      currency: workbook.currency,
      status: 'pending',
    },
  });

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: workbook.currency,
          product_data: {
            name: workbook.title,
            description: workbook.description,
            images: workbook.coverUrl ? [workbook.coverUrl] : [],
          },
          unit_amount: workbook.priceCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.FRONTEND_URL}/checkout/cancel`,
    client_reference_id: order.id,
    metadata: {
      orderId: order.id,
      userId,
      workbookId,
    },
  });

  // Update order with session ID
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return session;
}

/**
 * Get order by ID
 */
async function getOrderById(orderId, userId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      workbook: {
        select: {
          id: true,
          title: true,
          slug: true,
          coverUrl: true,
          description: true,
        },
      },
    },
  });

  if (!order) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }

  if (order.userId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  return order;
}

/**
 * Generate download link
 */
async function generateDownloadLink(orderId, userId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { workbook: true },
  });

  if (!order || order.userId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  if (order.status !== 'completed') {
    const error = new Error('Order not completed');
    error.statusCode = 400;
    throw error;
  }

  if (!order.workbook.s3Key) {
    const error = new Error('Workbook file not available');
    error.statusCode = 404;
    throw error;
  }

  // Check download limits
  if (order.downloadCount >= order.maxDownloads) {
    const error = new Error('Download limit exceeded');
    error.statusCode = 403;
    throw error;
  }

  // Generate presigned URL (valid for 1 hour)
  const downloadUrl = await getPresignedUrl(order.workbook.s3Key, 3600);

  // Update download count
  await prisma.order.update({
    where: { id: orderId },
    data: {
      downloadCount: { increment: 1 },
      downloadExpiry: new Date(Date.now() + 3600 * 1000),
    },
  });

  return downloadUrl;
}

/**
 * Handle Stripe webhook
 */
async function handleStripeWebhook(payload, signature) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  // Log webhook
  await prisma.webhook.create({
    data: {
      type: event.type,
      provider: 'stripe',
      eventId: event.id,
      payload: event,
    },
  });

  // Handle event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Mark webhook as processed
  await prisma.webhook.update({
    where: { eventId: event.id },
    data: { processed: true, processedAt: new Date() },
  });
}

/**
 * Handle checkout completed
 */
async function handleCheckoutCompleted(session) {
  const orderId = session.metadata.orderId;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'completed',
      stripePaymentId: session.payment_intent,
    },
    include: {
      user: true,
      workbook: true,
    },
  });

  // Send confirmation email
  await emailService.sendOrderConfirmation(
    order.user.email,
    order.user.name,
    order.workbook.title,
    order.id
  );
}

/**
 * Handle payment succeeded
 */
async function handlePaymentSucceeded(paymentIntent) {
  // Additional logic if needed
  console.log('Payment succeeded:', paymentIntent.id);
}

/**
 * Handle payment failed
 */
async function handlePaymentFailed(paymentIntent) {
  const order = await prisma.order.findFirst({
    where: { stripePaymentId: paymentIntent.id },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'failed' },
    });
  }
}

module.exports = {
  createCheckoutSession,
  getOrderById,
  generateDownloadLink,
  handleStripeWebhook,
};
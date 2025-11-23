const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../utils/logger');

// Create transporter
const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_SECURE,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

/**
 * Send verification email
 */
async function sendVerificationEmail(to, name, token) {
  const verifyUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM}>`,
      to,
      subject: 'Verify your email - EduModern',
      html: `
        <div style="font-family: 'Cormorant Garamond', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1E1E1E; font-family: 'Montserrat', sans-serif; font-weight: 800;">Welcome to EduModern!</h1>
          <p style="color: #1E1E1E; font-size: 18px;">Hi ${name || 'there'},</p>
          <p style="color: #1E1E1E; font-size: 18px;">Thank you for registering! Please verify your email address by clicking the button below:</p>
          <a href="${verifyUrl}" style="display: inline-block; background-color: #8DA7D9; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-family: 'Montserrat', sans-serif; font-weight: 500;">Verify Email</a>
          <p style="color: #1E1E1E; font-size: 16px;">Or copy this link: ${verifyUrl}</p>
          <p style="color: #1E1E1E; font-size: 16px;">This link will expire in 24 hours.</p>
          <hr style="border: none; border-top: 1px solid #D8DDE3; margin: 30px 0;" />
          <p style="color: #1E1E1E; font-size: 14px;">Best regards,<br/>The EduModern Team</p>
        </div>
      `,
    });

    logger.info(`Verification email sent to ${to}`);
  } catch (error) {
    logger.error('Failed to send verification email:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(to, name, token) {
  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM}>`,
      to,
      subject: 'Reset your password - EduModern',
      html: `
        <div style="font-family: 'Cormorant Garamond', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1E1E1E; font-family: 'Montserrat', sans-serif; font-weight: 800;">Password Reset</h1>
          <p style="color: #1E1E1E; font-size: 18px;">Hi ${name || 'there'},</p>
          <p style="color: #1E1E1E; font-size: 18px;">We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #8DA7D9; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-family: 'Montserrat', sans-serif; font-weight: 500;">Reset Password</a>
          <p style="color: #1E1E1E; font-size: 16px;">Or copy this link: ${resetUrl}</p>
          <p style="color: #1E1E1E; font-size: 16px;">This link will expire in 1 hour.</p>
          <p style="color: #1E1E1E; font-size: 16px;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #D8DDE3; margin: 30px 0;" />
          <p style="color: #1E1E1E; font-size: 14px;">Best regards,<br/>The EduModern Team</p>
        </div>
      `,
    });

    logger.info(`Password reset email sent to ${to}`);
  } catch (error) {
    logger.error('Failed to send password reset email:', error);
    throw error;
  }
}

/**
 * Send order confirmation email
 */
async function sendOrderConfirmation(to, name, workbookTitle, orderId) {
  const downloadUrl = `${env.FRONTEND_URL}/dashboard/orders/${orderId}`;

  try {
    await transporter.sendMail({
      from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM}>`,
      to,
      subject: `Your workbook is ready - ${workbookTitle}`,
      html: `
        <div style="font-family: 'Cormorant Garamond', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1E1E1E; font-family: 'Montserrat', sans-serif; font-weight: 800;">Order Confirmed! 🎉</h1>
          <p style="color: #1E1E1E; font-size: 18px;">Hi ${name || 'there'},</p>
          <p style="color: #1E1E1E; font-size: 18px;">Thank you for your purchase! Your workbook "<strong>${workbookTitle}</strong>" is ready to download.</p>
          <a href="${downloadUrl}" style="display: inline-block; background-color: #8DA7D9; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-family: 'Montserrat', sans-serif; font-weight: 500;">Download Now</a>
          <p style="color: #1E1E1E; font-size: 16px;">Order ID: ${orderId}</p>
          <p style="color: #1E1E1E; font-size: 16px;">You can download your workbook up to 5 times from your dashboard.</p>
          <hr style="border: none; border-top: 1px solid #D8DDE3; margin: 30px 0;" />
          <p style="color: #1E1E1E; font-size: 14px;">Best regards,<br/>The EduModern Team</p>
        </div>
      `,
    });

    logger.info(`Order confirmation email sent to ${to}`);
  } catch (error) {
    logger.error('Failed to send order confirmation email:', error);
    throw error;
  }
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmation,
};
const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const { generateTokenPair } = require('../utils/jwt');
const { generateToken } = require('../utils/crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./email.service');
const logger = require('../utils/logger');
const env = require('../config/env');

/**
 * Register a new user
 */
async function registerUser(userData) {
  const { email, password, name, role } = userData;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, parseInt(env.BCRYPT_ROUNDS) || 12);

  // Generate verification token
  const verificationToken = generateToken();

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role || 'STUDENT',
      verificationToken,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });

  // Send verification email
  try {
    await sendVerificationEmail(user.email, user.name, verificationToken);
  } catch (error) {
    logger.error('Failed to send verification email:', error);
    // Don't fail registration if email fails
  }

  return user;
}

/**
 * Login user
 */
async function loginUser(email, password) {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email before logging in');
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Save refresh token
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Verify email
 */
async function verifyEmail(token) {
  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
    },
  });

  return user;
}

/**
 * Request password reset
 */
async function requestPasswordReset(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Don't reveal if email exists
    return;
  }

  // Generate reset token
  const resetToken = generateToken();
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Save reset token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpires,
    },
  });

  // Send reset email
  try {
    await sendPasswordResetEmail(user.email, user.name, resetToken);
  } catch (error) {
    logger.error('Failed to send password reset email:', error);
    throw error;
  }
}

/**
 * Reset password
 */
async function resetPassword(token, newPassword) {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, parseInt(env.BCRYPT_ROUNDS) || 12);

  // Update password and clear reset token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return user;
}

/**
 * Logout user
 */
async function logoutUser(userId) {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
}

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  logoutUser,
};

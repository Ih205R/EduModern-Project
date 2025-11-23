const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const { generateTokenPair, verifyRefreshToken } = require('../utils/jwt');
const { generateToken, hashString } = require('../utils/crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/email.service');
const {
  successResponse,
  createdResponse,
  badRequestResponse,
  unauthorizedResponse,
  notFoundResponse,
} = require('../utils/response');
const logger = require('../utils/logger');
const env = require('../config/env');

/**
 * Register a new user
 */
async function register(req, res) {
  try {
    const { email, password, name, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return badRequestResponse(res, 'Email already registered');
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
    await sendVerificationEmail(user.email, user.name, verificationToken);

    logger.info(`New user registered: ${user.email}`);

    return createdResponse(res, { user }, 'Registration successful. Please check your email to verify your account.');
  } catch (error) {
    logger.error('Registration error:', error);
    throw error;
  }
}

/**
 * Login user
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return unauthorizedResponse(res, 'Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return unauthorizedResponse(res, 'Invalid email or password');
    }

    if (!user.isVerified) {
      return unauthorizedResponse(res, 'Please verify your email before logging in');
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

    logger.info(`User logged in: ${user.email}`);

    return successResponse(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
      refreshToken,
    }, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    throw error;
  }
}

/**
 * Verify email
 */
async function verifyEmail(req, res) {
  try {
    const { token } = req.body;

    // Find user with verification token
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return badRequestResponse(res, 'Invalid or expired verification token');
    }

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    logger.info(`Email verified: ${user.email}`);

    return successResponse(res, null, 'Email verified successfully');
  } catch (error) {
    logger.error('Email verification error:', error);
    throw error;
  }
}

/**
 * Request password reset
 */
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists
      return successResponse(res, null, 'If your email is registered, you will receive a password reset link');
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
    await sendPasswordResetEmail(user.email, user.name, resetToken);

    logger.info(`Password reset requested: ${user.email}`);

    return successResponse(res, null, 'If your email is registered, you will receive a password reset link');
  } catch (error) {
    logger.error('Forgot password error:', error);
    throw error;
  }
}

/**
 * Reset password
 */
async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return badRequestResponse(res, 'Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, parseInt(env.BCRYPT_ROUNDS) || 12);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    logger.info(`Password reset: ${user.email}`);

    return successResponse(res, null, 'Password reset successful');
  } catch (error) {
    logger.error('Reset password error:', error);
    throw error;
  }
}

/**
 * Refresh access token
 */
async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return badRequestResponse(res, 'Refresh token required');
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return unauthorizedResponse(res, 'Invalid refresh token');
    }

    // Generate new token pair
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Update refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return successResponse(res, tokens, 'Token refreshed successfully');
  } catch (error) {
    logger.error('Refresh token error:', error);
    return unauthorizedResponse(res, 'Invalid or expired refresh token');
  }
}

/**
 * Logout user
 */
async function logout(req, res) {
  try {
    // Clear refresh token
    await prisma.user.update({
      where: { id: req.user.id },
      data: { refreshToken: null },
    });

    logger.info(`User logged out: ${req.user.email}`);

    return successResponse(res, null, 'Logout successful');
  } catch (error) {
    logger.error('Logout error:', error);
    throw error;
  }
}

/**
 * Get current user
 */
async function getCurrentUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
      },
    });

    return successResponse(res, { user });
  } catch (error) {
    logger.error('Get current user error:', error);
    throw error;
  }
}

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  getCurrentUser,
};

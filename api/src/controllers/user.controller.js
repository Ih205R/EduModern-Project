const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const { uploadFile } = require('../services/storage.service');
const {
  successResponse,
  badRequestResponse,
  notFoundResponse,
} = require('../utils/response');
const logger = require('../utils/logger');
const env = require('../config/env');

/**
 * Get user profile
 */
async function getProfile(req, res) {
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
        updatedAt: true,
      },
    });

    if (!user) {
      return notFoundResponse(res, 'User not found');
    }

    return successResponse(res, { user });
  } catch (error) {
    logger.error('Get profile error:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
async function updateProfile(req, res) {
  try {
    const { name, email } = req.body;
    const updateData = {};

    if (name) updateData.name = name;

    // Check if email is being changed
    if (email && email !== req.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return badRequestResponse(res, 'Email already in use');
      }

      updateData.email = email;
      updateData.isVerified = false;
      // TODO: Send new verification email
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        isVerified: true,
        updatedAt: true,
      },
    });

    logger.info(`Profile updated: ${user.email}`);

    return successResponse(res, { user }, 'Profile updated successfully');
  } catch (error) {
    logger.error('Update profile error:', error);
    throw error;
  }
}

/**
 * Change password
 */
async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return badRequestResponse(res, 'Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, parseInt(env.BCRYPT_ROUNDS) || 12);

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    logger.info(`Password changed: ${user.email}`);

    return successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    logger.error('Change password error:', error);
    throw error;
  }
}

/**
 * Upload avatar
 */
async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return badRequestResponse(res, 'No file uploaded');
    }

    // Upload to Supabase Storage
    const avatarUrl = await uploadFile(req.file, `avatars/${req.user.id}`);

    // Update user
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { avatar: avatarUrl },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    });

    logger.info(`Avatar uploaded: ${user.email}`);

    return successResponse(res, { user }, 'Avatar uploaded successfully');
  } catch (error) {
    logger.error('Upload avatar error:', error);
    throw error;
  }
}

/**
 * Get user's workbooks
 */
async function getMyWorkbooks(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [workbooks, total] = await Promise.all([
      prisma.workbook.findMany({
        where: { authorId: req.user.id },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          price: true,
          isPublished: true,
          isPdfGenerated: true,
          viewCount: true,
          purchaseCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.workbook.count({
        where: { authorId: req.user.id },
      }),
    ]);

    return successResponse(res, {
      workbooks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Get my workbooks error:', error);
    throw error;
  }
}

/**
 * Get user's orders
 */
async function getMyOrders(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: req.user.id },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
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
      }),
      prisma.order.count({
        where: { userId: req.user.id },
      }),
    ]);

    return successResponse(res, {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Get my orders error:', error);
    throw error;
  }
}

/**
 * Delete account
 */
async function deleteAccount(req, res) {
  try {
    const { password } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return badRequestResponse(res, 'Password is incorrect');
    }

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    logger.info(`Account deleted: ${user.email}`);

    return successResponse(res, null, 'Account deleted successfully');
  } catch (error) {
    logger.error('Delete account error:', error);
    throw error;
  }
}

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  getMyWorkbooks,
  getMyOrders,
  deleteAccount,
};

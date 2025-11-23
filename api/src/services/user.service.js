const { prisma } = require('../config/db');

/**
 * Get user by ID
 */
async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isVerified: true,
      avatar: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
}

/**
 * Update user
 */
async function updateUser(userId, updates) {
  const allowedUpdates = ['name', 'bio', 'avatar'];
  const data = {};

  for (const key of allowedUpdates) {
    if (updates[key] !== undefined) {
      data[key] = updates[key];
    }
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      bio: true,
      updatedAt: true,
    },
  });

  return user;
}

/**
 * Delete user
 */
async function deleteUser(userId) {
  await prisma.user.delete({
    where: { id: userId },
  });
}

/**
 * Get user's orders
 */
async function getUserOrders(userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      workbook: {
        select: {
          id: true,
          title: true,
          slug: true,
          coverUrl: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await prisma.order.count({ where: { userId } });

  return {
    orders,
    total,
    page,
    limit,
  };
}

/**
 * Get user's workbooks
 */
async function getUserWorkbooks(userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const workbooks = await prisma.workbook.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await prisma.workbook.count({ where: { ownerId: userId } });

  return {
    workbooks,
    total,
    page,
    limit,
  };
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
  getUserOrders,
  getUserWorkbooks,
};
const { verifyAccessToken } = require('../utils/jwt');
const { prisma } = require('../config/db');
const { unauthorizedResponse, forbiddenResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Verify JWT token and attach user to request
 */
async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return unauthorizedResponse(res, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        avatar: true,
      },
    });

    if (!user) {
      return unauthorizedResponse(res, 'User not found');
    }

    if (!user.isVerified) {
      return unauthorizedResponse(res, 'Please verify your email');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return unauthorizedResponse(res, 'Invalid or expired token');
  }
}

/**
 * Check if user has required role
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      return forbiddenResponse(res, 'Insufficient permissions');
    }

    next();
  };
}

/**
 * Optional authentication (doesn't fail if no token)
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        avatar: true,
      },
    });

    if (user && user.isVerified) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
}

module.exports = {
  authenticate,
  authorize,
  optionalAuth,
};

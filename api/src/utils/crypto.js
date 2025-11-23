const crypto = require('crypto');

/**
 * Generate a random token
 */
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash a string using SHA256
 */
function hashString(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Generate a secure random string
 */
function generateSecureString(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length];
  }
  
  return result;
}

/**
 * Create a URL-safe slug from a string
 */
function createSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate unique order number
 */
function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `EM-${timestamp}-${random}`;
}

module.exports = {
  generateToken,
  hashString,
  generateSecureString,
  createSlug,
  generateOrderNumber,
};

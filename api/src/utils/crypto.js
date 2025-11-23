const crypto = require('crypto');
const bcrypt = require('bcrypt');
const env = require('../config/env');

/**
 * Hash password using bcrypt
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, env.BCRYPT_ROUNDS);
};

/**
 * Compare password with hash
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate random token
 */
const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate secure random string
 */
const generateRandomString = (length = 16) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

/**
 * Create hash of string
 */
const createHash = (data, algorithm = 'sha256') => {
  return crypto.createHash(algorithm).update(data).digest('hex');
};

/**
 * Generate verification token with expiry
 */
const generateVerificationToken = () => {
  return {
    token: generateToken(),
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  };
};

/**
 * Generate password reset token with expiry
 */
const generateResetToken = () => {
  return {
    token: generateToken(),
    expiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generateRandomString,
  createHash,
  generateVerificationToken,
  generateResetToken,
};

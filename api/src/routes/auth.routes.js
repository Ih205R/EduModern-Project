const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authLimiter, passwordResetLimiter } = require('../middlewares/rateLimit.middleware');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  body('role').optional().isIn(['STUDENT', 'EDUCATOR']),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

const refreshValidation = [
  body('refreshToken').notEmpty(),
];

const resetPasswordValidation = [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 }),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 }),
];

// Routes
router.post('/register', authLimiter, validate(registerValidation), authController.register);
router.post('/login', authLimiter, validate(loginValidation), authController.login);
router.post('/refresh', validate(refreshValidation), authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getCurrentUser);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', passwordResetLimiter, authController.requestPasswordReset);
router.post('/reset-password', validate(resetPasswordValidation), authController.resetPassword);
router.post('/change-password', authenticate, validate(changePasswordValidation), authController.changePassword);

module.exports = router;
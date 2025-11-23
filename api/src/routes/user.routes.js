const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);
router.delete('/me', userController.deleteAccount);
router.get('/me/orders', userController.getOrders);
router.get('/me/workbooks', userController.getWorkbooks);

module.exports = router;
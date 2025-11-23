const express = require('express');
const multer = require('multer');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { uploadLimiter } = require('../middlewares/rateLimit.middleware');

const router = express.Router();

// Configure multer for avatar uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// All routes require authentication
router.use(authenticate);

router.get('/profile', userController.getProfile);
router.get('/profile/:id', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.delete('/account', userController.deleteAccount);
router.get('/workbooks', userController.getUserWorkbooks);
router.get('/purchases', userController.getUserPurchases);
router.post('/avatar', uploadLimiter, upload.single('avatar'), userController.uploadAvatar);

module.exports = router;
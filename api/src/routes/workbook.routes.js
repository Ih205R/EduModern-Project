const express = require('express');
const multer = require('multer');
const workbookController = require('../controllers/workbook.controller');
const { authenticate, optionalAuth } = require('../middlewares/auth.middleware');
const { uploadLimiter } = require('../middlewares/rateLimit.middleware');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');

const router = express.Router();

// Configure multer for file uploads
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

// Validation rules
const createWorkbookValidation = [
  body('title').trim().isLength({ min: 3, max: 200 }),
  body('description').trim().notEmpty(),
  body('content').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('category').optional().trim(),
  body('gradeLevel').optional().trim(),
  body('subject').optional().trim(),
  body('language').optional().isLength({ min: 2, max: 2 }),
];

const updateWorkbookValidation = [
  body('title').optional().trim().isLength({ min: 3, max: 200 }),
  body('description').optional().trim(),
  body('content').optional().trim(),
  body('price').optional().isFloat({ min: 0 }),
  body('category').optional().trim(),
  body('gradeLevel').optional().trim(),
  body('subject').optional().trim(),
  body('language').optional().isLength({ min: 2, max: 2 }),
];

const generateContentValidation = [
  body('prompt').trim().isLength({ min: 10, max: 500 }),
  body('type').optional().isIn(['description', 'exercises', 'content']),
];

// Public routes
router.get('/', optionalAuth, workbookController.getAllWorkbooks);
router.get('/:slug', optionalAuth, workbookController.getWorkbookBySlug);

// Protected routes
router.post('/', authenticate, validate(createWorkbookValidation), workbookController.createWorkbook);
router.put('/:id', authenticate, validate(updateWorkbookValidation), workbookController.updateWorkbook);
router.delete('/:id', authenticate, workbookController.deleteWorkbook);
router.post('/:id/publish', authenticate, workbookController.publishWorkbook);
router.post('/:id/cover', authenticate, uploadLimiter, upload.single('cover'), workbookController.uploadCoverImage);
router.post('/generate', authenticate, validate(generateContentValidation), workbookController.generateAIContent);

module.exports = router;
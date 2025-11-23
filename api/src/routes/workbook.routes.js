const express = require('express');
const multer = require('multer');
const workbookController = require('../controllers/workbook.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

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

// Validation schemas
const createWorkbookSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  niche: Joi.string().max(100),
  description: Joi.string().max(2000),
  priceCents: Joi.number().integer().min(0).required(),
  currency: Joi.string().length(3).default('eur'),
});

const updateWorkbookSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  niche: Joi.string().max(100),
  description: Joi.string().max(2000),
  priceCents: Joi.number().integer().min(0),
  pages: Joi.object(),
});

const generateContentSchema = Joi.object({
  prompt: Joi.string().min(10).max(500).required(),
  pages: Joi.number().integer().min(1).max(50).default(10),
});

// Public routes
router.get('/', workbookController.list);
router.get('/:id', workbookController.getById);
router.get('/slug/:slug', workbookController.getBySlug);

// Protected routes
router.post('/', authenticate, validate(createWorkbookSchema), workbookController.create);
router.patch('/:id', authenticate, validate(updateWorkbookSchema), workbookController.update);
router.delete('/:id', authenticate, workbookController.remove);
router.post('/:id/generate-content', authenticate, validate(generateContentSchema), workbookController.generateContent);
router.post('/:id/upload-cover', authenticate, upload.single('cover'), workbookController.uploadCover);
router.post('/:id/publish', authenticate, workbookController.publish);
router.post('/:id/unpublish', authenticate, workbookController.unpublish);

module.exports = router;
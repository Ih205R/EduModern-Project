const express = require('express');
const pdfController = require('../controllers/pdf.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const Joi = require('joi');

const router = express.Router();

// Validation schema
const generateSchema = Joi.object({
  workbookId: Joi.string().uuid().required(),
});

// All routes require authentication
router.use(authenticate);

router.post('/generate', validate(generateSchema), pdfController.generate);
router.get('/status/:jobId', pdfController.getStatus);

module.exports = router;
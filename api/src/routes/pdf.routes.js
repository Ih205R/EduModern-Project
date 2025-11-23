const express = require('express');
const pdfController = require('../controllers/pdf.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/:workbookId', pdfController.generatePDF);
router.get('/status/:jobId', pdfController.getPDFStatus);

module.exports = router;
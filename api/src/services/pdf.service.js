const Queue = require('bull');
const env = require('../config/env');
const { prisma } = require('../config/db');

// Create PDF generation queue
const pdfQueue = new Queue('pdf-generation', env.REDIS_URL);

/**
 * Queue PDF generation job
 */
async function queuePdfGeneration(workbookId, userId) {
  const workbook = await prisma.workbook.findUnique({
    where: { id: workbookId },
  });

  if (!workbook || workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  if (!workbook.pages) {
    const error = new Error('Workbook has no content');
    error.statusCode = 400;
    throw error;
  }

  const job = await pdfQueue.add({
    workbookId,
    userId,
  });

  return job;
}

/**
 * Get job status
 */
async function getJobStatus(jobId) {
  const job = await pdfQueue.getJob(jobId);

  if (!job) {
    const error = new Error('Job not found');
    error.statusCode = 404;
    throw error;
  }

  const state = await job.getState();
  const progress = job.progress();

  return {
    id: job.id,
    state,
    progress,
    data: job.data,
    result: job.returnvalue,
  };
}

module.exports = {
  queuePdfGeneration,
  getJobStatus,
  pdfQueue,
};
const { uploadToStorage, deleteFromStorage, getSignedUrl } = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const BUCKET_WORKBOOKS = 'workbooks';
const BUCKET_COVERS = 'covers';

/**
 * Upload workbook PDF to Supabase Storage
 */
async function uploadWorkbookPDF(workbookId, buffer, filename) {
  const path = `${workbookId}/${uuidv4()}-${filename}`;
  const url = await uploadToStorage(BUCKET_WORKBOOKS, path, buffer, 'application/pdf');
  return { url, path };
}

/**
 * Upload cover image to Supabase Storage
 */
async function uploadCoverImage(workbookId, buffer, mimetype) {
  const ext = mimetype.split('/')[1];
  const path = `${workbookId}/${uuidv4()}.${ext}`;
  const url = await uploadToStorage(BUCKET_COVERS, path, buffer, mimetype);
  return { url, path };
}

/**
 * Delete workbook PDF
 */
async function deleteWorkbookPDF(path) {
  await deleteFromStorage(BUCKET_WORKBOOKS, path);
}

/**
 * Delete cover image
 */
async function deleteCoverImage(path) {
  await deleteFromStorage(BUCKET_COVERS, path);
}

/**
 * Generate download link for workbook (signed URL, expires in 1 hour)
 */
async function generateDownloadLink(path) {
  return await getSignedUrl(BUCKET_WORKBOOKS, path, 3600);
}

module.exports = {
  uploadWorkbookPDF,
  uploadCoverImage,
  deleteWorkbookPDF,
  deleteCoverImage,
  generateDownloadLink,
};
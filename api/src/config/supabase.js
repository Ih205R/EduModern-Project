const { createClient } = require('@supabase/supabase-js');
const env = require('./env');
const logger = require('../utils/logger');

// Create Supabase client
const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

/**
 * Upload file to Supabase Storage
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in bucket
 * @param {Buffer} file - File buffer
 * @param {string} contentType - MIME type
 */
async function uploadToStorage(bucket, path, file, contentType) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert: false,
      });

    if (error) {
      logger.error('Supabase upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    logger.info(`File uploaded to Supabase: ${path}`);
    return urlData.publicUrl;
  } catch (error) {
    logger.error('Failed to upload to Supabase:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Delete file from Supabase Storage
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in bucket
 */
async function deleteFromStorage(bucket, path) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      logger.error('Supabase delete error:', error);
      throw error;
    }

    logger.info(`File deleted from Supabase: ${path}`);
  } catch (error) {
    logger.error('Failed to delete from Supabase:', error);
    throw new Error('Failed to delete file');
  }
}

/**
 * Generate signed URL for private files
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in bucket
 * @param {number} expiresIn - Expiration in seconds (default 1 hour)
 */
async function getSignedUrl(bucket, path, expiresIn = 3600) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      logger.error('Supabase signed URL error:', error);
      throw error;
    }

    return data.signedUrl;
  } catch (error) {
    logger.error('Failed to generate signed URL:', error);
    throw new Error('Failed to generate download URL');
  }
}

module.exports = {
  supabase,
  uploadToStorage,
  deleteFromStorage,
  getSignedUrl,
};
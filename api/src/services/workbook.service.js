const { prisma } = require('../config/db');
const { uploadFile, deleteFile } = require('../config/s3');
const openai = require('../config/openai');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * List workbooks with filters
 */
async function listWorkbooks(page = 1, limit = 12, filters = {}) {
  const skip = (page - 1) * limit;
  const where = { status: 'published' };

  // Apply filters
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.niche) {
    where.niche = filters.niche;
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.priceCents = {};
    if (filters.minPrice !== undefined) where.priceCents.gte = filters.minPrice * 100;
    if (filters.maxPrice !== undefined) where.priceCents.lte = filters.maxPrice * 100;
  }

  // Sorting
  const orderBy = {};
  switch (filters.sortBy) {
    case 'price_asc':
      orderBy.priceCents = 'asc';
      break;
    case 'price_desc':
      orderBy.priceCents = 'desc';
      break;
    case 'popular':
      orderBy.viewCount = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
  }

  const workbooks = await prisma.workbook.findMany({
    where,
    orderBy,
    skip,
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      niche: true,
      description: true,
      coverUrl: true,
      priceCents: true,
      currency: true,
      viewCount: true,
      createdAt: true,
      owner: {
        select: {
          name: true,
        },
      },
    },
  });

  const total = await prisma.workbook.count({ where });

  return { workbooks, total };
}

/**
 * Get workbook by ID
 */
async function getWorkbookById(id) {
  const workbook = await prisma.workbook.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  if (!workbook) {
    const error = new Error('Workbook not found');
    error.statusCode = 404;
    throw error;
  }

  // Increment view count
  await prisma.workbook.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  return workbook;
}

/**
 * Get workbook by slug
 */
async function getWorkbookBySlug(slug) {
  const workbook = await prisma.workbook.findUnique({
    where: { slug },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  if (!workbook) {
    const error = new Error('Workbook not found');
    error.statusCode = 404;
    throw error;
  }

  // Increment view count
  await prisma.workbook.update({
    where: { id: workbook.id },
    data: { viewCount: { increment: 1 } },
  });

  return workbook;
}

/**
 * Create workbook
 */
async function createWorkbook(data) {
  const slug = generateSlug(data.title);

  // Check if slug exists
  const existing = await prisma.workbook.findUnique({ where: { slug } });
  if (existing) {
    data.slug = `${slug}-${uuidv4().substring(0, 8)}`;
  } else {
    data.slug = slug;
  }

  const workbook = await prisma.workbook.create({
    data: {
      title: data.title,
      slug: data.slug,
      niche: data.niche,
      description: data.description,
      priceCents: data.priceCents,
      currency: data.currency || 'eur',
      ownerId: data.ownerId,
    },
  });

  return workbook;
}

/**
 * Update workbook
 */
async function updateWorkbook(id, userId, updates) {
  const workbook = await prisma.workbook.findUnique({ where: { id } });

  if (!workbook) {
    const error = new Error('Workbook not found');
    error.statusCode = 404;
    throw error;
  }

  if (workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  const updated = await prisma.workbook.update({
    where: { id },
    data: updates,
  });

  return updated;
}

/**
 * Delete workbook
 */
async function deleteWorkbook(id, userId) {
  const workbook = await prisma.workbook.findUnique({ where: { id } });

  if (!workbook) {
    const error = new Error('Workbook not found');
    error.statusCode = 404;
    throw error;
  }

  if (workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  // Delete S3 files
  if (workbook.s3Key) await deleteFile(workbook.s3Key);
  if (workbook.coverS3Key) await deleteFile(workbook.coverS3Key);

  await prisma.workbook.delete({ where: { id } });
}

/**
 * Generate workbook content with OpenAI
 */
async function generateContent(id, userId, prompt, pages = 10) {
  const workbook = await prisma.workbook.findUnique({ where: { id } });

  if (!workbook || workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  const systemPrompt = `You are an expert educational content creator. Generate ${pages} pages of workbook content based on the user's request. Each page should include educational exercises, questions, or activities. Return the content as a JSON array of pages.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
  });

  const content = JSON.parse(completion.choices[0].message.content);

  // Save to workbook
  await prisma.workbook.update({
    where: { id },
    data: { pages: content },
  });

  return content;
}

/**
 * Upload cover image
 */
async function uploadCover(id, userId, file) {
  const workbook = await prisma.workbook.findUnique({ where: { id } });

  if (!workbook || workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  // Delete old cover if exists
  if (workbook.coverS3Key) {
    await deleteFile(workbook.coverS3Key);
  }

  // Upload new cover
  const key = `covers/${id}/${uuidv4()}-${file.originalname}`;
  const url = await uploadFile(key, file.buffer, file.mimetype);

  // Update workbook
  const updated = await prisma.workbook.update({
    where: { id },
    data: {
      coverUrl: url,
      coverS3Key: key,
    },
  });

  return updated;
}

/**
 * Publish workbook
 */
async function publishWorkbook(id, userId) {
  const workbook = await prisma.workbook.findUnique({ where: { id } });

  if (!workbook || workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  // Validate workbook is ready to publish
  if (!workbook.title || !workbook.priceCents || !workbook.pages) {
    const error = new Error('Workbook must have title, price, and content before publishing');
    error.statusCode = 400;
    throw error;
  }

  const updated = await prisma.workbook.update({
    where: { id },
    data: {
      status: 'published',
      publishedAt: new Date(),
    },
  });

  return updated;
}

/**
 * Unpublish workbook
 */
async function unpublishWorkbook(id, userId) {
  const workbook = await prisma.workbook.findUnique({ where: { id } });

  if (!workbook || workbook.ownerId !== userId) {
    const error = new Error('Unauthorized');
    error.statusCode = 403;
    throw error;
  }

  const updated = await prisma.workbook.update({
    where: { id },
    data: {
      status: 'draft',
      publishedAt: null,
    },
  });

  return updated;
}

module.exports = {
  listWorkbooks,
  getWorkbookById,
  getWorkbookBySlug,
  createWorkbook,
  updateWorkbook,
  deleteWorkbook,
  generateContent,
  uploadCover,
  publishWorkbook,
  unpublishWorkbook,
};
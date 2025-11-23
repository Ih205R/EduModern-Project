const { prisma } = require('../config/db');
const { uploadFile } = require('../services/storage.service');
const { createSlug } = require('../utils/crypto');
const { generateWorkbookContent, generateTitleSuggestions } = require('../config/openai');
const { queuePdfGeneration } = require('../jobs/pdfJob');
const {
  successResponse,
  createdResponse,
  badRequestResponse,
  notFoundResponse,
  forbiddenResponse,
} = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Create a new workbook
 */
async function createWorkbook(req, res) {
  try {
    const { title, description, content, price, category, grade, subject } = req.body;

    // Generate slug
    let slug = createSlug(title);
    
    // Ensure slug is unique
    const existingWorkbook = await prisma.workbook.findUnique({
      where: { slug },
    });

    if (existingWorkbook) {
      slug = `${slug}-${Date.now()}`;
    }

    // Create workbook
    const workbook = await prisma.workbook.create({
      data: {
        title,
        slug,
        description,
        content,
        price: parseFloat(price),
        category,
        grade,
        subject,
        authorId: req.user.id,
      },
    });

    logger.info(`Workbook created: ${workbook.title} by ${req.user.email}`);

    return createdResponse(res, { workbook }, 'Workbook created successfully');
  } catch (error) {
    logger.error('Create workbook error:', error);
    throw error;
  }
}

/**
 * Get all workbooks (public)
 */
async function getWorkbooks(req, res) {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      grade, 
      subject, 
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const skip = (page - 1) * limit;
    const where = { isPublished: true };

    // Apply filters
    if (category) where.category = category;
    if (grade) where.grade = grade;
    if (subject) where.subject = subject;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Determine sort order
    const orderBy = {};
    orderBy[sortBy] = order;

    const [workbooks, total] = await Promise.all([
      prisma.workbook.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          price: true,
          category: true,
          grade: true,
          subject: true,
          viewCount: true,
          purchaseCount: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.workbook.count({ where }),
    ]);

    return successResponse(res, {
      workbooks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Get workbooks error:', error);
    throw error;
  }
}

/**
 * Get single workbook by slug
 */
async function getWorkbookBySlug(req, res) {
  try {
    const { slug } = req.params;

    const workbook = await prisma.workbook.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    // Check if workbook is published or user is the author
    if (!workbook.isPublished && workbook.authorId !== req.user?.id) {
      return forbiddenResponse(res, 'This workbook is not published');
    }

    // Increment view count
    await prisma.workbook.update({
      where: { id: workbook.id },
      data: { viewCount: { increment: 1 } },
    });

    // Check if user has purchased this workbook
    let hasPurchased = false;
    if (req.user) {
      const order = await prisma.order.findFirst({
        where: {
          userId: req.user.id,
          workbookId: workbook.id,
          status: 'COMPLETED',
        },
      });
      hasPurchased = !!order;
    }

    return successResponse(res, { 
      workbook: {
        ...workbook,
        hasPurchased,
      }
    });
  } catch (error) {
    logger.error('Get workbook by slug error:', error);
    throw error;
  }
}

/**
 * Get workbook by ID
 */
async function getWorkbookById(req, res) {
  try {
    const { id } = req.params;

    const workbook = await prisma.workbook.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    // Check if user is the author
    if (workbook.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to access this workbook');
    }

    return successResponse(res, { workbook });
  } catch (error) {
    logger.error('Get workbook by ID error:', error);
    throw error;
  }
}

/**
 * Update workbook
 */
async function updateWorkbook(req, res) {
  try {
    const { id } = req.params;
    const { title, description, content, price, category, grade, subject, isPublished } = req.body;

    // Check if workbook exists and user is the author
    const existingWorkbook = await prisma.workbook.findUnique({
      where: { id },
    });

    if (!existingWorkbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    if (existingWorkbook.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to update this workbook');
    }

    const updateData = {};
    if (title) {
      updateData.title = title;
      updateData.slug = createSlug(title);
    }
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (category) updateData.category = category;
    if (grade !== undefined) updateData.grade = grade;
    if (subject !== undefined) updateData.subject = subject;
    if (isPublished !== undefined) updateData.isPublished = isPublished;

    const workbook = await prisma.workbook.update({
      where: { id },
      data: updateData,
    });

    // Queue PDF generation if published and content changed
    if (isPublished && content && !existingWorkbook.isPdfGenerated) {
      await queuePdfGeneration(workbook.id);
    }

    logger.info(`Workbook updated: ${workbook.title}`);

    return successResponse(res, { workbook }, 'Workbook updated successfully');
  } catch (error) {
    logger.error('Update workbook error:', error);
    throw error;
  }
}

/**
 * Delete workbook
 */
async function deleteWorkbook(req, res) {
  try {
    const { id } = req.params;

    // Check if workbook exists and user is the author
    const workbook = await prisma.workbook.findUnique({
      where: { id },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    if (workbook.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to delete this workbook');
    }

    await prisma.workbook.delete({
      where: { id },
    });

    logger.info(`Workbook deleted: ${workbook.title}`);

    return successResponse(res, null, 'Workbook deleted successfully');
  } catch (error) {
    logger.error('Delete workbook error:', error);
    throw error;
  }
}

/**
 * Upload cover image
 */
async function uploadCoverImage(req, res) {
  try {
    const { id } = req.params;

    if (!req.file) {
      return badRequestResponse(res, 'No file uploaded');
    }

    // Check if workbook exists and user is the author
    const workbook = await prisma.workbook.findUnique({
      where: { id },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    if (workbook.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to update this workbook');
    }

    // Upload to Supabase Storage
    const coverImageUrl = await uploadFile(req.file, `workbooks/${id}`);

    // Update workbook
    const updatedWorkbook = await prisma.workbook.update({
      where: { id },
      data: { coverImage: coverImageUrl },
    });

    logger.info(`Cover image uploaded for workbook: ${updatedWorkbook.title}`);

    return successResponse(res, { workbook: updatedWorkbook }, 'Cover image uploaded successfully');
  } catch (error) {
    logger.error('Upload cover image error:', error);
    throw error;
  }
}

/**
 * Generate AI content for workbook
 */
async function generateContent(req, res) {
  try {
    const { prompt, options } = req.body;

    const content = await generateWorkbookContent(prompt, options);

    return successResponse(res, { content }, 'Content generated successfully');
  } catch (error) {
    logger.error('Generate content error:', error);
    if (error.message === 'OpenAI is not configured') {
      return badRequestResponse(res, 'AI content generation is not available');
    }
    throw error;
  }
}

/**
 * Generate title suggestions
 */
async function generateTitles(req, res) {
  try {
    const { description } = req.body;

    const titles = await generateTitleSuggestions(description);

    return successResponse(res, { titles }, 'Titles generated successfully');
  } catch (error) {
    logger.error('Generate titles error:', error);
    if (error.message === 'OpenAI is not configured') {
      return badRequestResponse(res, 'AI title generation is not available');
    }
    throw error;
  }
}

module.exports = {
  createWorkbook,
  getWorkbooks,
  getWorkbookBySlug,
  getWorkbookById,
  updateWorkbook,
  deleteWorkbook,
  uploadCoverImage,
  generateContent,
  generateTitles,
};

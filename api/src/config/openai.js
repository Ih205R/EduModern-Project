const OpenAI = require('openai');
const env = require('./env');
const logger = require('../utils/logger');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

logger.info('✅ OpenAI initialized successfully');

/**
 * Generate workbook content using OpenAI
 */
const generateWorkbookContent = async (prompt, options = {}) => {
  try {
    const completion = await openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational content creator. Generate high-quality, engaging educational workbook content that is clear, structured, and pedagogically sound.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: options.maxTokens || 2000,
      temperature: options.temperature || 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    logger.error('OpenAI generation error:', error);
    throw new Error('Failed to generate content');
  }
};

/**
 * Generate workbook description
 */
const generateDescription = async (title, subject, gradeLevel) => {
  const prompt = `Generate a compelling, professional description for an educational workbook titled "${title}" for ${gradeLevel} students in ${subject}. The description should be 2-3 paragraphs, highlighting key learning objectives and benefits.`;
  
  return await generateWorkbookContent(prompt, { maxTokens: 300 });
};

/**
 * Generate workbook exercises
 */
const generateExercises = async (topic, count = 5) => {
  const prompt = `Generate ${count} diverse educational exercises for the topic: "${topic}". Include a mix of multiple choice, short answer, and problem-solving questions. Format each exercise clearly with the question and any necessary context.`;
  
  return await generateWorkbookContent(prompt, { maxTokens: 1500 });
};

module.exports = {
  openai,
  generateWorkbookContent,
  generateDescription,
  generateExercises,
};

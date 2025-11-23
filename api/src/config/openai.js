const OpenAI = require('openai');
const env = require('./env');
const logger = require('../utils/logger');

let openai = null;

if (env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
  logger.info('✅ OpenAI client initialized');
} else {
  logger.warn('⚠️  OpenAI API key not provided - AI features will be disabled');
}

/**
 * Generate workbook content using OpenAI
 */
async function generateWorkbookContent(prompt, options = {}) {
  if (!openai) {
    throw new Error('OpenAI is not configured');
  }

  try {
    const response = await openai.chat.completions.create({
      model: env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational content creator. Generate high-quality, pedagogically sound workbook content.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 2000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error('OpenAI API error:', error);
    throw error;
  }
}

/**
 * Generate workbook title suggestions
 */
async function generateTitleSuggestions(description, count = 5) {
  const prompt = `Generate ${count} creative and engaging titles for an educational workbook with the following description:\n\n${description}\n\nProvide only the titles, one per line.`;
  const content = await generateWorkbookContent(prompt, { maxTokens: 200 });
  return content.split('\n').filter(line => line.trim());
}

module.exports = {
  openai,
  generateWorkbookContent,
  generateTitleSuggestions,
};

import { CohereClientV2 } from 'cohere-ai'
import { Question } from '../types'

const cohere = new CohereClientV2({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY,
});

export async function generateQuestionAndAnswer(text: string, question: Question[]) {
  try {
 
  const existingQuestions = question.map((q) => q.question).join('\n');

  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: `אנא צור שאלה ותשובה על פי הטקסט הבא בעברית:\n${text}\nשאלה חדשה שלא תופיע ברשימת השאלות הבאות:\n${existingQuestions}\nשאלה:`,
      },
    ],
  });

  const contentArray = response.message?.content;

  if (!contentArray || contentArray.length === 0) {
    throw new Error('No content returned from Cohere');
  }

  const fullContent = contentArray
    .map((item) => (item.type === 'text' ? item.text : ''))
    .join('')
    .trim();

  const questionPart = fullContent.split('?')[0]?.trim() + '?';

  const answerPart = fullContent.split('?')[1]?.trim() || '';

  return {
    question: questionPart,
    answer: answerPart
  };
} catch (error) {
  console.error('Error generating question and answer:', error);
  throw error;
}
  }

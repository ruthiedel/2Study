import { CohereClientV2 }  from 'cohere-ai'

const cohere = new CohereClientV2({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY, 
});

export async function generateQuestionAndAnswer(text:string)
{
    try {
      const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: `אנא צור שאלה ותשובה על פי הטקסט הבא בעברית:\n${text}\nשאלה:`,
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
  
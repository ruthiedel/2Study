import { CohereClientV2 }  from 'cohere-ai'

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY, 
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
  
      console.log('Raw Response:', response);
  
      const contentArray = response.message?.content;
  
      if (!contentArray || contentArray.length === 0) {
        throw new Error('No content returned from Cohere');
      }
  
      const fullContent = contentArray
        .map((item) => (item.type === 'text' ? item.text : ''))
        .join('')
        .trim();
  
      console.log('Full Content:', fullContent);
  
      const questionPart = fullContent.split('תשובה :')[0].trim(); 
      const answerPart = fullContent.split('תשובה :')[1]?.trim() || ''; 
      return { question: questionPart, answer: answerPart };
    } catch (error) {
      console.error('Error generating question and answer:', error);
      throw error;
    }
  }
  
  // דוגמה לשימוש
  // const hebrewText = `
  // מצות עשה ללמוד תורה וללמדה. שנאמר (דברים ו, ז): "ושננתם לבניך" - מצוה שיהיו דברי תורה מחודדים בפיו של אדם, שלא יגמגם בהם. בין עני ובין עשיר, בחור וזקן, ובעל יסורים, ועני המתפרנס מן הצדקה ומחזיר על הפתחים חייב לקבוע לו זמן לתורה ביום ובלילה, שנאמר (יהושע א, ח): "והגית בו יומם ולילה". וחייב ללמוד עד יום מותו, שנאמר (דברים ד, ט): "פן יסורו מלבבך כל ימי חייך". ומצוה על האב ללמוד עם בנו, והוא קודם לאחרים. גם מחוייב ללמוד עם בן בנו, שנאמר (שם): "והודעתם לבניך ולבני בניך". ומשיתחיל התינוק לדבר, אביו מלמדו תורה, ולומר עמו פסוק: "תורה צוה לנו משה" (דברים33, ד), וחייב לשכור לו מלמד. ואשה פטורה מתלמוד תורה; מכל מקום, ראוי לה שתשתדל שלא יהיו בניה עמי הארץ.
  // `;
  
  // generateQuestionAndAnswer(hebrewText)
  //   .then((result) => {
  //     console.log(`שאלה: ${result.question}`);
  //     console.log(`תשובה: ${result.answer}`);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
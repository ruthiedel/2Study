import { MongoClient, ObjectId } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';
import { Rating } from '@mui/material';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
  if (!client) {
    const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
    if (!dbConnectionString) {
      throw new Error('Database connection string is not defined');
    }
    client = new MongoClient(dbConnectionString);
    clientPromise = client.connect();
  }
  return clientPromise;
}

// שליפת כל הספרים
export async function fetchAllBooks(client: MongoClient, collection: string) {
  const db = client.db('Books');
  const books = await db.collection(collection).aggregate([
    {
      $project: {
        name: 1,
        author: 1, 
        category: 1, 
        chapters_num: 1, 
        paragraphs_num: 1, 
        coverImage: 1, 
        rating: 1,
        number_raters: 1,
        learningGroups:1,
        firstParagraphText: {
          $arrayElemAt: [
            { $ifNull: [{ $arrayElemAt: ["$chapters.paragraphs", 0] }, null] },
            0
          ] 
        },
        paragraphsCountPerChapter: {
          $map: {
            input: "$chapters", 
            as: "chapter",
            in: { $size: "$$chapter.paragraphs" } 
          }
        }
      }
    },
    {
      $project: {
        name: 1,
        author: 1,
        category: 1,
        chapters_num: 1,
        paragraphs_num: 1,
        coverImage: 1,
        rating: 1,
        number_raters: 1,
        firstParagraphText: "$firstParagraphText.text", 
        paragraphsCountPerChapter: 1 ,
        learningGroups:1
      }
    }
  ]).toArray();

  if (!books || books.length === 0) {
    console.log("No books found.");
    return [];
  }
  const picturesPath = path.join(process.cwd(), 'public', 'pictures');

  const booksWithImages = await Promise.all(
    books.map(async (book) => {
      const imagePath = path.join(picturesPath, `${book.coverImage}`);
      let coverImageBlob = '';

      try {
        const imageBuffer = await fs.readFile(imagePath);
        coverImageBlob = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
      } catch (error) {
        console.error(`Image not found for book: ${book.coverImage}`);
        coverImageBlob = ''; 
      }
      return {
        ...book, 
        coverImage: coverImageBlob, 
      };
    })
  );
  return booksWithImages;
}

export async function fetchBookById(client: MongoClient, collection: string, bookId: string) {
  const db = client.db('Books');

  const objectId = new ObjectId(bookId);

  const book = await db.collection(collection).findOne({ _id: objectId });

  if (!book) {
    throw new Error('Book not found');
  }

  return {
    ...book,
  };
}

export async function updateBook(client: MongoClient, collection: string, bookId: string, updatedData: Partial<Record<string, any>> ) {
  const db = client.db('Books');

  const objectId = new ObjectId(bookId);

  // עדכון הספר, גם אם לא השתנה
  const result = await db.collection(collection).updateOne(
    { _id: objectId },
    { $set: updatedData }
  );

  if (result.matchedCount === 0) {
    throw new Error('Book not found');
  }

  return {
    message: 'Book updated successfully',
    updatedFields: updatedData,
  };
}

export async function fetchPartialBooks(client: MongoClient, collection: string) {
  const db = client.db('Books');

  const books = await db
    .collection(collection)
    .find({}, { projection: { chapters: 0 } })
    .toArray();

  return books;
}
// export async function updateBookQuestion(
//   client: MongoClient,
//   collection: string,
//   bookId: string,
//   chapterId: number,
//   paragraphId: number, 
//   question: { question: string; answer: string }
// ) {
//   const db = client.db("Books");
//   const objectId = new ObjectId(bookId);
//   console.log('bookId:', objectId);
//   console.log('chapterId:', chapterId);
//   console.log('paragraphId:', paragraphId);

//   const result = await db.collection(collection).updateOne(
//     {
//       _id: objectId,
//       "chapters.chapterId": chapterId, // המרת ה-chapterId למספר
//       "chapters.paragraphs.paragraphId":paragraphId, // המרת ה-paragraphId למספר
//     },
//     {
//       $set: {
//         "chapters.$.paragraphs.$[paragraph].questions": question,
//       },
//     },
//     {
//       arrayFilters: [{ "paragraph.paragraphId": paragraphId }],
//     }
//   );

//   if (result.matchedCount === 0) {
//     throw new Error("Book, chapter, or paragraph not found");
//   }

//   return {
//     message: "Question added successfully",
//     bookId,
//     chapterId,
//     paragraphId,
//     question,
//   };
// }

export async function updateBookQuestion(
  client: MongoClient,
  collection: string,
  bookId: string,
  chapterId: number,
  paragraphId: number, 
  question: { question: string; answer: string }
) {
  const db = client.db("Books");
  const objectId = new ObjectId(bookId);
  console.log('bookId:', objectId);
  console.log('chapterId:', chapterId);
  console.log('paragraphId:', paragraphId);
  console.log('New question:', question);

  // תחילה, שלוף את הספר הנוכחי
  const book = await db.collection(collection).findOne({
    _id: objectId,
    "chapters.chapterId": chapterId,
    "chapters.paragraphs.paragraphId": paragraphId,
  });

  if (!book) {
    throw new Error("Book, chapter, or paragraph not found");
  }

  // שלוף את הפסקה הספציפית
  const paragraph = book.chapters
    .find((chapter: any) => chapter.chapterId === chapterId)
    ?.paragraphs.find((p: any) => p.paragraphId === paragraphId);

  if (!paragraph) {
    throw new Error("Paragraph not found");
  }

  // ודא שהשאלות קיימות כערך מערך
  const updatedQuestions = paragraph.questions 
    ? [...paragraph.questions, question] // אם השאלות קיימות, הוסף את השאלה
    : [question]; // אם לא, יצור מערך חדש עם השאלה

  // עדכון השאלות עם $push או $set
  const result = await db.collection(collection).updateOne(
    {
      _id: objectId,
      "chapters.chapterId": chapterId,
      "chapters.paragraphs.paragraphId": paragraphId,
    },
    {
      $set: {
        "chapters.$.paragraphs.$[paragraph].questions": updatedQuestions, // עדכון המערך החדש
      },
    },
    {
      arrayFilters: [{ "paragraph.paragraphId": paragraphId }],
    }
  );

  if (result.matchedCount === 0) {
    throw new Error("Book, chapter, or paragraph not found");
  }

  return {
    message: "Question added successfully",
    bookId,
    chapterId,
    paragraphId,
    question,
  };
}
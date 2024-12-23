import { MongoClient, ObjectId } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';

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

  await clientPromise;
  return client;
}



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
        learningGroups: 1,
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
        paragraphsCountPerChapter: 1,
        learningGroups: 1
      }
    }
  ]).toArray();

  if (!books || books.length === 0) {
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
        coverImage: coverImageBlob
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

  const book = await db.collection(collection).findOne({
    _id: objectId,
    "chapters.chapterId": chapterId,
    "chapters.paragraphs.paragraphId": paragraphId,
  });

  if (!book) {
    throw new Error("Book, chapter, or paragraph not found");
  }

  const paragraph = book.chapters
    .find((chapter: any) => chapter.chapterId === chapterId)
    ?.paragraphs.find((p: any) => p.paragraphId === paragraphId);

  if (!paragraph) {
    throw new Error("Paragraph not found");
  }

  const updatedQuestions = paragraph.questions 
    ? [...paragraph.questions, question]
    : [question]; 

  const result = await db.collection(collection).updateOne(
    {
      _id: objectId,
      "chapters.chapterId": chapterId,
      "chapters.paragraphs.paragraphId": paragraphId,
    },
    {
      $set: {
        "chapters.$.paragraphs.$[paragraph].questions": updatedQuestions, 
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

export async function getUniqueCategoryStrings(client: MongoClient, collection: string) {
  const db = client.db('Books');

  const distinctCategories = await db.collection(collection).aggregate([
    {
      $unwind: '$category'
    },
    {
      $group: {
        _id: {
          type: '$category.type',
          subject: '$category.subject'
        },
        count: { $sum: 1 } 
      }
    },
    {
      $project: {
        type: '$_id.type',
        subject: '$_id.subject',
      }
    }
  ]).toArray();

  const uniqueCategoryStrings = distinctCategories.map(category => `${category.type} - ${category.subject}`);

  return uniqueCategoryStrings;
}

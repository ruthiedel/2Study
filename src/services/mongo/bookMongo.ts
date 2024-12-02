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
        firstParagraphText: "$firstParagraphText.text", 
        paragraphsCountPerChapter: 1 
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

// שליפת ספר לפי ID
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

// שליפת חלק מהספרים
export async function fetchPartialBooks(client: MongoClient, collection: string) {
  const db = client.db('Books');

  const books = await db
    .collection(collection)
    .find({}, { projection: { chapters: 0 } })
    .toArray();

  return books;
}

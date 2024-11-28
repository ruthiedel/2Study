import { MongoClient, ObjectId } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


// פונקציה לעדכון דירוג של ספר
export const updateBookRating = async (bookId: string, averageRating: number) => {
  const client = await connectDatabase(); // מתחברים לבסיס הנתונים
  const db = client.db("Books");
  const collection = db.collection("books");

  // עדכון הדירוג של הספר
  const result = await collection.updateOne(
    { _id: new ObjectId(bookId) }, // מזהה הספר
    { $set: { rating: averageRating } } // עדכון דירוג הספר
  );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to update book rating");
  }

  return result;
};

// חיבור לבסיס הנתונים
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

  const books = await db
    .collection(collection)
    .find({}, { projection: { chapters: 0 } }) // הסרת פרטי הפרקים
    .toArray();

  const picturesPath = path.join(process.cwd(), 'public', 'pictures');

  const booksWithImages = await Promise.all(
    books.map(async (book) => {
      const imagePath = path.join(picturesPath, `${book.coverImage}`);
      let coverImageBlob = '';

      try {
        const imageBuffer = await fs.readFile(imagePath);
        coverImageBlob = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
      } catch (error) {
        console.error(`Image not found for book: ${book.book_name}`);
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

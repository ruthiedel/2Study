import { MongoClient } from 'mongodb';
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

export async function getAllBooks(client: MongoClient, collection: string) {
  const db = client.db('Books');

  const books = await db
    .collection(collection)
    .find({}, { projection: { chapters: 0 } }) 
    .toArray();

  const picturesPath = path.join(process.cwd(), 'src', 'pictures');

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







export async function getPartOgAllBooks(client: MongoClient, collection: string) {
  const db = client.db('Books');

  const books = await db
    .collection(collection)
    .find({}, { projection: { chapters: 0 } }) 
    .toArray();

  return books;
}




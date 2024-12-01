import { MongoClient, ObjectId } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


// פונקציה לעדכון דירוג של ספר
export async function updateBookRating(bookId: string, newRating: number) {
  const db = await connectDatabase();
  const booksCollection = db.collection('books');
  const ratingsCollection = db.collection('ratings');

  // המרת bookId ל-ObjectId
  const objectId = new ObjectId(bookId);

  // שליפת כל הדירוגים של הספר
  const ratings = await ratingsCollection.find({ bookId: objectId }).toArray();

  // אם אין דירוגים קיימים, הוסף את הדירוג החדש ועדכן את הספר
  if (ratings.length === 0) {
    await ratingsCollection.insertOne({
      bookId: objectId,
      rating: newRating,
    });

    await booksCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          rating: newRating,
          rating_num: 1, // דירוג ראשון
        },
      }
    );

    return;
  }

  // אם יש דירוגים קיימים, חשב ממוצע דירוגים חדש ועדכן את הספר
  const totalRatings = ratings.length + 1; // מספר דירוגים כולל הדירוג החדש
  const averageRating =
    (ratings.reduce((acc, r) => acc + r.rating, 0) + newRating) / totalRatings;

  await ratingsCollection.insertOne({
    bookId: objectId,
    rating: newRating,
  });

  await booksCollection.updateOne(
    { _id: objectId },
    {
      $set: {
        rating: averageRating,
        rating_num: totalRatings,
      },
    }
  );
}

// פונקציה לחיבור למסד הנתונים
export async function connectDatabase() {
  if (!client) {
    const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
    if (!dbConnectionString) {
      throw new Error('Database connection string is not defined');
    }
    client = new MongoClient(dbConnectionString);
    clientPromise = client.connect();
  }
  return (await clientPromise).db('Books'); 
}

// חיבור לבסיס הנתונים
// export async function connectDatabase() {
//   if (!client) {
//     const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
//     if (!dbConnectionString) {
//       throw new Error('Database connection string is not defined');
//     }
//     client = new MongoClient(dbConnectionString);
//     clientPromise = client.connect();
//   }
//   return clientPromise;
// }

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

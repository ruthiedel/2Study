import { MongoClient, ObjectId } from 'mongodb';
import { User, UserBook } from '../../types';

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

export async function checkAndAddUser(user: Omit<User, '_id'>) {
  const client = await connectDatabase();
  const db = client.db('Books'); 
  const usersCollection = db.collection('users'); 
  const existingUser = await usersCollection.findOne({ email: user.email });

  if (!existingUser) {
    await usersCollection.insertOne(user);
    return { status: 201, message: 'User added successfully' };
  }
  return { status: 200, message: 'User already exists' };
}

export async function addUserBook(userId: string, bookId: string, bookName: string) {
  const client = await connectDatabase();
  const db = client.db('Books');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  if (!user) {
    return {status: 404, message: 'User not found' };
  }

  const newUserBook: UserBook = {
    book_id: bookId,
    book_name: bookName,
    chapter_id: 1,
    section_id: 1,
    rate: 0,
  }
  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { books: { $each: [newUserBook] } } as any }
  );

  return { status: 200, message: 'Book added to user successfully' };
}

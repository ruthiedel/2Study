import { MongoClient } from 'mongodb';
import { User } from '@/types';

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

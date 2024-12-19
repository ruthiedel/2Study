import { User, UserWithPassword } from '../../types';
import { MongoClient } from 'mongodb';

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


export async function getPasswordByEmail(email: string, newHashedPassword: string): Promise<{status: number, message: string}> {
  const client = await connectDatabase();
  const db = client.db('Books');
  const usersCollection = db.collection('users');
  
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return { status: 404, message: 'לא נמצא משתמש עם המייל הזה' };
  }

  // עדכון הסיסמה המוצפנת
  await usersCollection.updateOne(
    { email },
    { $set: { password: newHashedPassword } }
  );

  return { status: 200, message: 'הסיסמה עודכנה בהצלחה' };
}

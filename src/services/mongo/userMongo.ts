import { MongoClient, ObjectId } from 'mongodb';
import { User } from '../../types';

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
    const result = await usersCollection.insertOne(user);
    const userWithId = {
      ...user,
      _id: result.insertedId.toString()
    };
    return { status: 201, message: userWithId._id, user: userWithId };
  }
  const userWithId = {
    ...existingUser,
    _id: existingUser._id.toString()
  };

  return { status: 200, message: userWithId._id, user: userWithId };
}

export async function updateUser(client: MongoClient, collection: string, userId: string, updatedData: User) {
  const db = client.db('Books');
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  const { _id, ...dataToUpdate } = updatedData;
  await db.collection(collection).replaceOne(
    { _id: objectId },
    dataToUpdate
  );

  return {
    message: 'User updated successfully',
    updatedFields: updatedData,
  };
}

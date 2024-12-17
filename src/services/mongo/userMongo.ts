import { MongoClient, ObjectId } from 'mongodb';
import { User, UserWithPassword } from '../../types';
import bcrypt from 'bcryptjs';

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

export async function checkAndAddUser(user: UserWithPassword) {
  const client = await connectDatabase();
  const db = client.db('Books');
  const usersCollection = db.collection('users');
  const hashedPassword:string = await bcrypt.hash(user.password, 10);
  const result = await usersCollection.insertOne({
    ...user, 
    _id: new ObjectId(user._id), 
    password: hashedPassword
  });

  const userWithId = { ...user, _id: result.insertedId.toString() };
  return { status: 201, message: 'המשתמש נרשם בהצלחה', user: userWithId };
}


export async function findUserByEmailAndPassword(email: string, password: string) {
  const client = await connectDatabase();
  const db = client.db('Books');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const userWithId = { ...user, _id: user._id.toString() };
  return userWithId;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await connectDatabase();
  const db = client.db('Books');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return null;
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    books: user.books,
    userImagePath: user.userImagePath
  };
}


export async function updateUser(client: MongoClient, collection: string, userId: string, updatedData: User) {
  const db = client.db('Books');
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  const { _id, ...dataToUpdate } = updatedData;
  await db.collection(collection).replaceOne({ _id: objectId }, dataToUpdate);

  return { message: 'User updated successfully', updatedFields: updatedData };
}

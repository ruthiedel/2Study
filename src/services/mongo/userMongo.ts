import { MongoClient, ObjectId } from 'mongodb';
import { LoginCredentials, User, UserWithPassword } from '../../types';
import bcrypt from 'bcryptjs';
import { connectDatabase } from './mongoConection';


export async function checkAndAddUser(client: MongoClient, user: UserWithPassword) {
  const db = client.db('Books');
  const usersCollection = db.collection('users');
  const hashedPassword: string = await bcrypt.hash(user.password, 10);

  const userId = user._id && user._id.length === 24 ? new ObjectId(user._id) : new ObjectId();

  const result = await usersCollection.insertOne({
    ...user,
    _id: userId,  
    password: hashedPassword
  });

  const userWithId = {
    _id: result.insertedId.toString(),
    name: user.name,
    email: user.email,
    books: user.books,
    userImagePath: user.userImagePath
  };

  return { status: 201, message: 'המשתמש נרשם בהצלחה', user: userWithId };
}

export async function findUserByEmailAndPassword(client: MongoClient,email: string, password: string) {
  const db = client.db('Books');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const userWithId = {
    _id: user._id instanceof ObjectId ? user._id.toHexString() : user._id, 
    name: user.name,
    email: user.email,
    books: user.books,
    userImagePath: user.userImagePath
  };  
  return userWithId;
}

export async function findUserByEmail(client: MongoClient, email: string): Promise<User | null> {
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

export async function registerUser(user: UserWithPassword) {
  const client = await connectDatabase();
  const existingUser = await findUserByEmail(client, user.email);
  if (existingUser) {
    return { message: 'המייל הזה כבר קיים במערכת. אנא בחר מייל אחר.', status: 400 };
  }

  const result = await checkAndAddUser(client, user);

  return {
    message: result.message || 'ההרשמה בוצעה בהצלחה! ברוכה הבאה!',
    status: result.status || 200,
    user: {
      _id: result.user._id,
      name: result.user.name,
      email: result.user.email,
      books: result.user.books,
      userImagePath: result.user.userImagePath
    }
  };
}

export async function loginUser(client: MongoClient, credentials: LoginCredentials) {
  const user = await findUserByEmailAndPassword(client, credentials.email, credentials.password);
  if (!user) {
    return { message: 'המייל או הסיסמה שגויים. נסה שוב.', status: 401 };
  }

  return { message: 'ההתחברות בוצעה בהצלחה!', status: 200, user };
}

export async function googleUser(client: MongoClient, user: UserWithPassword) {
  const result = await findUserByEmail(client, user.email);

  if (result !== null) {
    return { message: 'ההתחברות בוצעה בהצלחה!', status: 200, user:result };
  }
  else
    return await checkAndAddUser(client, user);
}


export async function updateUser(client: MongoClient, collection: string, userId: string, updatedData: User) {
  const db = client.db('Books');
  const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
  const { _id, ...dataToUpdate } = updatedData;
  await db.collection(collection).replaceOne({ _id: objectId }, dataToUpdate);

  return { message: 'User updated successfully', updatedFields: updatedData };
}

import { LearningGroup, Message } from '../../types'; 
import { MongoClient, WithId } from 'mongodb';

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

export async function getMassagesByBookId(bookId: string): Promise<LearningGroup> {
  const client = await connectDatabase();  
  const db = client.db(); 
  const collection = db.collection('LearningGroup'); 

  const learningGroup = await collection.findOne({ 'book_id': bookId });

  if (!learningGroup) {
    return { book_id: bookId, messages: [] }; 
  }

  return {
    book_id: learningGroup.book_id,  
    messages: learningGroup.messages || []  
  };
}

export async function addMessageToLearningGroup(bookId: string, message: Message): Promise<LearningGroup> {
  const client = await connectDatabase();  
  const db = client.db(); 
  const collection = db.collection('LearningGroup'); 

  const learningGroup = await collection.findOne({ 'book_id': bookId });

  if (!learningGroup) {
    const newLearningGroup: LearningGroup = {
      book_id: bookId,
      messages: [message],
    };

    await collection.insertOne(newLearningGroup);
    return newLearningGroup;
  } else {
    learningGroup.messages.push(message);
    await collection.updateOne(
      { 'book_id': bookId },
      { $set: { messages: learningGroup.messages } }
    );

    return {
      book_id: learningGroup.book_id,
      messages: learningGroup.messages,
    };
  }
}

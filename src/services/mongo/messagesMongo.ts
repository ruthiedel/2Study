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

export async function getMessagesByBookId(bookId: string): Promise<LearningGroup> {
  const client = await connectDatabase();  
  const db = client.db('Books');
  const collection = db.collection('LearningGroup'); 

  const learningGroup = await collection.findOne({ 'book_id': bookId });

  if (!learningGroup) {
    return { book_id: bookId, messages: [] }; 
  }
  client.close(); 

  return {
    book_id: learningGroup.book_id,  
    messages: learningGroup.messages || []  
  };
}

export async function addMessageToLearningGroup(bookId: string, message: Message): Promise<Message> {
  const client = await connectDatabase();  
  const db = client.db('Books');
  const collection = db.collection('LearningGroup'); 

  const learningGroup = await collection.findOne({ 'book_id': bookId });

  if (!learningGroup) {
    const newLearningGroup: LearningGroup = {
      book_id: bookId,
      messages: [message],
    };

    await collection.insertOne(newLearningGroup);
    return message;
  } else {
    learningGroup.messages.push(message);
    await collection.updateOne(
      { 'book_id': bookId },
      { $set: { messages: learningGroup.messages } }
    );

    client.close(); 

    return message;
  }
}

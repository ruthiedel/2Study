import { MongoClient } from 'mongodb';
import { LearningGroup, Message } from '../../types'; 



export async function getMessagesByBookId(client: MongoClient, bookId: string): Promise<LearningGroup> { 
  const db = client.db('Books');
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

export async function addMessageToLearningGroup(client: MongoClient , bookId: string, message: Message): Promise<Message> {
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


    return message;
  }
}

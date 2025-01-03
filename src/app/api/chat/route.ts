import { NextResponse } from 'next/server';
import Pusher from 'pusher';
import { addMessageToLearningGroup } from '../../../services/mongo/messagesMongo'
import { connectDatabase } from '../../../services/mongo/mongoConection';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, userName, bookId, userId } = body;

    const newMessage = {
      message,
      userName,
      timestamp: new Date().toISOString(),
      userId
    };
    const client = await connectDatabase();
    await addMessageToLearningGroup(client, bookId, {userName: userName, message, timestamp: new Date(),userId: userId});
    await pusher.trigger(`chat-${bookId}`, 'message', newMessage);
    return NextResponse.json(newMessage, { status: 200 });
  } catch (error) {
    console.error('Error triggering Pusher:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

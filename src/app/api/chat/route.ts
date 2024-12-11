import { NextResponse } from 'next/server';
import Pusher from 'pusher';

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
    const { message, username, bookId } = body;

    const newMessage = {
      message,
      username,
      bookId,
      timestamp: new Date().toISOString(),
    };

    await pusher.trigger(`chat-${bookId}`, 'message', newMessage);

    return NextResponse.json(newMessage, { status: 200 });
  } catch (error) {
    console.error('Error triggering Pusher:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

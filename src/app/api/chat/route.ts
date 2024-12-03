import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

let messages: { bookId: string; username: string; message: string; timestamp: string }[] = [];

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

    messages.push(newMessage); 

    await pusher.trigger(`chat-${bookId}`, 'message', newMessage);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error triggering Pusher:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get('bookId');

  if (!bookId) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }

  const filteredMessages = messages.filter((msg) => msg.bookId === bookId);
  return NextResponse.json(filteredMessages, { status: 200 });
}

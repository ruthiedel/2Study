import { NextResponse } from 'next/server';
import { getMessagesByBookId } from '../../../../services/mongo/messagesMongo';
import { connectDatabase } from '../../../../services/mongo/mongoConection';

export async function GET(req: Request, { params }: { params: { book_id: string } }) {
  try {
    const { book_id } = params;
    const client = await connectDatabase();
    const message = await getMessagesByBookId(client, book_id);
    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getMessagesByBookId } from '../../../../services/mongo/messagesMongo';

export async function GET(req: Request, { params }: { params: { book_id: string } }) {
  try {
    const { book_id } = params;

    const message = await getMessagesByBookId(book_id);
    console.log(message);
    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectDatabase, updateBook } from '../../../../services/mongo/bookMongo';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; 
    const updatedData = await request.json();

    const client = await connectDatabase();
    const book = await updateBook(client, 'books', id, updatedData);

    return NextResponse.json(book);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
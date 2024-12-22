import { NextResponse } from 'next/server';
import { connectDatabase, updateBook, fetchBookById } from '../../../../services/mongo/bookMongo';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; 
    const client = await connectDatabase();
    const book = await fetchBookById(client, 'books', id);
    return NextResponse.json(book);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
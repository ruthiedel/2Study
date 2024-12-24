import { NextResponse } from 'next/server';
import {  updateBook, fetchBookById } from '../../../../services/mongo/bookMongo';
import { connectDatabase } from '../../../../services/mongo/mongoConection';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; 
    const updatedData = await request.json();

    const client = await connectDatabase();
    const book = await updateBook(client, 'books', id, updatedData);
    await client.close();

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
    await client.close();
    return NextResponse.json(book);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
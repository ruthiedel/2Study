import { NextResponse } from 'next/server';
import { addBook, connectDatabase, fetchAllBooks } from '../../../services/mongo/bookMongo';
import { Book } from '../../../types';


export async function GET(request: Request) {
    try {
      const client = await connectDatabase();
      const books = await fetchAllBooks(client, 'books'); 
      return NextResponse.json(books);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error });
    }
}


export async function POST(request: Request) {
  try {
    const newBook: Book = await request.json();

    const client = await connectDatabase();

    const result = await addBook(client, 'books', newBook);

    // client.close();

    return NextResponse.json(
      { message: 'Book added successfully', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding book:', error);

    return NextResponse.json(
      { message: 'Failed to add book', error: String(error) },
      { status: 500 }
    );
  }
}



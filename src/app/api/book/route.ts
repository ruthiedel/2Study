import { NextResponse } from 'next/server';
import { connectDatabase, getAllBooks, getGeneralInformation } from '@/services/mongo/bookMongo';


export async function GET(request: Request) {
    try {
      const client = await connectDatabase();
  
      const books = await getAllBooks(client, 'books'); 
      return NextResponse.json(books);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to fetch books' }, { status: 500 });
    }
}

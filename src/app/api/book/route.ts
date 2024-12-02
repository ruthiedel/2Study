import { NextResponse } from 'next/server';
import { connectDatabase, getAllBooks } from '../../../services/mongo/bookMongo';


export async function GET(request: Request) {
    try {
      const client = await connectDatabase();
  
      const books = await getAllBooks(client, 'books'); 
      return NextResponse.json(books);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error });
    }
}

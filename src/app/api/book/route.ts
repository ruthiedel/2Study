import { NextResponse } from 'next/server';
import { connectDatabase, fetchAllBooks } from '../../../services/mongo/bookMongo';


export async function GET(request: Request) {
    try {
      const client = await connectDatabase();
      const books = await fetchAllBooks(client, 'books'); 
      client.close(); 
      return NextResponse.json(books);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error });
    }
}

import { NextResponse } from 'next/server';
import { connectDatabase, getPartOgAllBooks } from '@/services/mongo/bookMongo';


export async function Post() {
    try {
      const client = await connectDatabase();
  
      const books = await getPartOgAllBooks(client, 'books'); 
      return NextResponse.json(books);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error });
    }
}
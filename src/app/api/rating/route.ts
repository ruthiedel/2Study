import { NextResponse } from 'next/server';
import { addRating } from '@/services/mongo/ratingModel';
import { updateBookRating } from '@/services/mongo/bookMongo';

export async function POST(req: Request) {
  try {
    const { bookId, rating } = await req.json();
    if (!bookId || rating == null) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await addRating(bookId, rating);
    await updateBookRating(bookId , rating);

    return NextResponse.json({ message: 'Rating added successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add rating' }, { status: 500 });
  }
}

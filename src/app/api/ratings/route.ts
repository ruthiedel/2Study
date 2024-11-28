import { NextResponse } from "next/server";
import { saveRating, getAverageRatingForBook } from "@/services/ratingService";
import { saveBookRating } from "@/services/bookService";

export async function POST(request: Request) {
  try {
    const { bookId, rating } = await request.json();

    if (!bookId || typeof rating !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // שמירת דירוג
    await saveRating(bookId, rating);

    // חישוב ממוצע חדש ועדכון הספר
    const averageRating = await getAverageRatingForBook(bookId);
    await saveBookRating(bookId, averageRating);

    return NextResponse.json({ message: "Rating submitted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "error.message" }, { status: 500 });
  }
}

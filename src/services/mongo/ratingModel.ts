// import mongoose from "mongoose";

// const ratingSchema = new mongoose.Schema({
//   bookId: { type: String, required: true },
//   rating: { type: Number, required: true, min: 1, max: 5 },
// });

// const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

// export default Rating;

import { ObjectId } from "mongodb";
import { connectDatabase } from "./bookMongo";

export async function addRating(bookId: string, rating: number) {
  const db = await connectDatabase();
  const objectId = new ObjectId(bookId);
  await db.collection("ratings").insertOne({
    bookId: objectId, 
    rating,
  });
}


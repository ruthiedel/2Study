import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;

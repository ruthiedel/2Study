import Rating from "@/services/mongo/ratingModel";

export const saveRating = async (bookId: string, rating: number) => {
  const newRating = new Rating({ bookId, rating });
  await newRating.save();
};

export const getAverageRatingForBook = async (bookId: string) => {
  const ratings = await Rating.find({ bookId });
  const average =
    ratings.reduce((sum, { rating }) => sum + rating, 0) / ratings.length;

  return average;
};

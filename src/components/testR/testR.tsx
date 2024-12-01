import Rating from '../rating/rating';
import { useState } from 'react';
import { Book as BookType } from "../../types";

const BookCard = ( book :BookType) => {
  const [showRating, setShowRating] = useState(false);

  const handleRatingSubmit = async (rating: number) => {
    await fetch('/api/rating', {
      method: 'POST',
      body: JSON.stringify({ bookId: book._id, rating }),
    });
    setShowRating(false);
  };

  return (
    <div>
      <h3>{book.name}</h3>
      <button onClick={() => setShowRating(true)}>דרג</button>
      {showRating && (
        <Rating
          bookId={book._id}
          onClose={() => setShowRating(false)}
          onSubmitRating={handleRatingSubmit}
        />
      )}
    </div>
  );
};

export default BookCard;

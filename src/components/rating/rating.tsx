import { useState } from "react";
import Rating from "@mui/material/Rating";
import styles from "./rating.module.css";
import { useUpdateBook } from '../../hooks/booksDetails';
import useUserStore from "../../services/zustand/userZustand/userStor";
import { getBookById } from '../../services/bookService'


interface RatingComponentProps {
  bookId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ bookId }) => {
  const updateRating = useUserStore((state) => state.updateRating);
  const updateBookMutation = useUpdateBook();
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let evgRating = 0;
  let num_raters = 0;



  const handleRatingSubmit = async () => {
    if (rating !== null) {
      setIsSubmitting(true);
      const book = getBookById(bookId);
      if ((await book).number_raters > 0) {
        num_raters =(await book).number_raters++
        evgRating = Math.round(((await book).rating! + rating) / num_raters);
      }
      else {
        num_raters = 1;
        (await book).rating = rating;
        evgRating = rating;
      }
      try {
        await updateBookMutation.mutate({ id: bookId, updatedData: { "rating": evgRating , "number_raters":  num_raters} },);
        updateRating(bookId, rating);
        alert("דירוג נשמר בהצלחה!");
        setIsVisible(false);
      } catch (error) {
        console.error("שגיאה בשמירת הדירוג:", error);
        alert("אירעה שגיאה בשמירת הדירוג.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    setRating(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.ratingContainer}>
      <p className={styles.title}>דרג את הספר</p>
      <Rating
        name="book-rating"
        value={rating}
        precision={1}
        onChange={(event, newValue) => setRating(newValue)}
        disabled={isSubmitting}
        className={styles.ratingStars}
      />
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.submitButton} ${rating === null ? styles.disabled : ""}`}
          onClick={handleRatingSubmit}
          disabled={isSubmitting || rating === null}
        >
          שלח דירוג
        </button>
        <button
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          לא הפעם
        </button>

      </div>
    </div>
  );
};

export default RatingComponent;

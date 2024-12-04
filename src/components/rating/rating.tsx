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
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let evgRating = 0;
  let num_raters = 0;



  const handleRatingSubmit = async () => {
    if (rating !== null) {
      setIsSubmitting(true);
      try {
        const book = await getBookById(bookId);
        const num_raters = book.number_raters > 0 ? book.number_raters + 1 : 1;
        const evgRating = book.number_raters > 0
          ? Math.round((book.rating! * book.number_raters + rating) / num_raters)
          : rating;
        alert("rating: " + evgRating + " num_raters: " + num_raters);
        await updateBookMutation.mutate({
          id: bookId,
          updatedData: { rating: evgRating, number_raters: num_raters },
        });

        updateRating(bookId, evgRating);
        alert("דירוג נשמר בהצלחה!");
        setIsVisible(false);
      } catch (error) {
        alert("אירעה שגיאה בשמירת הדירוג.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const boundingBox = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - boundingBox.left;
    const width = boundingBox.width;
  
    // תמיד לחשב דירוג מימין לשמאל
    const hoveredValue = Math.ceil(((width - mouseX) / width) * 5); 
  
    setHoverRating(Math.min(5, Math.max(1, hoveredValue))); // להבטיח דירוג בטווח 1-5
  };
  
  
     


  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleCancel = () => {
    setRating(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.ratingContainer}>
      <p className={styles.title}>דרג את הספר</p>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverRating(null)}
        className={styles.ratingStars}
      >
        <Rating
          name="book-rating"
          value={rating}
          precision={1}
          onChange={(event, newValue) => setRating(newValue)}
          disabled={isSubmitting}
          className={styles.ratingStars}
        />
      </div>
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

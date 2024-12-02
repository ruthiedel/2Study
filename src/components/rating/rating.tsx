import { useState } from "react";
import Rating from "@mui/material/Rating";
import styles from "./rating.module.css";
import { updateBookRatingService } from "../../services/ratingService";
import useUserStore from '../../services/zustand/userZustand/userStor';


interface RatingComponentProps {
  bookId: string; 
}

const RatingComponent: React.FC<RatingComponentProps> = ({ bookId }) => {
  const updateRating = useUserStore((state) => state.updateRating);
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 

  const handleRatingSubmit = async () => {
    if (rating !== null) {
      setIsSubmitting(true);
      try {
        await updateBookRatingService(bookId, rating); 
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
    setIsVisible(false); // סגירת הקומפוננטה
  };

  if (!isVisible) return null; // אם הקומפוננטה סגורה, לא מציגים אותה

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

import { useState } from "react";
import styles from "./rating.module.css";

interface RatingProps {
  bookId: string;
  onClose: () => void; // פונקציה לסגירת הקומפוננטה
  onSubmitRating: (bookId: string, rating: number) => Promise<void>; // שליחת דירוג
}

const Rating = ({ bookId, onClose, onSubmitRating }: RatingProps) => {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return; // ודא שהדירוג נבחר

    setIsSubmitting(true);
    await onSubmitRating(bookId, rating);
    setIsSubmitting(false);
    onClose(); // סגור את הקומפוננטה לאחר השליחה
  };

  return (
    <div className={styles.modal}>
      <div className={styles.ratingContainer}>
        <h3>דרג את הספר</h3>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={rating >= star ? styles.selectedStar : styles.star}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
        >
          {rating === 0 ? "שלח דירוג" : "שולח..."}
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          לא הפעם
        </button>
      </div>
    </div>
  );
};

export default Rating;

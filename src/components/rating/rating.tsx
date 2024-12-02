import React, { useState } from 'react';
import styles from './rating.module.css';

type RatingCardProps = {
  bookId?: string;
  onClose: () => void;
  onSubmitRating: (rating: number) => void;
};

const RatingCard: React.FC<RatingCardProps> = ({ bookId, onClose, onSubmitRating }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating !== null) {
      onSubmitRating(rating);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>דרג את הספר</h2>
      <div className={styles.ratingOptions}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`${styles.ratingButton} ${rating === value ? styles.selected : ''}`}
            onClick={() => handleRatingChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onClose}>
          לא הפעם
        </button>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={rating === null}
        >
          שלח דירוג
        </button>
      </div>
    </div>
  );
};

export default RatingCard;

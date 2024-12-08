import { useState } from "react";
import Rating from "@mui/material/Rating";
import styles from "./rating.module.css";
import { useUpdateBook } from '../../hooks/booksDetails';
import useUserStore from "../../services/zustand/userZustand/userStor";
import { getBookById } from '../../hooks/booksDetails'
import {updateUser} from '../../services/userService'
import { User } from '../../types';


interface RatingComponentProps {
  bookId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ bookId }) => {
  // const updateRating = useUserStore((state) => state.updateRating);
  const user = useUserStore((state) => state.user);

  const updateBookMutation = useUpdateBook();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);



  const handleRatingSubmit = async () => {
    if (rating !== null) {
      setIsSubmitting(true);
      try {
        alert("try")
        const book = getBookById(bookId);
        alert("user updated")

        if (book){
          const num_raters = book.number_raters > 0 ? book.number_raters + 1 : 1;
          const evgRating = book.number_raters > 0
            ? Math.round((book.rating! * book.number_raters + rating) / num_raters)
            : rating;

          await updateBookMutation.mutate({
            id: bookId,
            updatedData: { rating: evgRating, number_raters: num_raters },
          });
          const newbooks = user?.books.map(book =>{
            if(book.book_id === bookId){
              return {...book, rate: rating}
            }
            return book;
          })
          const newuser: User ={
            ...user!,
            books:newbooks || [],
          };
          updateUser({ id: user?._id || "", updatedData: newuser });        
          alert(rating);
          alert("דירוג נשמר בהצלחה!");
          setIsVisible(false);
        }
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
      const hoveredValue = Math.ceil(((width - mouseX) / width) * 5); 
    setHoverRating(Math.min(5, Math.max(1, hoveredValue))); // להבטיח דירוג בטווח 1-5
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
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          לא הפעם
        </button>
        <button
          className={`${styles.submitButton} ${rating === null ? styles.disabled : ""}`}
          onClick={handleRatingSubmit}
          disabled={isSubmitting || rating === null}
        >
          שלח דירוג
        </button>

      </div>
    </div>
  );
};

export default RatingComponent;

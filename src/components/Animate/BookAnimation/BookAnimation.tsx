// components/BookAnimation.tsx
import React from "react";
import styles from "./BookAnimation.module.css";

const BookAnimation: React.FC = () => {
  return (
    <div className={styles.scene}>
      <div className={styles.book}>
        <div className={styles.cover + " " + styles.frontCover}></div>
        <div className={styles.pages}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.page}></div>
          ))}
        </div>
        <div className={styles.cover + " " + styles.backCover}></div>
      </div>
    </div>
  );
};

export default BookAnimation;

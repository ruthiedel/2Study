import React, { useState } from 'react';
import styles from './style.module.css'; // ייבוא קובץ ה-CSS המודולרי

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.carouselContainer}>
      <button onClick={handlePrev} className={styles.carouselButton}>
        ❮
      </button>
      <div className={styles.carouselImageWrapper}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className={styles.carouselImage} />
      </div>
      <button onClick={handleNext} className={styles.carouselButton}>
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;

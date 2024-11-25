'use client';

import React, { useEffect, useState } from 'react';
import styles from './style.module.css'; // ייבוא קובץ ה-CSS המודולרי
import ImageCarousel from './Carusel';


const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const images = [
    '/pictures/comming_soon/image1.png',
    '/pictures/comming_soon/image2.png',
    '/pictures/comming_soon/image3.png',
    '/pictures/comming_soon/image4.png',
    '/pictures/comming_soon/image5.png',
    '/pictures/comming_soon/image6.png',
    '/pictures/comming_soon/image7.png',
    '/pictures/comming_soon/image8.png',
    '/pictures/comming_soon/image9.png',
  ];

  useEffect(() => {
    const targetDate = new Date('2025-01-08T00:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime(); // שימוש ב-getTime()

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coming Soon 🚀</h1>
      <p className={styles.description}>
        We’re working hard to bring you something amazing. Stay tuned!
      </p>
      <p className={styles.description}>
        See you in 08.01.2025
      </p>
      <div className={styles.countdown}>
        <div className={styles.timeBox}>
          <span className={styles.time}>{timeLeft.days}</span>
          <span className={styles.label}>Days</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.time}>{timeLeft.hours}</span>
          <span className={styles.label}>Hours</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.time}>{timeLeft.minutes}</span>
          <span className={styles.label}>Minutes</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.time}>{timeLeft.seconds}</span>
          <span className={styles.label}>Seconds</span>
        </div>
      </div>
      <br /><br />
      <p className={styles.description}>
       View our website:
      </p>
      <ImageCarousel images={images}/>
      <br /><br />
      <iframe
          width="800"
          height="450"
          src="https://embed.figma.com/design/DqXQgXf7i3Ym8UaKUhBXFW/2Study?node-id=0-1&embed-host=share"
          allowFullScreen
          style={{
            border: 'none',
          }}
        ></iframe>
    </div>
  );
};

export default ComingSoon;

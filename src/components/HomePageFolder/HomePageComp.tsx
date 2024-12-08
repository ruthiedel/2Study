"use client";

import React from "react";
import styles from './homepage.module.css';
import { useEffect, useState } from 'react';

const Homepage = () => {
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    setAnimationActive(true);
  }, []);

  return (
    <div className={styles.homeContainer}>
        <div className={styles.lefttext}>
        <h1 className={styles.titel}>
          2Study – לימוד יומי קל ונעים
        </h1>
        <p className={styles.text}>
          שיפור ידע אישי בסעיפים קצרים של 2 דקות ביום,
          <br />
           עם אפשרות לשאול שאלות ולנהל התקדמות.
        </p>
        </div>
        <button className={styles.startButton}>
          התחלי ללמוד עכשיו
        </button>
    </div>
  );
};

export default Homepage;

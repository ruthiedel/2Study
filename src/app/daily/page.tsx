'use client'
import React from 'react';
import { DailyContent as DailyContentComponent } from '../../components';
import Tehilim from '../../components/Tehilim/Tehilim';
import styles from './daily.module.css'
import { style } from '@mui/system';

const DailyContent = () => {

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>תוכן יומי: צוללים לעומק החכמה והמסורת</h1>
        <h2 className={styles.subtitle}>מקום יומי להתבוננות, לימוד והשראה מתוך ארון הספרים היהודי</h2>
        <p className={styles.intro}>
          ברוכים הבאים לפינת התוכן היומית! כאן תוכלו למצוא מבחר נושאים מגוונים ללימוד יומי מתוך אוצרות ארון הספרים היהודי: מפרשת השבוע, דף יומי, הלכה יומית, ספרי נביאים, כתובים, משנה ועוד.
          כל יום מחכה לכם תמצית מרתקת שתעשיר את היום שלכם, תעודד התבוננות מעמיקה, ותסייע לכם להתחבר לשורשים ולמסורת בדרך נעימה ומעשירה.<br />
          ✨ <strong>בחרו נושא, פתחו כרטיס, והתחילו את היום עם השראה!</strong> ✨
        </p>
      </div>

      <Tehilim />
      <DailyContentComponent />
    </div>
  );
};

export default DailyContent;
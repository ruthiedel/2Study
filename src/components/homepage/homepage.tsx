"use client";
import React from "react";
import styles from './homepage.module.css';
import useUserStore from '../../services/zustand/userZustand/userStor';

const Homepage = () => {
    const user = useUserStore((state) => state.user);

    return (
        <div className={styles.homeContainer}>
          <section className={styles.intro}>
            <h1 className={`${styles.headline} ${styles.animateFadeInUp}`}>
              2Study – לימוד יומי קל ונעים
            </h1>
            <p className={`${styles.subheadline} ${styles.animateFadeInUp}`}>
              שיפור ידע אישי בסעיפים קצרים של 2 דקות ביום, עם אפשרות לשאול שאלות ולנהל התקדמות.
            </p>
            <button className={`${styles.ctaButton} ${styles.animateZoomIn}`}>
              התחלי ללמוד עכשיו
            </button>
          </section>
    
          <section className={styles.features}>
            <div className={`${styles.featureCard} ${styles.animateFadeInLeft}`}>
              <h2>קטלוג ספרים מגוון</h2>
              <p>מצא את הספרים שמתאימים לך ותחל ללמוד בקלות.</p>
            </div>
            <div className={`${styles.featureCard} ${styles.animateFadeInUp}`}>
              <h2>שאלות בצ'אט קבוצתי</h2>
              <p>הצטרפי לקבוצת למידה לכל ספר ושאלי שאלות במהירות.</p>
            </div>
            <div className={`${styles.featureCard} ${styles.animateFadeInRight}`}>
              <h2>מעקב אישי אחר התקדמות</h2>
              <p>התקדמי בגרפים אישיים וצפי בהצלחה שלך.</p>
            </div>
          </section>
    
          <section className={styles.recommendation}>
            <h2 className={`${styles.animateFadeInUp}`}>המלצות לספרים חדשים</h2>
            <p className={`${styles.animateFadeInUp}`}>
              המערכת שלנו תמליץ לך על ספרים שלא נלמדו עדיין. התחילי עכשיו!
            </p>
            <button className={`${styles.ctaButton} ${styles.animateZoomIn}`}>
              גלי את ההמלצות
            </button>
          </section>
    
          <section className={styles.testimonial}>
            <h2 className={`${styles.animateFadeInUp}`}>מה משתמשות אומרות</h2>
            <p className={`${styles.animateFadeInUp}`}>
              "המשימה היומית עושה את הלמידה למהירה, נוחה ויעילה! כל ספר מלווה בהסברים מדויקים." - מרים, משתמשת
            </p>
          </section>
        </div>
      );
    };
export default Homepage;

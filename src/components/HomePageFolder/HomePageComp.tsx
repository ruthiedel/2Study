"use client";

import React, { useEffect } from "react";
import styles from './homepage.module.css';
import GoalSetting from './Goals/Goals';


const UserRecommendations = () => {
  return (
    <div className={styles.recommendations}>
      <div className={styles.recommendationsContainer}>
        <h3 className={styles.recommendationsTitle}>מה לומדות ממליצות:</h3>
        <ul className={styles.recommendationList}>
          <li className={styles.recommendationItem}>
            <p className={styles.recommendationText}>
              "הפלטפורמה מאוד עזרה לי למקד את הלמידה שלי ולהיות עקבית. עכשיו אני
              רואה שיפור משמעותי!"
            </p>
            <p className={styles.recommendationName}>ליהי כהן</p>
            <p className={styles.recommendationRole}>לומדת מתקדמת</p>
          </li>
          <li className={styles.recommendationItem}>
            <p className={styles.recommendationText}>
              "אני אוהבת את איך שהמערכת מאפשרת לי להגדיר מטרות ולראות את ההתקדמות
              שלי, זה נותן לי מוטיבציה להמשיך ללמוד."
            </p>
            <p className={styles.recommendationName}>מיכל אברהם</p>
            <p className={styles.recommendationRole}>לומדת מתחילה</p>
          </li>
          <li className={styles.recommendationItem}>
            <p className={styles.recommendationText}>
              "הפלטפורמה מאוד ידידותית למשתמש, והגישה שלה ללימודים מאוד מעניינת ומעוררת
              השראה."
            </p>
            <p className={styles.recommendationName}>תמר דוד</p>
            <p className={styles.recommendationRole}>לומדת בינונית</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Homepage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animateOnScroll');
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.firstSection}>
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

        <div className={styles.features}>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h2>סימניות חכמות</h2>
            <p>אפשרות לשמור את המיקום האחרון בספרים.</p>
          </div>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h2>שאלות לבחינה עצמית</h2>
            <p>שאלות עוזרות להעמקת הבנתך.</p>
          </div>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h2>מעקב התקדמות אישי</h2>
            <p>גרפים ותצוגות מתקדמות למעקב.</p>
          </div >
          <div className={`${styles.underline} `}></div>
        </div >

        <div className={styles.recommendations}>
          <h2>המלצות למידה</h2>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h3>למד על הדרך שלך</h3>
            <p>בצע מעקב יומי אחרי הלמידה שלך והצלח במטרה.</p>
          </div>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h3>התחל בלימוד סדרתי</h3>
            <p>כנס לקטעים קצרים באופן סדרתי כדי לשפר את ההבנה שלך.</p>
          </div>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h3>הקדש זמן ללמידה יומיומית</h3>
            <p>קדיש לפחות 10 דקות ביום לשיפור הידע והבנתך.</p>
          </div>
          <div className={`${styles.underline} `}></div>
        </div >

        <div className={styles.additionalTips}>
          <h2>טיפים נוספים להצלחה</h2>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h3>הגדרת מטרות אישיות</h3>
            <p>קבע מטרות יומיות כדי להשיג התקדמות משמעותית בכל יום.</p>
          </div>
          <div className={`${styles.featureCard} animateOnScroll`}>
            <h3>השתמש בהפסקות קטנות</h3>
            <p>למד 5-10 דקות בכל הפסקה במהלך היום כדי להשאיר את הראש חד ופעיל.</p>
          </div>
        </div >
        <div className={`${styles.underline} `}></div>

        <UserRecommendations />
        <div className={`${styles.underline} `}></div>
        <GoalSetting />
      </div >
    </>);
};

export default Homepage;
import React from "react";
import styles from "./termsService.module.css"; 

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>תקנון האתר - למידה יומית בספרי יהדות</h1>

      <section className={styles.section}>
        <h2>1. מבוא והגדרות</h2>
        <p>
          <strong>1.1. האתר</strong> - אתר זה המאפשר למשתמשים לצרוך תכנים לימודיים הקשורים לספרי יהדות, לעקוב אחר התקדמותם, וליהנות מפלטפורמה דיגיטלית מותאמת אישית ללמידה.
        </p>
        <p>
          <strong>1.2. מפעילי האתר</strong> - הנהלת האתר, לרבות עובדים, יועצים וכל מי שמורשה לפעול מטעם האתר.
        </p>
        <p>
          <strong>1.3. משתמש</strong> - כל אדם אשר עושה שימוש באתר, בין אם באמצעות הרשמה ובין אם ללא הרשמה.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. הסכמה לשימוש באתר</h2>
        <p>
          <strong>2.1.</strong> השימוש באתר הינו בהתאם לתקנון זה. כל שימוש מהווה הסכמה בלתי מותנית לתנאים המפורטים להלן.
        </p>
        <p>
          <strong>2.2.</strong> המשתמש מתחייב להשתמש באתר באופן חוקי ובהתאם לכל דין ולא לבצע שימושים אסורים, לרבות:
        </p>
        <ul className={styles.list}>
          <li>התחזות לאדם אחר.</li>
          <li>שימוש לא חוקי בתכנים.</li>
          <li>שיבוש, הפרעה או פגיעה בתפקוד האתר.</li>
          <li>פגיעה בזכויות יוצרים או בזכויות קנייניות אחרות.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. יצירת חשבון ומעקב אחר התקדמות</h2>
        <p>
          <strong>3.1.</strong> על מנת להשתמש בשירותים מסוימים, ייתכן ותידרש הרשמה ליצירת חשבון.
        </p>
        <p>
          <strong>3.2.</strong> המשתמש מתחייב למסור פרטים נכונים ומדויקים.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. איסוף ושימוש במידע (מדיניות פרטיות)</h2>
        <p>
          <strong>4.1. איסוף מידע:</strong> האתר אוסף מידע אישי הכולל שם מלא, כתובת דוא"ל, ונתוני שימוש.
        </p>
        <p>
          <strong>4.2. שימוש במידע:</strong> המידע ישמש לצורך שיפור חוויית המשתמש ושיפור האתר.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. אבטחת מידע</h2>
        <p> האתר נוקט באמצעי אבטחה מתקדמים לשמירה על המידע של המשתמשים במידה של גניבת מידע אין לאתר אחריות על המידע הניתן לו .</p>
      </section>

      <section className={styles.section}>
        <h2>6. קניין רוחני</h2>
        <p>כל הזכויות על תכני האתר שמורות למפעיל האתר. אין לעשות שימוש בתכנים ללא אישור מראש.</p>
      </section>

      <section className={styles.section}>
        <h2>7. יצירת קשר</h2>
        <p>לשאלות ניתן לפנות למייל: <strong>054racheli@gmail.com</strong></p>
      </section>
    </div>
  );
};

export default TermsOfService;

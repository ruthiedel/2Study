'use client';
import React, { useEffect } from "react";
import styles from "./aboutPage.module.css";

const AboutPage = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.show);
                    } else {
                        entry.target.classList.remove(styles.show);
                    }
                });
            },
            {
                threshold: 0.1, 
            }
        );

        const elements = document.querySelectorAll(`.${styles.hidden}`);
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect(); 
    }, []);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.heroSection}>
                    <h1 className={`${styles.heroTitle} ${styles.hidden}`}>אודות</h1>
                    <p className={`${styles.heroDescription} ${styles.hidden}`}>
                        ברוכים הבאים למקום שבו לימוד פוגש השראה. האתר שלנו מציע חוויית לימוד ייחודית ומותאמת אישית לציבור החרדי, עם ספרים נבחרים, כלים מתקדמים, וקבוצות לימוד המחברות בין לומדים. כאן תוכלו לצמוח, להעמיק ולהתקדם בדרך שלכם, עם תמיכה מתמדת ותחושת שייכות אמיתית.
                    </p>
            </div>

            <div className={styles.sectionTitleContainer}>
                <h2 className={` ${styles.hidden} `}>לומדים חכמה, צומחים יחד</h2>
                <div className={`${styles.titleUnderline} ${styles.hidden}`}></div>
            </div>

            <div className={styles.featuresContainer}>
                <div className={styles.feature}>
                    <div className={`${styles.featureImage} ${styles.feature1} ${styles.hidden}`} ></div>
                    <div className={styles.featureContent}>
                        <h3  className={`${styles.featureTitle} ${styles.hidden}`}>פתרונות מהירים, הצלחה גדולה</h3>
                        <div className={styles.featureUnderline}></div>
                        <p  className={`${styles.featureText} ${styles.hidden}`}>
                            באתר שלנו, כל הכלים זמינים לך בלחיצת כפתור: סימניות חכמות,
                            <br />
                            שאלות למעקב עצמי, וקבוצות למידה שמשלבות אותך בקהילה תומכת של לומדים.
                        </p>
                    </div>
                </div>

                <div className={styles.featureReverse}>
                    <div className={`${styles.featureImage} ${styles.feature2} ${styles.hidden}`} ></div>
                    <div className={styles.featureContent}>
                        <h3 className={`${styles.featureTitle} ${styles.hidden}`}>המקום המושלם ללמוד</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={`${styles.featureText} ${styles.hidden}`}>
                            האתר שלנו עוצב במיוחד עבור הציבור החרדי, עם דגש על עיצוב נקי ופשוט
                            <br />
                            שמאפשר להתמקד בתוכן. כל פרט תוכנן כדי להעניק חוויית לימוד נוחה,
                            <br />
                            איכותית, ויעילה, תוך התאמה מלאה לערכים ולצרכים המיוחדים של הקהילה.
                        </p>
                    </div>
                </div>

                <div className={styles.feature}>
                    <div className={`${styles.featureImage} ${styles.feature3} ${styles.hidden}`} ></div>
                    <div className={styles.featureContent}>
                        <h3 className={`${styles.featureTitle} ${styles.hidden}`}>ידע מחבר בין אנשים</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={`${styles.featureText} ${styles.hidden}`}>
                            הלמידה כאן אינה לבד: קבוצות הצ'אט שלנו מחברות בין לומדים מכל מקום,
                            <br />
                            לתמיכה, שיתוף ידע, ושאלות שמביאות לתשובות חדשות.
                        </p>
                    </div>
                </div>

                <div className={styles.featureReverse}>
                    <div className={`${styles.featureImage} ${styles.feature4} ${styles.hidden}`} ></div>
                    <div className={styles.featureContent}>
                        <h3 className={`${styles.featureTitle} ${styles.hidden}`}>התהליך שלך, ההתקדמות שלך</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={`${styles.featureText} ${styles.hidden}`}>
                            עם גרפים שמראים לך בדיוק איפה את.ה עומד.ת,
                            <br />
                            ושיטות למידה מותאמות אישית, תוכל.י להרגיש את הצמיחה שלך כל יום מחדש.
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <h2 className={`${styles.sectionTitle} ${styles.hidden}`}>למה דווקא אצלנו?</h2>
                <div className={styles.titleUnderline}></div>
                <div className={styles.bottomFeatures}>
                    <div className={styles.bottomFeature}>
                        <div className={`${styles.bottomFeatureImage} ${styles.bottomFeatureImage1} ${styles.hidden}`}></div>
                        <h3 className={`${styles.bottomFeatureTitle} ${styles.hidden}`}>התקדמות אישית</h3>
                        <p className={`${styles.bottomFeatureText} ${styles.hidden}`}>
                            תוכלו לראות את ההתקדמות שלכם
                            <br />
                            ולראות לבד, ששני דקות בכל יום
                            <br />
                            יכולות ליצור שינוי אדיר!
                        </p>
                    </div>
                    <div className={styles.bottomFeature}>
                        <div className={`${styles.bottomFeatureImage} ${styles.bottomFeatureImage2} ${styles.hidden}`}></div>
                        <h3 className={`${styles.bottomFeatureTitle} ${styles.hidden}`}>קל להגיע</h3>
                        <p className={`${styles.bottomFeatureText} ${styles.hidden}`}>
                            הרבה אנשים חולמים לעבוד מהבית, שלא
                            <br />
                            לדבר על כל הסטודנטים שחולמים ללמוד
                            <br />
                            מהבית, אבל לא תמיד זה מוכיח את עצמו.
                            <br />
                            כאן מקדישים פשוט 2 דקות: בהפסקת קפה,
                            <br />
                            אחרי שהילדים נרדמו, ורואים התקדמות אדירה.
                        </p>
                    </div>
                    <div className={styles.bottomFeature}>
                        <div className={`${styles.bottomFeatureImage} ${styles.bottomFeatureImage3} ${styles.hidden}`}></div>
                        <h3 className={`${styles.bottomFeatureTitle} ${styles.hidden}`}>קידום אישי</h3>
                        <p className={`${styles.bottomFeatureText} ${styles.hidden}`}>
                            כיף להרגיש שמתקדמים בחיים, במיוחד
                            <br />
                            בתחום הרוחני, ואם יש לי איך לאכוף
                            <br />
                            את זה ולראות את ההתקדמות בעיניים -
                            <br />
                            עוד יותר טוב. במיוחד שיש עוד
                            <br />
                            כ”כ הרבה שותפים ביחד איתי...
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.featureUnderlinedwon}></div>
        </div>
    );
};

export default AboutPage;

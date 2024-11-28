
import React from "react";
import styles from "./aboutPage.module.css";

const AboutPage = () => {
    return (
        <div className={styles.pageContainer}>
          
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}>
                    <h1 className={styles.heroTitle}>אודות</h1>
                    <p className={styles.heroDescription}>
                        ברוכים הבאים למקום שבו לימוד פוגש השראה. האתר שלנו מציע חוויית לימוד ייחודית ומותאמת אישית לציבור החרדי, עם ספרים נבחרים, כלים מתקדמים, וקבוצות לימוד המחברות בין לומדים. כאן תוכלו לצמוח, להעמיק ולהתקדם בדרך שלכם, עם תמיכה מתמדת ותחושת שייכות אמיתית.
                    </p>
                </div>
            </div>

            {/* Section Title */}
            <div className={styles.sectionTitleContainer}>
                <h2 className={styles.sectionTitle}>לומדים חכמה, צומחים יחד</h2>
                <div className={styles.titleUnderline}></div>
            </div>

            {/* Features */}
            <div className={styles.featuresContainer}>
                {/* Feature 1 */}
                <div className={styles.feature}>
                    <div className={`${styles.featureImage} ${styles.feature1}`} ></div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>פתרונות מהירים, הצלחה גדולה</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={styles.featureText}>
                            באתר שלנו, כל הכלים זמינים לך בלחיצת כפתור: סימניות חכמות,
                            <br />
                            שאלות למעקב עצמי, וקבוצות למידה שמשלבות אותך בקהילה תומכת של לומדים.
                        </p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className={styles.featureReverse}>
                <div className={`${styles.featureImage} ${styles.feature2}`} ></div>
                <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>המקום המושלם ללמוד</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={styles.featureText}>
                            האתר שלנו עוצב במיוחד עבור הציבור החרדי, עם דגש על עיצוב נקי ופשוט
                            <br />
                            שמאפשר להתמקד בתוכן. כל פרט תוכנן כדי להעניק חוויית לימוד נוחה,
                            <br />
                            איכותית, ויעילה, תוך התאמה מלאה לערכים ולצרכים המיוחדים של הקהילה.
                        </p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className={styles.feature}>
                <div className={`${styles.featureImage} ${styles.feature3}`} ></div>
                <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>ידע מחבר בין אנשים</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={styles.featureText}>
                            הלמידה כאן אינה לבד: קבוצות הצ'אט שלנו מחברות בין לומדים מכל מקום,
                            <br />
                            לתמיכה, שיתוף ידע, ושאלות שמביאות לתשובות חדשות.
                        </p>
                    </div>
                </div>

                {/* Feature 4 */}
                <div className={styles.featureReverse}>
                <div className={`${styles.featureImage} ${styles.feature4}`} ></div>
                <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>התהליך שלך, ההתקדמות שלך</h3>
                        <div className={styles.featureUnderline}></div>
                        <p className={styles.featureText}>
                            עם גרפים שמראים לך בדיוק איפה את.ה עומד.ת,
                            <br />
                            ושיטות למידה מותאמות אישית, תוכל.י להרגיש את הצמיחה שלך כל יום מחדש.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.bottomSection}>
                <h2 className={styles.sectionTitle}>למה דווקא אצלנו?</h2>
                <div className={styles.titleUnderline}></div>
                <div className={styles.bottomFeatures}>
                    <div className={styles.bottomFeature}>
                        <div className={`${styles.bottomFeatureImage} ${styles.bottomFeatureImage1}`}></div>
                        <h3 className={styles.bottomFeatureTitle}>התקדמות אישית</h3>
                        <p className={styles.bottomFeatureText}>
                            תוכלו לראות את ההתקדמות שלכם
                            <br/>
                             ולראות לבד, ששני דקות בכל יום
                             <br/>
                              יכולות ליצור שינוי אדיר!
                        </p>
                    </div>
                    <div className={styles.bottomFeature}>
                    <div className={`${styles.bottomFeatureImage} ${styles.bottomFeatureImage2}`}></div>
                    <h3 className={styles.bottomFeatureTitle}>קל להגיע</h3>
                        <p className={styles.bottomFeatureText}>
                             הרבה אנשים חולמים לעבוד מהבית, שלא
                            <br/>
                             לדבר על כל הסטודנטים שחולמים ללמוד
                             <br/>
                              מהבית, אבל לא תמיד זה מוכיח את עצמו. 
                            <br/>
                            כאן מקדישים פשוט 2 דקות: בהפסקת קפה, 
                            <br/>
                            אחרי שהילדים נרדמו, ורואים התקדמות אדירה.
                        </p>
                    </div>
                    <div className={styles.bottomFeature}>
                    <div className={`${styles.bottomFeatureImage} ${styles.bottomFeatureImage3}`}></div>
                    <h3 className={styles.bottomFeatureTitle}>קידום אישי</h3>
                        <p className={styles.bottomFeatureText}>
                            כיף להרגיש שמתקדמים בחיים, במיוחד
                            <br/>
                             בתחום הרוחני, ואם יש לי איך לאכוף
                             <br/>
                              את זה ולראות את ההתקדמות בעיניים - 
                              <br/>
                              עוד יותר טוב. במיוחד שיש עוד
                              <br/>
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

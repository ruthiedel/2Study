import React from 'react';
import styles from './about.module.css';

const customerTestimonials = [
    {
        recommendation: "המערכת פשוט נהדרת! הצלחתי להישאר על הקצב שלי ולהתמיד בלימודים בצורה מסודרת. כלים מעולים למעקב, ושאלות הבקרה עוזרות לי להבין שאני אכן מתקדמת.",
        name: "מיכל כהן",
        role: "מנהלת משאבי אנוש",
        profileImage: "pictures/anonimi2.jpg",
    },
    {
        recommendation: "כשהצטרפתי לאתר לא ידעתי למה לצפות, אך מהר מאוד הבנתי שהייתי צריכה את זה! התמיכה המקצועית והקבוצות הלימוד עשו לי את כל ההבדל. אני מרגישה שאני לא לבד בדרך.",
        name: "שרה רוזנברג",
        role: "רואת חשבון",
        profileImage: "pictures/anonimi4.jpg"
    },
    {
        recommendation: "המערכת עוזרת לי ללמוד בקצב שלי ולנהל את הזמן בצורה מושלמת. אני ממליצה לכל מי שמחפש פתרון שיאפשר לו ללמוד ביעילות מבלי להרגיש לחוץ.",
        name: "רונית לוי",
        role: "מעצבת פנים",
        profileImage: "pictures/anonimi3.jpg"
    },
];

function Fidback() {
    return (
        <div className={styles.fidbackContainer}>
            <h1 className={styles.fidbackTitle}>לקוחות ממליצות</h1>
            <div className={styles.customerTestimonials}>
                {customerTestimonials.map((testimonial, index) => (
                    <div key={index} className={styles.customerTestimonial}>
                        <div className={styles.profileSection}>
                            <img 
                                src={testimonial.profileImage} 
                                alt={testimonial.name} 
                                className={styles.profileImage} 
                            />
                            <div>
                                <p className={styles.customerName}>{testimonial.name}</p>
                                <p className={styles.customerRole}>{testimonial.role}</p>
                            </div>
                        </div>
                        <div className={styles.quoteSection}>
                            <p className={styles.quoteMark}>"</p>
                            <p className={styles.recommendation}>{testimonial.recommendation}</p>
                            <p className={styles.quoteMark2}>"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fidback;

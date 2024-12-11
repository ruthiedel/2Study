import React from 'react'
import styles from './about.module.css'; 

const customerTestimonials = [
    {
        recommendation: "המערכת פשוט נהדרת! הצלחתי להישאר על הקצב שלי ולהתמיד בלימודים בצורה מסודרת. כלים מעולים למעקב, ושאלות הבקרה עוזרות לי להבין שאני אכן מתקדמת.",
        name: "מיכל כהן"
    },
    {
        recommendation: "כשהצטרפתי לאתר לא ידעתי למה לצפות, אך מהר מאוד הבנתי שהייתי צריכה את זה! התמיכה המקצועית והקבוצות הלימוד עשו לי את כל ההבדל. אני מרגישה שאני לא לבד בדרך.",
        name: "שרה רוזנברג"
    },
    {
        recommendation: "המערכת עוזרת לי ללמוד בקצב שלי ולנהל את הזמן בצורה מושלמת. אני ממליצה לכל מי שמחפש פתרון שיאפשר לו ללמוד ביעילות מבלי להרגיש לחוץ.",
        name: "רונית לוי"
    },
    {
        recommendation: "האתר הזה שינה את הדרך שבה אני לומדת! אני נהניתי מאוד מהמעקב האישי ומהתמיכה שקיבלתי לאורך הדרך. כל מורה ומורה שיצא לי לדבר איתם היו תמיד עם הרבה סבלנות ונכונות לעזור.",
        name: "תמר ברק"
    }
];

function Fidback() {
    return (
        <div>
            <h1 className={styles.fidbackTitle}>לקוחות ממליצות</h1>
            <div className={styles.customerTestimonials}>
                {customerTestimonials.map((testimonial, index) => (
                    <div key={index} className={styles.customerTestimonial}>
                        <p>"{testimonial.recommendation}"</p>
                        <p className={styles.customerName}>-{testimonial.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Fidback;

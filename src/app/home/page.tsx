"use client";

import React, { useState, useEffect } from "react";
import { Feedback, Section, BottomSection } from "../../components";
import styles from './homePage.module.css';
import { useRouter } from "next/navigation";
import { Noto_Serif} from 'next/font/google';

const NotoSerif = Noto_Serif({
    weight: ['400'],
    subsets: ['latin'],
});

const HomePage: React.FC = () => {
    const [isSending, setIsSending] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;
                    if (entry.isIntersecting) {

                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                        target.style.transition = 'opacity 0.5s ease, transform 1s ease-out';
                      
                    } else {
                        target.style.opacity = '0';
                        target.style.transform = 'translateY(20px)';
                        target.style.transition = 'opacity 0.5s ease, transform 1s ease-out';
                    }
                });
            },
            { threshold: 0.5 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => {
            const element = el as HTMLElement;
            element.style.opacity = '0';
            element.style.transform = 'translateY(100px)';
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);



    const sections = [
        {
            title: 'פתרונות מהירים, הצלחה גדולה',
            description: 'באתר שלנו, כל הכלים זמינים לך בלחיצת כפתור:  סימניות חכמות שיכולות לעזור לך לארגן את הלמידה שלך בצורה נוחה, שאלות למעקב עצמי יעזרו לך להעמיק את ההבנה שלך, וקבוצות למידה שמשלבות אותך בקהילה תומכת של לומדים.',
            scriptUrl: 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js',
            animateUrl: 'https://lottie.host/f1d3c5af-add7-4eb4-92a5-86f2a88baa2b/nmxpipNU7M.lottie'
        },
        {
            title: 'המקום המושלם ללמוד',
            description: 'האתר שלנו עוצב במיוחד עבור הציבור החרדי, עם דגש על עיצוב נקי ופשוט שמאפשר להתמקד בתוכן. כל פרט תוכנן כדי להעניק חוויית לימוד נוחה, איכותית, ויעילה, תוך התאמה מלאה לערכים ולצרכים המיוחדים של הקהילה.',
            scriptUrl: 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js',
            animateUrl: 'https://lottie.host/51d71ca3-5345-40bd-847b-3a1dbae345d5/0uXNSSwHY7.lottie'
        },
        {
            title: 'ידע מחבר בין אנשים',
            description: 'הלמידה כאן אינה לבד: קבוצות הצ\'אט שלנו מחברות בין לומדים מכל מקום, לתמיכה, שיתוף ידע, ושאלות שמביאות לתשובות חדשות.',
            scriptUrl: 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js',
            animateUrl: 'https://lottie.host/38c286d7-7bb8-429b-8cbc-03aa09ed5e24/tqnGg9OWQU.lottie'
        },
        {
            title: 'התהליך שלך, ההתקדמות שלך',
            description: 'עם גרפים שמראים לך בדיוק איפה את.ה עומד.ת, ושיטות למידה מותאמות אישית, תוכל.י להרגיש את הצמיחה שלך כל יום מחדש.',
            scriptUrl: 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js',
            animateUrl: 'https://lottie.host/3265234c-c1ab-4d33-b54d-1794272a5c85/CqluU31R6u.lottie'
        }
    ];

    const buttomSections = [
        {
            imageUrl: 'pictures/1.png',
            title: 'התקדמות אישית',
            content: 'תוכלו לראות את ההתקדמות שלכם ולראו לבד, ששני דקות בכל יום יכולות ליצור שינוי אדיר! '
        },
        {
            imageUrl: 'pictures/2.png',
            title: 'קל להגיע',
            content: 'הרבה אנשים חולמים לעבוד מהבית, שלא לדבר על כל הסטודנטים שחולמים ללמוד מהבית, אבל לא תמיד זה מוכיח את עצמו. כאן מקדישים פשוט 2 דקות: בהפסקת קפה, אחרי שהילדים נרדמו, ורואים התקדמות אדירה.'
        },
        {
            imageUrl: 'pictures/3.png',
            title: 'קידום אישי',
            content: 'כיף להרגיש שמתקדמים בחיים, במיוחד בתחום הרוחני, ואם יש לי איך לאכוף את זה ולראות את ההתקדמות בעיניים - עוד יותר טוב. במיוחד שיש עוד כ”כ הרבה שותפים ביחד איתי...'
        },
    ];

    function handleStarted(event: React.MouseEvent<HTMLButtonElement>): void {
        if (isSending) return; 
        setIsSending(true); 
            try {
                router.push(`/bookCatalog`); 
            } catch (error) {
                console.error('Error navigating to BooksLearning:', error);
            } finally {
                setIsSending(false); 
            }
    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.headercontainer}>
                <div className={styles.background}>
                    <h1 className={`${styles.title} ${NotoSerif.className}`} data-animate>2study</h1>
                    <h2 className={styles.secondTitle} data-animate>ללמוד ב2 דקות</h2>
                    <p className={styles.section} data-animate>ברוכים הבאים למקום שבו לימוד פוגש השראה.
                        <br />
                        האתר שלנו מציע חוויית לימוד ייחודית ומותאמת אישית לציבור החרדי,
                        <br />
                        עם ספרים נבחרים,

                        כלים מתקדמים, וקבוצות לימוד המחברות בין לומדים.
                        <br />
                        כאן תוכלו לצמוח, להעמיק ולהתקדם בדרך שלכם, עם תמיכה מתמדת ותחושת שייכות אמיתית.
                        
                        <br/>
                        ובעיקר ללמוד ולהחכים!!!!!
                        
                        </p>
                       
                </div>
            </div>

            <div className={styles.container} data-animate>
                <p className={styles.title2}>לומדים חכמה, צומחים יחד</p>
                <div className={styles.line}></div>
            </div>

            <div className={styles.heroSection}>
                {sections.map((section, index) => (
                    <div key={index} data-animate>
                        <Section section={section} isEven={index % 2 === 0} data-animate />
                    </div>
                ))}
            </div>
            <div data-animate>
                <Feedback />
            </div>
            <div className={styles.buttonContainer} data-animate>
                <button className={styles.buttonStart} onClick={handleStarted} data-animate disabled={isSending}
                > {isSending ? 'כבר מתחילים...' : 'התחל ללמוד ←'}</button>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.container} data-animate>
                    <h2 className={styles.secondTitle}>למה דווקא אצלנו?</h2>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.bottomFeatures}>
                    {buttomSections.map((section, index) => (
                        <div key={index} data-animate>
                            <BottomSection section={section} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

"use client";
import React, { useState, useEffect } from "react";
import styles from "./DailyContent.module.css";
import { dailyContent } from "../../services/dailyServices";
import ExpandedCard from "./ExpandedCard";
import ContentCard from "./DailyContentCard";
import { Loading } from "../../components";
import { date } from "zod";

interface ContentItem {
  title: string;
  text: string | string[] | string[][];
  location: string;
}

const DailyContent: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const errorText = "שגיאה בטעינת הטקסט";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dailyContent();
        const cleanedData = data.map((item: ContentItem) => ({
          ...item,
          text: item.text,
        }));
        setContent(cleanedData);
      } catch (error) {
        console.error("Error fetching daily content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      {selectedItem && (
        <ExpandedCard
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <div className={styles.headerContainer}>
        <h1 className={styles.title}>תוכן יומי: צוללים לעומק החכמה והמסורת</h1>
        <h2 className={styles.subtitle}>מקום יומי להתבוננות, לימוד והשראה מתוך ארון הספרים היהודי</h2>
        <p className={styles.intro}>
          ברוכים הבאים לפינת התוכן היומית! כאן תוכלו למצוא מבחר נושאים מגוונים ללימוד יומי מתוך אוצרות ארון הספרים היהודי: מפרשת השבוע, דף יומי, הלכה יומית, ספרי נביאים, כתובים, משנה ועוד.
          כל יום מחכה לכם תמצית מרתקת שתעשיר את היום שלכם, תעודד התבוננות מעמיקה, ותסייע לכם להתחבר לשורשים ולמסורת בדרך נעימה ומעשירה.<br />
          ✨ <strong>בחרו נושא, פתחו כרטיס, והתחילו את היום עם השראה!</strong> ✨
        </p>
      </div>

      <div className={styles.dailyContent}>
        {content.length === 0 ? (
          <Loading />
        ) : (
          content.map((item, index) =>
            item.text !== errorText ? (
              <ContentCard
                key={index}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default DailyContent;

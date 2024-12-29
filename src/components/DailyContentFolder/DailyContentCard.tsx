"use client";
import React from "react";
import styles from "./DailyContent.module.css";

interface ContentItem {
  title: string;
  text: string | string[] | string[][]; 
  location: string;  // הוספתי שדה location
}

const ContentCard: React.FC<{
  item: ContentItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const text = Array.isArray(item.text)
    ? item.text.flat(Infinity).join(" ") 
    : item.text;

  const truncatedText = text.length > 100 ? text.substring(0, 100) + "..." : text;

  return (
    <div className={styles.contentCard} onClick={onClick}>
      <h3>{item.title}</h3>
      <p>{item.location}</p> {/* הוספתי את המיקום מתחת לכותרת */}
      <p>{truncatedText}</p>
    </div>
  );
};

export default ContentCard;


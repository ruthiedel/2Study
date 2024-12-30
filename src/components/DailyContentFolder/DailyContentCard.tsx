"use client";
import React, { useEffect, useState } from "react";
import styles from "./DailyContent.module.css";
import { removeHtmlTags } from "@/lib/clientHelpers/removeHTMLTags";

interface ContentItem {
  title: string;
  text: string | string[] | string[][];
  location: string;
}

const ContentCard: React.FC<{
  item: ContentItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const [isLearned, setIsLearned] = useState<boolean>(false);
  const currentDate = new Date().toLocaleDateString();

  const handleLearnedClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem(item.title, currentDate);
    setIsLearned(true);
  };

  useEffect(() => {
    const lastLearnedDate = localStorage.getItem(item.title);
    if (lastLearnedDate && lastLearnedDate === currentDate) {
      setIsLearned(true);
    }
  }, [item.title, currentDate]);

  const text = Array.isArray(item.text)
    ? item.text.flat(Infinity).join(" ")
    : item.text;

  const truncatedText = text.length > 100 ? text.substring(0, 100) + "..." : text;

  return (
    <div className={isLearned ? styles.learnedCard : styles.contentCard} onClick={onClick}>
      <h3 className={styles.mainTitle}>{item.title}</h3>
      <p className={styles.subtitle}>{item.location}</p>
      <p>{removeHtmlTags(truncatedText)}</p>
      <button
        className={styles.learnedButton}
        onClick={handleLearnedClick}
        disabled={isLearned}
        style={{ backgroundColor: isLearned ? "gray" : "black" }}
      >
        {isLearned ? "נלמד להיום" : "סמן כנלמד"}
      </button>
    </div>
  );
};

export default ContentCard;

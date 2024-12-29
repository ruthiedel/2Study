import React from "react";
import styles from "./DailyContent.module.css";

interface ContentItem {
  title: string;
  text: string;
  location: string;  // הוספתי שדה location
}

const ExpandedCard: React.FC<{
  item: ContentItem;
  onClose: () => void;
}> = ({ item, onClose }) => {
  return (
    <div className={styles.expandedCard}>
      <button className={styles.closeButton} onClick={onClose}>
        סגור
      </button>
      <h3>{item.title}</h3>
      <p>{item.location}</p> 
      <p dangerouslySetInnerHTML={{ __html: item.text }}></p>
    </div>
  );
};

export default ExpandedCard;

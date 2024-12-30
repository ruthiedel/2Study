// ExpandedCard.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./DailyContent.module.css";
import { addLineBreaks } from '../../lib/clientHelpers/breakLines';

interface ContentItem {
  title: string;
  text: string | string[] | string[][];
  location: string;
}

const ExpandedCard: React.FC<{
  item: ContentItem;
  onClose: () => void;
}> = ({ item, onClose }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.expandedCard}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardSubtitle}>{item.location}</p>
        <div className={styles.cardTextContainer}>
          <p className={styles.cardText} dangerouslySetInnerHTML={{
            __html: addLineBreaks(item.text),
          }}></p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ExpandedCard;

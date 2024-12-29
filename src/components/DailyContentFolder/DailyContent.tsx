"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./DailyContent.module.css"; 
import { dailyContent } from "../../services/dailyServices"; 
import ExpandedCard from "./ExpandedCard";
import ContentCard from "./DailyContentCard";
import {Loading} from "../../components"

interface ContentItem {
  title: string;
  text: string;
  location: string; 
}

const DailyContent: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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


  if (selectedItem) {
    return (
      <div ref={containerRef} className={styles.expandedCardWrapper}>
        <ExpandedCard
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    );
  }
  return (
    <div className={styles.dailyContent}>
      {content.length === 0 ? (
        <Loading />
      ) : (
        content.map((item, index) => (
          <ContentCard
            key={index}
            item={item}
            onClick={() => setSelectedItem(item)}
          />
        ))
      )}
    </div>
  );
};

export default DailyContent;


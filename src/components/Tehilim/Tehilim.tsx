"use client";

import React, { useState, useEffect } from "react";
import styles from "./tehilim.module.css";
import ExpandedCard from "../DailyContentFolder/ExpandedCard";
import Loading from "../LoadingFolder/Loading";
import numberToGematria from "../../lib/clientHelpers/gematriaFunc";
import { getTehilimForToday } from "../../services/tehilimService";

interface ContentItem {
  title: string;
  text: string | string[] | string[][];
  location: string;
}

interface Content {
  chapter: number;
  text: string;
}

function Tehilim() {
  const [data, setData] = useState<Content[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [readDates, setReadDates] = useState<(string | null)[]>([]);

  useEffect(() => {
    const fetchTehilim = async () => {
      try {
        const tehilim = await getTehilimForToday();
        const formattedData = tehilim.map((item) => ({
          chapter: item.chapter,
          text: item.text,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching Tehilim:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTehilim();
  }, []);

  useEffect(() => {
    const storedDates = localStorage.getItem("tehilimReadDates");
    if (storedDates) {
      setReadDates(JSON.parse(storedDates));
    } else {
      const initialDates = Array(150).fill(null); // 150 פרקים
      localStorage.setItem("tehilimReadDates", JSON.stringify(initialDates));
      setReadDates(initialDates);
    }
  }, []);

  const handleMarkAsRead = (chapterIndex: number) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const updatedDates = [...readDates];
    updatedDates[chapterIndex] = todayDate;
    setReadDates(updatedDates);
    localStorage.setItem("tehilimReadDates", JSON.stringify(updatedDates));
  };

  const isChapterRead = (chapterIndex: number) => {
    const todayDate = new Date().toISOString().split("T")[0];
    return readDates[chapterIndex] === todayDate;
  };

  const handleChooseItem = (item: Content) => {
    const newItem: ContentItem = {
      title: "תהילים יומי",
      text: item.text,
      location: `פרק ${numberToGematria(item.chapter)}' `,
    };
    setSelectedItem(newItem);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>תהילים יומי</h1>

      {selectedItem && (
        <ExpandedCard
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <div className={styles.chapterContainer}>
        {isLoading ? (
          <Loading />
        ) : data.length === 0 ? (
          <p>לא נמצאו פרקים להיום.</p>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className={`${styles.chapterDiv} ${
                isChapterRead(index) ? styles.read : ""
              }`}
            >
              <p onClick={() => handleChooseItem(item)}>
                פרק {numberToGematria(item.chapter)}'
              </p>
              <button
                className={styles.markReadButton}
                onClick={() => handleMarkAsRead(index)}
              >
                סמן כנקרא
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tehilim;

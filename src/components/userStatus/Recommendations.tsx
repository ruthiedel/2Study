"use client";

import React from "react";
import styles from "./userStatus.module.css";
import Book from "@/components/book/book";
import { Book as BookType } from "@/types";

type partOfBook = {
  _id?: string;
  book_name: string;
  author: string;
  categories: string[];
  coverImage: string;
  totalChapters: number;
  totalSections: number;
};

const localBooks: partOfBook[] = [
  {
    _id: "1",
    book_name: "מסילת ישרים",
    author: "רמחל",
    categories: ["מוסר"],
    coverImage: "/mesilat.jpeg",
    totalChapters: 15,
    totalSections: 200,
  },
  {
    _id: "2",
    book_name: "שולחן ערוך",
    author: "רבי חיים לוצאטו",
    categories: ["מוסר"],
    coverImage: "/mesilat.jpeg",
    totalChapters: 21,
    totalSections: 72,
  },
];

const Recommendations = () => {
  // const {books} : User = useQuery

  return (
    <div className={styles.container}>
      {localBooks.map((book) => {
        return (
          <div className={styles.recommendcard}>
            <div>
            <div className="text-sm mt-4">מומלץ בשבילך</div>
              <div className="text-[8px]">
                מערכת ההמלצה שלנו חיפשה את הספר המתאים ביותר עבורך בהתבסס על
                בחירות ודירוגים קודמים
              </div>
              <Book key={book.book_name}
                book={{
                  _id: undefined,
                  name: "",
                  author: "",
                  category: {
                    type: "",
                    subject: "",
                  },
                  chapters: [],
                  coverImage: "",
                  users: undefined,
                  learningGroups: undefined,
                  chapters_num: 0,
                  paragraphs_num: 0,
                }}
              ></Book>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Recommendations;

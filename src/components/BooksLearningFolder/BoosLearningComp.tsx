"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./BooksLearningPage.module.css";
import { UserBook } from "../../types";
import useUserStore from "../../services/zustand/userZustand/userStor";

const BooksLearning = () => {
  const { user } = useUserStore(); // חילוץ המידע של המשתמש מתוך Zustand
  const [searchQuery, setSearchQuery] = useState("");
  //const router = useRouter();

  // חילוץ ספרים של המשתמש
  const userBooks: UserBook[] = user ? user.books : [];

  // סינון ספרים לפי שם (חיפוש)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // סינון הספרים על פי שם הספר
  const filteredUserBooks = userBooks.filter((book) =>
    book.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // פונקציה לקבלת המידע של כל ספר
  const getUserBookData = (bookId: string) => {
    const userBook = userBooks.find((book) => book.book_id === bookId);
    return userBook ? { chapter_id: userBook.chapter_id, section_id: userBook.section_id, rate: userBook.rate } : null;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>איזור למידה</h1>
      <p className={styles.subtitle}>בחר ספר מהרשימה כדי להתחיל ללמוד 📚</p>

      {/* חיפוש ספר */}
      <div className={styles.searchWrapper}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="חפש ספר..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.booksList}>
        {filteredUserBooks.length === 0 ? (
          <p>לא נמצאו ספרים בלמידה</p>
        ) : (
          filteredUserBooks.map((userBook) => {
            const userBookData = getUserBookData(userBook.book_id);

            return (
              <div className={styles.bookItem} key={userBook.book_id}>
                <div className={styles.bookDetails}>
                  <h3 className={styles.bookName}>{userBook.book_name}</h3>
                  <p className={styles.bookAuthor}>
                    פרק: {userBookData?.chapter_id}, חלק: {userBookData?.section_id}
                  </p>
                  <p className={styles.bookRating}>
                    דירוג: {userBookData?.rate} ⭐
                  </p>
                  <button
                    className={styles.learnButton}
                   // onClick={() => router.push(`/study/${userBook.book_id}`)}
                  >
                    התחל ללמוד
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BooksLearning;

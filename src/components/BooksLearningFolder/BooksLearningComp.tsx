"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./BooksLearningPage.module.css";
import { UserBook } from "../../types";
import useUserStore from "../../services/zustand/userZustand/userStor";
import RequireAuth from "../../layout/RequireAuth";
import numberToGematria from "../../lib/clientHelpers/gematriaFunc";

const BooksLearning = () => {
  const user = useUserStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const userBooks: UserBook[] = user ? user.books : [];
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserBooks = userBooks.filter((book) =>
    book.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserBookData = (bookId: string) => {
    const userBook = userBooks.find((book) => book.book_id === bookId);
    return userBook ? { chapter_id: userBook.chapter_id, section_id: userBook.section_id, rate: userBook.rate } : null;
  };

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.title}>איזור למידה</h1>
        <p className={styles.subtitle}>בחר ספר מהרשימה כדי להתחיל ללמוד 📚</p>
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
            filteredUserBooks.map((userBook, index) => {
              const userBookData = getUserBookData(userBook.book_id);
              return (
                <div className={styles.bookItem} key={userBook.book_id}>
                  <div className={styles.bookDetails}>
                    <p className={styles.bookAuthor}>{index+1}</p>
                    <h3 className={styles.bookName}>{userBook.book_name}</h3>
                    <p className={styles.bookAuthor}>
                     מיקומך בפרק: {numberToGematria(userBookData?.chapter_id || 1)}, סעיף: {numberToGematria(userBookData?.section_id || 1)}
                    </p>
                    <p className={styles.bookAuthor}>
                      דירוג: {userBookData?.rate} ⭐
                    </p>
                    <button
                      className={styles.learnButton}
                      onClick={() => router.push(`/study/${userBook.book_id}`)}
                    >
                      המשך ללמוד ← 
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </RequireAuth>
  );
};

export default BooksLearning;

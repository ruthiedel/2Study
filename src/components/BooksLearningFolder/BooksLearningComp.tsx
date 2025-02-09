"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./BooksLearningPage.module.css";
import { UserBook } from "../../types";
import useUserStore from "../../services/zustand/userZustand/userStor";
import RequireAuth from "../../layout/RequireAuth";
import BookItem from "./BookItem/BookItem";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const BooksLearning = () => {
  const user = useUserStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const userBooks: UserBook[] = user?.books || [];
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserBooks = userBooks.filter((book) =>
    book.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterloading = userBooks.filter((book) =>
    book.status != false
  );

  const getBookData = (book: UserBook) => ({
    chapter_id: book.chapter_id || 1,
    section_id: book.section_id || 1,
    rate: book.rate || null,
  });

  function handleStarted(event: React.MouseEvent<HTMLButtonElement>): void {
    try {
      router.push(`/bookCatalog`);
    }
    catch (error) {
      console.error('Error handling started event:', error);
    }
  }

  return (
    <RequireAuth>
      <div className={styles.container}>
        <h1 className={styles.title}>איזור למידה</h1>

        {filterloading.length > 0 && (
          <>
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
            
          </>
        )}

        <div className={styles.booksList}>
          {filterloading.length === 0 ? (
            <div className={styles.buttonContainer}>
              <p>עדיין לא בחרת ספרים ללמוד ...
                אתה יכול לבחור ממש עכשיו ↓</p>
              <br />
              <button className={styles.buttonStart} onClick={handleStarted}>התחל ללמוד</button>
              <div className={styles.imageColumn}>
                <DotLottieReact
                  src="https://lottie.host/f95cfacb-6440-40e9-a37f-15d6ded82ce0/W0zginnfWq.lottie"
                  autoplay
                  loop
                  className={styles.animate}
                ></DotLottieReact>
              </div>
              <div className={styles.books}>
                <p className={styles.text}>כאן יופיעו הספרים שלך </p>
              </div>
            </div>
          ) : ( (filteredUserBooks.length === 0) ? <p>אין ספרים התואמים את תוי החיפוש שלך</p> :
            filteredUserBooks.map((book, index) => {
              const bookData = getBookData(book);
              return (
                <BookItem
                  key={index}
                  book={book}
                  index={index}
                  bookData={bookData}
                />
              );
            })
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
export default BooksLearning;
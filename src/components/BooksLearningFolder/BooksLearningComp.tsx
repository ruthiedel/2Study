"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./BooksLearningPage.module.css";
import { UserBook } from "../../types";
import useUserStore from "../../services/zustand/userZustand/userStor";
import RequireAuth from "../../layout/RequireAuth";
import BookItem from "./BookItem/BookItem";



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
      
      {filteredUserBooks.length > 0 && (
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
        {filteredUserBooks.length === 0 ? (
          <div className={styles.buttonContainer}>
            <p>עדיין לא בחרת ספרים ללמוד ...
              אתה יכול לבחור ממש עכשיו ↓</p>
            <button className={styles.buttonStart} onClick={handleStarted}>get started</button>
          </div>
        ) : (
          filteredUserBooks.map((book, index) => {
            const bookData = getBookData(book);
            return (
              <BookItem
                key={book.book_id}
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
);}
export default BooksLearning;
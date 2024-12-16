"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../BooksLearningPage.module.css";
import { UserBook } from "../../../types";
import numberToGematria from "../../../lib/clientHelpers/gematriaFunc";


interface BookItemProps {
    book: UserBook;
    index: number;
    bookData: {
      chapter_id: number;
      section_id: number;
      rate: number | null;
    } | null;
  }
  
  const BookItem: React.FC<BookItemProps> = ({ book, index, bookData }) => {
    const router = useRouter();
  
    if (!book.status && book.status !== undefined) return null;
  
    return (
      <div className={styles.bookItem} key={book.book_id}>
        <div className={styles.bookDetails}>
          <h3 className={styles.bookName}>{book.book_name}</h3>
          <p className={styles.bookAuthor}>
            מיקומך בפרק: {numberToGematria(bookData?.chapter_id || 1)}, סעיף:{" "}
            {numberToGematria(bookData?.section_id || 1)}
          </p>
          {bookData?.rate && bookData?.rate > 0 ?
          <p className={styles.bookAuthor}>דירוג: {bookData?.rate} ⭐</p>
        : <p className={styles.bookAuthor}>לא דירגת עדיין</p>}
          
          <button
            className={styles.learnButton}
            onClick={() => router.push(`/study/${book.book_id}`)}
          >
            המשך ללמוד ←
          </button>
        </div>
      </div>
    );
  };
  
  export default BookItem;
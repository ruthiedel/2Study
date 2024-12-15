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
          <p className={styles.bookAuthor}>{index + 1}</p>
          <h3 className={styles.bookName}>{book.book_name}</h3>
          <p className={styles.bookAuthor}>
            מיקומך בפרק: {numberToGematria(bookData?.chapter_id || 1)}, סעיף:{" "}
            {numberToGematria(bookData?.section_id || 1)}
          </p>
          <p className={styles.bookAuthor}>דירוג: {bookData?.rate} ⭐</p>
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
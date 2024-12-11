'use client';
import React from "react";
import { Book as BookType } from '../../types';
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./book.module.css"; 

type BookProps = {
  book: BookType;
  handleClick: (book: BookType) => void;
};

const BookComp: React.FC<BookProps> = ({ book, handleClick }) => {
  const coverImageSrc = typeof book.coverImage === 'string' 
    ? book.coverImage 
    : URL.createObjectURL(book.coverImage);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={coverImageSrc} 
          alt={book.name}
          className={styles.cardImage}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.cardTitle}>
          {book.name}
        </p>

        <p className={styles.cardAuthor}>
          {book.author}
        </p>

        <div className={styles.cardDivider}></div>

        <p className={styles.cardCategories}>
        קטגוריות: {book.category.subject}, {book.category.type}
        </p>

        <div className={styles.cardFooter}>
          <button className={styles.cardButton} onClick={()=>handleClick(book)}>לפרטים</button>
        </div>
      </div>
    </div>
  );
};

export default BookComp;

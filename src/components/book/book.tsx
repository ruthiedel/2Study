'use client';
import React from "react";
import { Book as BookType } from '../../types';
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./book.module.css"; 

type BookProps = {
  book: BookType;
  handleClick: (book: BookType) => void;
};

const Book: React.FC<BookProps> = ({ book, handleClick }) => {
  const coverImageSrc = typeof book.coverImage === 'string' 
    ? book.coverImage 
    : URL.createObjectURL(book.coverImage);

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={coverImageSrc} 
          alt={book.name}
          className={styles.cardImage}
        />
      </div>

      <CardContent>
        <Typography className={styles.cardTitle} variant="h6">
          {book.name}
        </Typography>

        <Typography className={styles.cardAuthor} variant="body2">
          {book.author}
        </Typography>

        <div className={styles.cardDivider}></div>

        <Typography className={styles.cardCategories} variant="body2">
        קטגוריות: {book.category.subject}, {book.category.type}
        </Typography>

        <Box className={styles.cardFooter}>
          <button className={styles.cardButton} onClick={()=>handleClick(book)}>לפרטים</button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Book;

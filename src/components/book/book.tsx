'use client';

import React from "react";
import { Book as BookType } from '../../types';
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./book.module.css"; 

type BookProps = {
  book: BookType;
};

const Book: React.FC<BookProps> = ({ book }) => {
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

        <Typography className={styles.cardCategories} variant="body2">
        קטגוריות: {book.category.subject}, {book.category.type}
        </Typography>

        <div className={styles.cardDivider}></div>

        <Typography variant="body2" color="text.secondary" align="center" className={styles.font}>
          פרקים: {book.chapters_num}
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" className={styles.font}>
          סעיפים: {book.paragraphs_num}
        </Typography>

        <Box className={styles.cardFooter}>
          <button className={styles.cardButton}>לקריאה</button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Book;

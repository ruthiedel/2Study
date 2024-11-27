'use client'

import React from 'react';
import useUserStore from '@/services/zustand/userZustand/userStor'
import { User } from '@/types';
import { Book } from '@/types'
import styles from './userStatus.module.css'
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

type partOfBook = {
    _id?: string;
    book_name: string;
    author: string;
    categories: string[];
    coverImage: string;
    totalChapters: number;
    totalSections: number;
}

const localBooks: partOfBook[] = [
    {
        _id: '1',
        book_name: 'מסילת ישרים',
        author: 'רמחל',
        categories: ['מוסר'],
        coverImage: '/mesilat.jpeg',
        totalChapters: 15,
        totalSections: 200,
    },
    {
      _id: '2',
      book_name: 'שולחן ערוך',
      author: 'רבי חיים לוצאטו',
      categories: ['מוסר'],
      coverImage: '/mesilat.jpeg',
      totalChapters: 21,
      totalSections: 72,
  }
]

const Recommendations = () => {

    // const {books} : User = useQuery
    
  return (
    <div className={styles.container}>
    {localBooks.map((book) => {
      return (
        <Card key={book._id} sx={{ maxWidth: 345 }} className={styles.mycard}>
          <CardMedia
            component="img"
            height="40"
            image={book.coverImage}
            alt={book.book_name}
            style={{
              objectFit: 'cover',
              maxWidth: '50px',
              maxHeight: '50px',
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {book.book_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">{book.author}</Typography>
            <Typography variant="body2" color="text.secondary">{book.categories.join(', ')}</Typography>
            <Button className={styles.readMoreButton} size="small">קריאה</Button>
          </CardContent>
        </Card>
      )
    }
  )}
  </div>
  );
}

export default Recommendations;

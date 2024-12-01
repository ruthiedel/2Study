'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { StyledLink } from '../styleComponents/StyledLink';   
import Typography from '@mui/material/Typography';
import styles from './userStatus.module.css'

export type bookRowProp = {
  bookName: string;
  chapterName: string;
  sectionName: string;
};


const booksData: bookRowProp[] = [
  {
    bookName: "הארי פוטר  ",
    chapterName: "  מגלה את האמת",
    sectionName: "הַבִּיטָה בְּעֵינַיִם  ",
  },
  {
    bookName: "הHobbit",
    chapterName: "An  Party",
    sectionName: "Bilbo Baggins",
  },
  {
    bookName: "1984",
    chapterName: "Part One",
    sectionName: "Chapter 1",
  },
  {
    bookName: "Pride",
    chapterName: "Volume I",
    sectionName: "Chapter 1",
  },
  {
    bookName: "The Lord",
    chapterName: "The Fellowship",
    sectionName: "Prologue",
  },
];

export default function StudyCard() {
  return (
    <Card className={styles.mycard}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          ספרים בלמידה
        </Typography>
        {booksData.map(book =>
          {
            return (
              <StyledLink key={book.bookName}>
                <b>{book.bookName}</b>
                <div className='bg-black rounded-full absolute bottom-[-8px] left-[50%] w-[15px] h-[15px] z-10'></div>
                <p>{book.chapterName} {book.sectionName}</p> 
              </StyledLink>
            );
          }
        )}
      </CardContent>   

    </Card>
  );
}
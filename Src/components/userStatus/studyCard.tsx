'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { StyledLink } from '../StyleComponents/StyledLink';   
import Typography from '@mui/material/Typography';
import styles from './userStatus.module.css'
import useUserStore from '../../services/zustand/userZustand/userStor';

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
  const user = useUserStore((state) => state.user);

  return (
    <Card className={styles.mycard}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" className='fontFamily'>
          ספרים בלמידה
        </Typography>
        {user && user.books && user.books.length > 0 && (
          user.books.map(book =>
            {
              return (
                <StyledLink key={book.book_name}>
                  <b className='fontFamily'>{book.book_name}</b>
                  <div className='bg-black rounded-full absolute bottom-[-8px] left-[50%] w-[15px] h-[15px] z-10'></div>
                  <p className='fontFamily'>{book.section_id} {book.chapter_id}</p> 
                </StyledLink>
              );
            }
          )
        )}
        {/* {booksData.map(book =>
          {
            return (
              <StyledLink key={book.bookName}>
                <b>{book.bookName}</b>
                <div className='bg-black rounded-full absolute bottom-[-8px] left-[50%] w-[15px] h-[15px] z-10'></div>
                <p>{book.chapterName} {book.sectionName}</p> 
              </StyledLink>
            );
          }
        )} */}
      </CardContent>   

    </Card>
  );
}
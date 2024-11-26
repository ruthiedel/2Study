'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { StyledLink } from '@/app/components/styleComponents/StyledLink';   
import Typography from '@mui/material/Typography';


export type bookRowProp = {
  bookName: string;
  chapterName: string;
  sectionName: string;
};


const booksData: bookRowProp[] = [
  {
    bookName: "הארי פוטר ואבן החכמים",
    chapterName: "הארי פוטר מגלה את האמת",
    sectionName: "הַבִּיטָה בְּעֵינַיִם הַיְּרוּקוֹת שֶׁלִּי",
  },
  {
    bookName: "הHobbit",
    chapterName: "An Unexpected Party",
    sectionName: "Bilbo Baggins",
  },
  {
    bookName: "1984",
    chapterName: "Part One",
    sectionName: "Chapter 1",
  },
  {
    bookName: "Pride and Prejudice",
    chapterName: "Volume I",
    sectionName: "Chapter 1",
  },
  {
    bookName: "The Lord of the Rings",
    chapterName: "The Fellowship of the Ring",
    sectionName: "Prologue",
  },
];

export default function StudyCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          הלמידה שלי
        </Typography>
        {booksData.map(book =>
          {
            return (
              <StyledLink key={book.bookName}>
                {book.bookName} - {book.chapterName} - {book.sectionName}
              </StyledLink>
            );
          }
        )}
      </CardContent>   

    </Card>
  );
}
'use client'
import React, { useState } from 'react';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { Card, Grid, IconButton, Button, Typography, Box, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import styles from './bookCard.module.css';
import image from '../../../public/pictures/garnisht.png'
import { Book } from '../../types';
import { updateUser } from '../../services/userService';

type BookCardProps = {
    book: Book;
    onClose: () => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onClose }) => {
    const [showMore, setShowMore] = useState(false);
    const [foundBook, setFoundBook] = useState(false);
    const user = useUserStore((state) => state.user);

    const handleReadMore = async () => {
        console.log(user)
        const foundBook = user?.books.find((userBook) => userBook.book_id === book._id);
        if (foundBook) {
            window.location.href = `study/${book._id}`;
        } else {
            // const newUserBook: UserBook = {
            //     book_id: bookId,
            //     book_name: bookName,
            //     chapter_id: 1,
            //     section_id: 1,
            //     rate: 0,
            // }
            // await updateUser({ id: userId, updatedData: updatedUserData });
            // updateUser(user!._id!, book._id!, book.name);
            console.log(user)
            alert(user)
            window.location.href = `study/${book._id}`;
        }

    };

    return (
        <Card className={styles.bookCard}>
            <IconButton className={styles.closeButton} aria-label="close" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <div className={styles.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Image
                            src={book.coverImage}
                            alt={book.name}
                            width={150}
                            height={150}
                            className={styles.bookImage}
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" align="right" className={styles.bookTitle}>
                            {book.name}
                        </Typography>
                        <Typography variant="subtitle1" align="right" className={styles.text}>
                            {book.author}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="right" className={styles.text}>
                            {book.category.subject}
                        </Typography>
                        {/* <Image
                            src={image}
                            alt='garnisht'
                            width={280}
                            height={150}
                        /> */}
                        <Typography variant="body2" className={styles.text}>
                            <strong> פרקים: </strong>{book.chapters_num} | <strong> סעיפים: </strong>{book.paragraphs_num}
                        </Typography>

                        <Box className={styles.starsContainer}>
                            <Rating value={2.3} readOnly sx={{ color: '#F3F25B' }} />
                        </Box>
                    </Grid>

                    <Typography
                        variant="body1"
                        className={styles.ttext}
                    >
                        <strong>הצצה לספר:</strong>
                    </Typography>

                    <Typography
                        variant="body1"
                        className={showMore ? styles.fullText : styles.truncatedText}
                    >
                        {book.firstParagraphText}
                    </Typography>

                    {book.firstParagraphText && (book.firstParagraphText.length > 100) && (
                        <Button onClick={() => setShowMore(!showMore)} className={styles.readMoreButton}>
                            {showMore ? 'פחות' : 'קרא עוד'}
                        </Button>
                    )}

                    <Grid item xs={12}>
                        <Button variant="contained" className={styles.learnButton} onClick={handleReadMore}>
                            {user?.books.find((userBook) => userBook.book_id === book._id) ? "המשך ללמוד ←" : "הוסף לרשימת הספרים שלי"}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Card>
    );
};

export default BookCard;

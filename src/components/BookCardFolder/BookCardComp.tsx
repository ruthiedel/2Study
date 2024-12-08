'use client'

import React, { useEffect, useState } from 'react';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { Card, Grid, IconButton, Button, Typography, Box, Rating, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import styles from './bookCard.module.css';
import { Book, UserBook } from '../../types';

import Login from '../Login/Login';

type BookCardProps = {
    book: Book;
    onClose: () => void;
};

const BookCardComp: React.FC<BookCardProps> = ({ book, onClose }) => {
    const [showMore, setShowMore] = useState(false);
    const [foundBook, setFoundBook] = useState(false);
    const user = useUserStore((state) => state.user);
    const [openModal, setOpenModal] = useState(false);
    const updateUserZustand = useUserStore((state) => state.updateUserZustand);

    useEffect(() => {
        if (user === undefined) {
            setOpenModal(true);
        } else if (!user) {
            setOpenModal(true);  
        } else {
            setOpenModal(false); 
            const bookExists = user.books.find((userBook) => userBook.book_id === book._id);
            setFoundBook(!!bookExists);
        }
    }, [user]);

    const handleReadMore = async () => {
        if (foundBook) {
            window.location.href = `study/${book._id}`;
        } else {
            const newUserBook: UserBook = {
                book_id: book._id!,
                book_name: book.name,
                chapter_id: 1,
                section_id: 1,
                rate: 0,
            };
            const updatedUserData = {
                ...user!,
                books: [...user!.books, newUserBook],
            };
            await updateUserZustand(user!._id!, updatedUserData );
            window.location.href = `study/${book._id}`;
        }
    };

    return (
<>
            <Modal
                open={openModal}
                aria-labelledby="login-modal"
                aria-describedby="login-modal-description"
                BackdropProps={{
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'transparent',
                        p: 0,
                        boxShadow: 0,
                    }}
                >
                    <Login />
                </Box>
            </Modal>

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
                            <Typography variant="body2" className={styles.text}>
                                <strong>פרקים: </strong>
                                {book.chapters_num} | <strong>סעיפים: </strong>
                                {book.paragraphs_num}
                            </Typography>

                            <Box className={styles.starsContainer}>
                                <Rating value={book.rating} readOnly sx={{ color: '#F3F25B' }} />
                            </Box>
                        </Grid>

                        <Typography variant="body1" className={styles.ttext}>
                            <strong>הצצה לספר:</strong>
                        </Typography>

                        <Typography
                            variant="body1"
                            className={showMore ? styles.fullText : styles.truncatedText}
                        >
                            {book.firstParagraphText}
                        </Typography>

                        {book.firstParagraphText && book.firstParagraphText.length > 100 && (
                            <Button onClick={() => setShowMore(!showMore)} className={styles.readMoreButton}>
                                {showMore ? 'פחות' : 'קרא עוד'}
                            </Button>
                        )}

                        <Grid item xs={12}>
                        <Button variant="contained" className={styles.learnButton} onClick={handleReadMore}>
                            { foundBook ?   "המשך ללמוד ←" : "הוסף לרשימת הספרים שלי"}
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </>
    );
};

export default BookCardComp;

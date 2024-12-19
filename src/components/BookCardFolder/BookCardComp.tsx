'use client'

import React, { useEffect, useState } from 'react';
import useUserStore from '../../services/zustand/userZustand/userStor';
import {Grid, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import styles from './bookCard.module.css';
import { Book, UserBook } from '../../types';
import { removeHtmlTags } from '../../lib/clientHelpers/removeHTMLTags'
import { useRouter } from "next/navigation";
import RequireAuth from '../../layout/RequireAuth';

type BookCardProps = {
    book: Book;
    onClose: () => void;
};

const BookCardComp: React.FC<BookCardProps> = ({ book, onClose }) => {
    const [showMore, setShowMore] = useState(false);
    const [foundBook, setFoundBook] = useState(false);
    const user = useUserStore((state) => state.user);
    const [openModal, setOpenModal] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const updateUserZustand = useUserStore((state) => state.updateUserZustand);
    const router = useRouter();

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
        if (isSending) return;
        setIsSending(true);
        try {
            if (!foundBook) {
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
                await updateUserZustand(user!._id!, updatedUserData);
            }
            router.push(`/study/${book._id}`);
        } catch (error) {
            console.error("Failed to update user data:", error);
            alert("אירעה שגיאה במהלך העדכון. נסה שוב מאוחר יותר.");
        }
        finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <RequireAuth>
                <div className={styles.bookCard}>
                    <button className={styles.closeButton} aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </button>
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
                                <p className={styles.bookTitle}>
                                    {book.name}
                                </p>
                                <p className={styles.text}>
                                    {book.author}
                                </p>
                                <p className={styles.text}>
                                    {book.category.subject}
                                </p>
                                <p className={styles.text}>
                                    <strong>פרקים: </strong>
                                    {book.chapters_num} | <strong>סעיפים: </strong>
                                    {book.paragraphs_num}
                                </p>

                                <div className={styles.starsContainer}>
                                    <Rating value={book.rating} readOnly sx={{ color: '#F3F25B' }} />
                                </div>
                            </Grid>

                            <p className={styles.ttext}>
                                <strong>הצצה לספר:</strong>
                            </p>

                            <div
                                className={showMore ? styles.fullText : styles.truncatedText}
                            >
                                {removeHtmlTags(book.firstParagraphText ? book.firstParagraphText : '')}
                            </div>

                            {book.firstParagraphText && book.firstParagraphText.length > 100 && (
                                <button onClick={() => setShowMore(!showMore)} className={styles.readMoreButton}>
                                    {showMore ? 'פחות' : 'קרא עוד'}
                                </button>
                            )}
                       

                        <Grid item xs={12}>
                            <button className={styles.learnButton} onClick={handleReadMore}>
                            {isSending ? 'כבר מתחילים...' : (foundBook ? "המשך ללמוד ←" : "הוסף לרשימת הספרים שלי")}
                            </button>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </RequireAuth>
        </>
    );
};

export default BookCardComp;

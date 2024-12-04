'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import useUserStore from '../../../services/zustand/userZustand/userStor';
import { getSections } from '../../../services/bookService';
import { useParams } from 'next/navigation';
import { Chat, ChapterSidebar, ShowParagraph, Loading } from '../../../components';
import { Book, Paragraph } from '../../../types';
import numberToGematria from '../../../lib/clientHelpers/gematriaFunc';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getBooks } from '@/hooks/booksDetails';
import Styles from './Study.module.css';
import {  toast } from 'react-toastify';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import RatingComponent from '@/components/rating/rating';

interface Index {
    chapterId: number;
    paragraphId: number;
}

interface Paragraphs {
    section: Paragraph;
    chapterNumber: number;
}

const Study = () => {
    const { book_id } = useParams() as { book_id: string | string[] };
    const bookId = Array.isArray(book_id) ? book_id[0] : book_id;
    const { data: books } = getBooks();
    const user = useUserStore((state) => state.user);
    const [index, setIndex] = useState<Index | null>(null);
    const [paragraph, setParagraph] = useState<Paragraphs[]>([]);
    const [bookData, setBookData] = useState<Book | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);

    // איתחול מיקום ראשוני
    useEffect(() => {
        if (user && bookId) {
            const userBook = user.books.find((book) => book.book_id === bookId);
            setIndex(userBook ? { chapterId: userBook.chapter_id, paragraphId: userBook.section_id } : { chapterId: 1, paragraphId: 1 });
        }
    }, [bookId, user]);

    // איתחול מידע על ספר נוכחי
    useEffect(() => {
        if (books) {
            setBookData(books.find((book) => book._id === bookId) || null);
        }
    }, [books, bookId]);

    // קריאה ל-API להבאת הסעיפים
    useEffect(() => {
        if (!index || !bookId) return;
        const { chapterId, paragraphId } = index;

        const fetchParagraphs = async (bookId: string, chapterId: number, paragraphId: number) => {
            try {
                const paragraphs = await getSections(bookId, chapterId, paragraphId);
                console.log(paragraphs, 'from server');
                if (!paragraphs || paragraphs.length === 0) {
                    throw new Error('No paragraphs found');
                }
                setParagraph(paragraphs.sections);
            } catch (error) {
                console.error('Error fetching paragraphs:', error);
                toast.error('אירעה שגיאה בעת הבאת הסעיפים');
            } finally {
                setLoading(false);
            }
        };
        fetchParagraphs(bookId, chapterId, paragraphId);
    }, [index]);

    const handleNavigation = (direction: 'next' | 'prev') => {
        if (!index || !bookData || !bookData.paragraphsCountPerChapter) return;

        const { chapterId, paragraphId } = index;

        let newChapterId = chapterId;
        let newParagraphId = paragraphId;

        if (direction === 'next') {
            if (paragraphId < bookData.paragraphsCountPerChapter[chapterId - 1]) {
                newParagraphId = paragraphId + 1;
            } else if (chapterId < bookData.chapters_num) {
                newChapterId = chapterId + 1;
                newParagraphId = 1;
            }
        } else if (direction === 'prev') {
            if (paragraphId > 1) {
                newParagraphId = paragraphId - 1;
            } else if (chapterId > 1) {
                newChapterId = chapterId - 1;
                newParagraphId = bookData.paragraphsCountPerChapter[newChapterId - 1] || 1;
            }
        }
        const isLastSection = useMemo(() => {
            return (
                index?.chapterId === bookData?.chapters_num &&
                index?.paragraphId === bookData?.paragraphsCountPerChapter?.[index!.chapterId - 1]
            );
        }, [index, bookData]);

        const handleFinish = () => {
            setShowConfetti(true);
            toast.success('סיימת ללמוד! כל הכבוד 🎉');
            setTimeout(() => setShowConfetti(false), 5000);
        };

        console.log(paragraph, 'paragraph')
        const currentParagraph = paragraph.find(
            (p) => p.chapterNumber === index?.chapterId && p.section.ParagraphId === index?.paragraphId
        );
    
        return (
            <Box display="flex" height="100vh">
                <ChapterSidebar
                    selectedBookId={bookId}
                    onSectionSelect={(chapterIndex, sectionIndex) => setIndex({ chapterId: chapterIndex, paragraphId: sectionIndex })}
                />
                <div className={Styles.container}>
                    <h1>פרק {index?.chapterId} סעיף {index?.paragraphId}</h1>
                    <IconButton onClick={() => handleNavigation('prev')} disabled={index?.chapterId === 1 && index?.paragraphId === 1}>
                        <ExpandLess />
                    </IconButton>
                    {loading ? <Loading /> :
                        <ShowParagraph
                            paragraph={currentParagraph?.section!}
                            chapterTitle={`פרק ${numberToGematria(index.chapterId)} סעיף ${numberToGematria(index.paragraphId)}`}
                        />}
                    <IconButton onClick={() => handleNavigation('next')} disabled={!index || !bookData || index.chapterId >= bookData.chapters_num}>
                        <ExpandMore />
                    </IconButton>
                    {isLastSection && (
                        <Button onClick={handleFinish} variant="contained" color="primary" className={Styles.finishButton}>
                            סיימתי ללמוד
                        </Button>
                    )}
                    <RatingComponent bookId={bookData?._id || ''} />
                </div>
                <Chat bookId={bookId} />
                {/* <ToastContainer /> */}
                {showConfetti && <Confetti />}
            </Box>
        );
    };
}

export default Study;
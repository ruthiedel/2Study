'use client'
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import useUserStore from '../../../services/zustand/userZustand/userStor';
import { getSections } from '../../../services/bookService';
import { useParams } from 'next/navigation';
import { QuestionCard, Chat, ChapterSidebar, ShowParagraph } from '../../../components';
import { Book, Paragraph } from '../../../types';
import numberToGematria from '../../../lib/clientHelpers/gematriaFunc';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getBooks } from '@/hooks/booksDetails';
import Styles from './Study.module.css';
import { ToastContainer, toast } from 'react-toastify';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import RatingComponent from '@/components/rating/rating';

type SectionResponse = {
    sections: Paragraph[]; 
};

type Index = {
    chapterId: number;
    paragraphId: number;
};

type Paragraphs = {
    paragraphs: Paragraph[];
    // chapterId: number;
};

const Study = () => {
    const { book_id } = useParams() as { book_id: string | string[] };
    const bookId = Array.isArray(book_id) ? book_id[0] : book_id;
    const { data: books, isLoading, error } = getBooks();
    const user = useUserStore((state) => state.user);
    const [index, setIndex] = useState<Index | null>(null);
    const [paragraph, setParagraph] = useState<Paragraphs>({ paragraphs: []});
    const [bookData, setBookData] = useState<Book | null>(null); 
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (user && bookId && user.books) {
            const userBook = user.books.find((book) => book.book_id === bookId);
            if (userBook) {
                setIndex({
                    chapterId: userBook.chapter_id,
                    paragraphId: userBook.section_id,
                });
            } else {
                setIndex({
                    chapterId: 1,
                    paragraphId: 1,
                });
            }
        }
    }, [bookId, user]);

    useEffect(() => {
        if (books) {
            const foundBook = books.find((book) => book._id === bookId);
            if (foundBook) {
                setBookData(foundBook);
            }
        }
    }, [books, bookId]);

    useEffect(() => {
        if (index) {
            const isExist = paragraph.paragraphs.some(p => p.paragraphId === index.paragraphId.toString());
            if (!isExist) {
                const isBookValid = bookId && typeof bookId === 'string';
                if (isBookValid) {
                    getSections(bookId, index.chapterId, index.paragraphId)
                        .then((response: SectionResponse) => {
                            setParagraph({ paragraphs: response.sections});
                        })
                        .catch((error) => {
                            console.error("Error fetching sections:", error);
                        });
                }
            }
        } else {
            const isBookValid = bookId && typeof bookId === 'string';
            if (isBookValid) {
                getSections(bookId, 1, 1)
                    .then((response: SectionResponse) => {
                        setParagraph({ paragraphs: response.sections });
                    })
                    .catch((error) => {
                        console.error("Error fetching sections:", error);
                    });
            }
        }
    }, [index, bookId]);

    const handlePrevious = () => {
        if (index && bookData && bookData.paragraphsCountPerChapter) {
            const newIndex = { ...index }; 
            if (index.paragraphId === 1 && index.chapterId > 1) {
                const prevChapterId = index.chapterId - 1;
                const prevParagraphId = bookData.paragraphsCountPerChapter[prevChapterId - 1] ?? 1;
                newIndex.chapterId = prevChapterId;
                newIndex.paragraphId = prevParagraphId;
            } else {
                newIndex.paragraphId -= 1;
            }
            setIndex(newIndex);
        }
    };

    const handleNext = () => {
        if (index && bookData && bookData.paragraphsCountPerChapter) {
            const newIndex = { ...index }; 
            const paragraphsInChapter = bookData.paragraphsCountPerChapter[index.chapterId - 1];
            if (index.paragraphId === paragraphsInChapter) {
                const nextChapterId = index.chapterId + 1;
                const nextParagraphId = 1;
                if (nextChapterId <= bookData.paragraphsCountPerChapter.length) {
                    newIndex.chapterId = nextChapterId;
                    newIndex.paragraphId = nextParagraphId;
                }
            } else {
                newIndex.paragraphId += 1;
            }
            setIndex(newIndex);
        }
    };

    const showPrevButton = () => {
        return (index?.chapterId === 1 && index?.paragraphId === 1);
    };

    const showNextButton = () => {
        let res = (index && bookData && index.chapterId - 1 === bookData.paragraphsCountPerChapter?.length && index.paragraphId === bookData.paragraphsCountPerChapter[index.chapterId - 1]);
        return res ?? false;
    };

    const handleFinish = () => {
        setShowConfetti(true);
        toast.success("סיימת ללמוד! כל הכבוד 🎉", {
            position: "top-center",
            autoClose: 3000,
        });
        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    return (
        <Box display="flex" height="100vh">
            <ChapterSidebar selectedBookId={bookId} onSectionSelect={(chapterIndex, sectionIndex) => {
                setIndex({ chapterId: chapterIndex, paragraphId: sectionIndex });
            }} />
            <div className={Styles.container}>
                <h1>פרק {index?.chapterId} סעיף {index?.paragraphId}</h1>
                <IconButton
                    onClick={handlePrevious}
                    disabled={showPrevButton()}
                    aria-label="Previous section"
                >
                    <ExpandLess />
                </IconButton>
                {index && paragraph.paragraphs.length > 0 ? (
                    <ShowParagraph paragraph={paragraph.paragraphs[0]} chapterTitle={`פרק ${numberToGematria(index.chapterId)} סעיף ${numberToGematria(index.paragraphId)}`} />
                ) : (
                    <p>Loading paragraph...</p>
                )}
                <IconButton
                    onClick={handleNext}
                    disabled={showNextButton()}
                    aria-label="Next section"
                >
                    <ExpandMore />
                </IconButton>

                {index && index.chapterId === bookData?.paragraphsCountPerChapter?.length && index.paragraphId === bookData?.paragraphsCountPerChapter[index.chapterId - 1] && (
                    <Button onClick={handleFinish} variant="contained" color="primary" className={Styles.finishButton}>
                        סיימתי ללמוד
                    </Button>
                )}
                <RatingComponent bookId={bookData?._id? bookData._id : ''}/>
            </div>
            <Chat bookId={bookId} />
            {paragraph&&paragraph.paragraphs.length>0&&<QuestionCard p={paragraph.paragraphs[1]} bookId={bookId} setParagraph={setParagraph} chapterId={1} />}
            <ToastContainer />
            {showConfetti && <Confetti />}
        </Box>
    );
};

export default Study;
